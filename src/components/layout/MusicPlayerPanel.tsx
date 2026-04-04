import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Music4,
  Pause,
  Play,
  Power,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX
} from 'lucide-react';
import type { MusicTrack } from '../../data/music';
import { PixelAudioVisualizer } from './PixelAudioVisualizer';

type MusicPlayerPanelProps = {
  tracks: MusicTrack[];
};

type StoredPlayerState = {
  enabled: boolean;
  volume: number;
  shuffle: boolean;
  loopTrack: boolean;
  currentTrackIndex: number;
  collapsed: boolean;
};

type VisualizerPhase = 'idle' | 'transition' | 'paused' | 'playing';

const STORAGE_KEY = 'musicPlayerStateV3';
const DEFAULT_VOLUME = 100;
const INITIAL_TRACK_BOOT_DELAY_MS = 1800;
const TRACK_SWITCH_DELAY_MS = 2200;

function getInitialState(trackCount: number): StoredPlayerState {
  if (typeof window === 'undefined') {
    return {
      enabled: true,
      volume: DEFAULT_VOLUME,
      shuffle: false,
      loopTrack: false,
      currentTrackIndex: 0,
      collapsed: false
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        enabled: true,
        volume: DEFAULT_VOLUME,
        shuffle: false,
        loopTrack: false,
        currentTrackIndex: 0,
        collapsed: window.innerWidth < 640
      };
    }

    const parsed = JSON.parse(raw) as Partial<StoredPlayerState>;

    return {
      enabled: parsed.enabled ?? true,
      volume: parsed.volume ?? DEFAULT_VOLUME,
      shuffle: parsed.shuffle ?? false,
      loopTrack: parsed.loopTrack ?? false,
      currentTrackIndex: Math.max(0, Math.min(parsed.currentTrackIndex ?? 0, Math.max(trackCount - 1, 0))),
      collapsed: parsed.collapsed ?? window.innerWidth < 640
    };
  } catch {
    return {
      enabled: true,
      volume: DEFAULT_VOLUME,
      shuffle: false,
      loopTrack: false,
      currentTrackIndex: 0,
      collapsed: window.innerWidth < 640
    };
  }
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return '0:00';
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function getRandomIndex(currentIndex: number, trackCount: number) {
  if (trackCount <= 1) {
    return currentIndex;
  }

  let nextIndex = currentIndex;

  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * trackCount);
  }

  return nextIndex;
}

export function MusicPlayerPanel({ tracks }: MusicPlayerPanelProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserNodeRef = useRef<AnalyserNode | null>(null);
  const trackStartTimeoutRef = useRef<number | null>(null);
  const transitionActiveRef = useRef(false);
  const previousTrackSrcRef = useRef<string | null>(null);
  const preparedTrackSrcRef = useRef<string | null>(null);
  const loadedTrackSrcRef = useRef<string | null>(null);
  const currentTimeRef = useRef(0);
  const durationRef = useRef(0);
  const lastProgressCommitRef = useRef(0);
  const [playerState, setPlayerState] = useState<StoredPlayerState>(() => getInitialState(tracks.length));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [visualizerPhase, setVisualizerPhase] = useState<VisualizerPhase>('idle');

  const currentTrack = tracks[playerState.currentTrackIndex];
  const progressPercent = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const volumePercent = Math.max(0, Math.min(playerState.volume, 200));

  const progressStyle = useMemo(
    () => ({
      background: `linear-gradient(90deg, rgba(255,92,214,0.9) 0%, rgba(138,92,255,0.9) ${progressPercent}%, rgba(255,255,255,0.08) ${progressPercent}%, rgba(255,255,255,0.08) 100%)`
    }),
    [progressPercent]
  );

  const volumeStyle = useMemo(
    () => ({
      background: `linear-gradient(90deg, rgba(255,92,214,0.9) 0%, rgba(138,92,255,0.9) ${volumePercent / 2}%, rgba(255,255,255,0.08) ${volumePercent / 2}%, rgba(255,255,255,0.08) 100%)`
    }),
    [volumePercent]
  );

  const updatePlayerState = (patch: Partial<StoredPlayerState>) => {
    setPlayerState((current) => ({ ...current, ...patch }));
  };

  const clearTrackStartTimeout = () => {
    if (trackStartTimeoutRef.current !== null) {
      window.clearTimeout(trackStartTimeoutRef.current);
      trackStartTimeoutRef.current = null;
    }
  };

  const commitProgress = (nextTime: number, nextDuration: number, force = false) => {
    const normalizedTime = Number.isFinite(nextTime) && nextTime > 0 ? nextTime : 0;
    const normalizedDuration = Number.isFinite(nextDuration) && nextDuration > 0 ? nextDuration : 0;
    const durationChanged = Math.abs(normalizedDuration - durationRef.current) > 0.05;
    const timeChanged = Math.abs(normalizedTime - currentTimeRef.current) > 0.08;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();

    if (!force && !durationChanged && !timeChanged) {
      return;
    }

    if (!force && !durationChanged && now - lastProgressCommitRef.current < 90) {
      return;
    }

    lastProgressCommitRef.current = now;
    currentTimeRef.current = normalizedTime;
    durationRef.current = normalizedDuration;
    setCurrentTime(normalizedTime);
    setDuration(normalizedDuration);
  };

  const resetProgress = () => {
    currentTimeRef.current = 0;
    durationRef.current = 0;
    lastProgressCommitRef.current = 0;
    setCurrentTime(0);
    setDuration(0);
  };

  const syncTrackSource = (src: string, preload: HTMLMediaElement['preload'], shouldLoad = false) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.crossOrigin = 'anonymous';
    audio.preload = preload;

    if (preparedTrackSrcRef.current !== src) {
      audio.src = src;
      preparedTrackSrcRef.current = src;
      loadedTrackSrcRef.current = null;
    }

    if (shouldLoad && loadedTrackSrcRef.current !== src) {
      audio.load();
      loadedTrackSrcRef.current = src;
    }
  };

  const applyVolume = (value: number) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const gainNode = gainNodeRef.current;
    const normalizedVolume = value / 100;

    if (gainNode) {
      audio.volume = 1;
      gainNode.gain.value = normalizedVolume;
      return;
    }

    audio.volume = Math.min(normalizedVolume, 1);
  };

  const ensureAudioGraph = async () => {
    const audio = audioRef.current;

    if (!audio || typeof window === 'undefined') {
      return;
    }

    const AudioContextClass =
      window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextClass) {
      applyVolume(playerState.volume);
      return;
    }

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const source = context.createMediaElementSource(audio);
      const gainNode = context.createGain();
      const analyser = context.createAnalyser();

      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.72;

      source.connect(gainNode);
      gainNode.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      sourceNodeRef.current = source;
      gainNodeRef.current = gainNode;
      analyserNodeRef.current = analyser;
      setAnalyserNode(analyser);
    }

    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    applyVolume(playerState.volume);
  };

  const startPlayback = async () => {
    const audio = audioRef.current;

    if (!audio || !currentTrack || !playerState.enabled) {
      return;
    }

    clearTrackStartTimeout();
    transitionActiveRef.current = false;

    try {
      syncTrackSource(currentTrack.src, 'auto', true);
      await ensureAudioGraph();
      await audio.play();
      setIsPlaying(true);
      setVisualizerPhase('playing');
    } catch {
      setIsPlaying(false);
      setVisualizerPhase(playerState.enabled ? 'paused' : 'idle');
    }
  };

  const pausePlayback = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    clearTrackStartTimeout();
    transitionActiveRef.current = false;
    audio.pause();
    setIsPlaying(false);
    setVisualizerPhase(playerState.enabled ? 'paused' : 'idle');
  };

  const moveToNextTrack = () => {
    const audio = audioRef.current;

    if (!audio || tracks.length === 0) {
      return;
    }

    if (tracks.length === 1) {
      audio.currentTime = 0;
      if (playerState.enabled) {
        void startPlayback();
      }
      return;
    }

    const nextIndex = playerState.shuffle
      ? getRandomIndex(playerState.currentTrackIndex, tracks.length)
      : (playerState.currentTrackIndex + 1) % tracks.length;

    updatePlayerState({ currentTrackIndex: nextIndex });
  };

  const moveToPreviousTrack = () => {
    const audio = audioRef.current;

    if (!audio || tracks.length === 0) {
      return;
    }

    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      commitProgress(0, durationRef.current, true);
      return;
    }

    if (tracks.length === 1) {
      audio.currentTime = 0;
      if (playerState.enabled) {
        void startPlayback();
      }
      return;
    }

    const previousIndex = playerState.shuffle
      ? getRandomIndex(playerState.currentTrackIndex, tracks.length)
      : (playerState.currentTrackIndex - 1 + tracks.length) % tracks.length;

    updatePlayerState({ currentTrackIndex: previousIndex });
  };

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(playerState));
  }, [playerState]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentTrack) {
      return;
    }

    const previousTrackSrc = previousTrackSrcRef.current;
    const isInitialTrack = previousTrackSrc === null;
    const trackChanged = previousTrackSrc !== currentTrack.src;

    previousTrackSrcRef.current = currentTrack.src;
    clearTrackStartTimeout();
    transitionActiveRef.current = false;
    audio.pause();
    setIsPlaying(false);

    syncTrackSource(currentTrack.src, 'none');
    resetProgress();

    if (!playerState.enabled) {
      setVisualizerPhase('idle');
      return;
    }

    const needsBootDelay = isInitialTrack || trackChanged;

    if (!needsBootDelay) {
      void startPlayback();
      return;
    }

    transitionActiveRef.current = true;
    setVisualizerPhase('transition');
    trackStartTimeoutRef.current = window.setTimeout(() => {
      trackStartTimeoutRef.current = null;
      void startPlayback();
    }, isInitialTrack ? INITIAL_TRACK_BOOT_DELAY_MS : TRACK_SWITCH_DELAY_MS);

    return () => {
      clearTrackStartTimeout();
    };
  }, [currentTrack?.src, playerState.enabled]);

  useEffect(() => {
    applyVolume(playerState.volume);
  }, [playerState.volume]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const syncPlay = () => {
      transitionActiveRef.current = false;
      setIsPlaying(true);
      setVisualizerPhase('playing');
    };
    const syncPause = () => {
      setIsPlaying(false);
      setVisualizerPhase(!playerState.enabled ? 'idle' : transitionActiveRef.current ? 'transition' : 'paused');
    };
    const syncTime = () => {
      commitProgress(audio.currentTime, audio.duration || 0);
    };
    const syncMetadata = () => {
      commitProgress(audio.currentTime, audio.duration || 0, true);
    };
    const handleEnded = () => {
      if (playerState.loopTrack) {
        audio.currentTime = 0;
        void startPlayback();
        return;
      }

      moveToNextTrack();
    };

    audio.addEventListener('play', syncPlay);
    audio.addEventListener('pause', syncPause);
    audio.addEventListener('timeupdate', syncTime);
    audio.addEventListener('loadedmetadata', syncMetadata);
    audio.addEventListener('durationchange', syncMetadata);
    audio.addEventListener('seeked', syncMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', syncPlay);
      audio.removeEventListener('pause', syncPause);
      audio.removeEventListener('timeupdate', syncTime);
      audio.removeEventListener('loadedmetadata', syncMetadata);
      audio.removeEventListener('durationchange', syncMetadata);
      audio.removeEventListener('seeked', syncMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playerState.enabled, playerState.loopTrack, playerState.shuffle, playerState.currentTrackIndex, tracks.length]);

  useEffect(() => {
    if (!playerState.enabled) {
      pausePlayback();
      setVisualizerPhase('idle');
      return;
    }

    const tryPlayOnInteraction = () => {
      const audio = audioRef.current;

      if (!audio || !audio.paused || transitionActiveRef.current) {
        return;
      }

      void startPlayback();
    };

    window.addEventListener('click', tryPlayOnInteraction, { once: true });
    window.addEventListener('keydown', tryPlayOnInteraction, { once: true });
    window.addEventListener('touchstart', tryPlayOnInteraction, { once: true });

    return () => {
      window.removeEventListener('click', tryPlayOnInteraction);
      window.removeEventListener('keydown', tryPlayOnInteraction);
      window.removeEventListener('touchstart', tryPlayOnInteraction);
    };
  }, [playerState.enabled, playerState.currentTrackIndex]);

  useEffect(() => {
    return () => {
      clearTrackStartTimeout();
      const audio = audioRef.current;

      if (audio) {
        audio.pause();
      }

      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  if (!currentTrack) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} preload="none" />

      <div className="fixed bottom-4 right-4 z-[60] w-[calc(100vw-2rem)] max-w-[22rem] sm:bottom-6 sm:right-6 sm:w-[22rem]">
        <AnimatePresence mode="wait">
          {playerState.collapsed ? (
            <motion.div
              key="music-collapsed"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="pixel-cut overflow-hidden border border-[var(--accent-border)] bg-[linear-gradient(180deg,rgba(16,11,32,0.96),rgba(10,8,21,0.94))] shadow-neon-soft"
            >
              <div className="flex items-center gap-3 p-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center pixel-cut border border-white/10 bg-white/[0.04] text-[var(--accent-primary)]">
                  {playerState.enabled && isPlaying ? <Volume2 size={18} /> : playerState.enabled ? <Music4 size={18} /> : <VolumeX size={18} />}
                </div>

                <button
                  type="button"
                  onClick={() => updatePlayerState({ collapsed: false })}
                  className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
                  aria-label="Mở bảng điều khiển nhạc"
                >
                  <div className="min-w-0">
                    <p className="font-pixel text-[0.52rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Music Panel
                    </p>
                    <p className="mt-1 truncate font-display text-sm font-semibold text-[var(--text-primary)]">
                      {playerState.enabled ? (isPlaying ? 'Playing' : 'Ready') : 'Muted'}
                    </p>
                  </div>
                  <ChevronUp size={16} className="shrink-0 text-[var(--text-muted)]" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="music-expanded"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="pixel-cut overflow-hidden border border-[var(--accent-border)] bg-[linear-gradient(180deg,rgba(16,11,32,0.98),rgba(8,7,20,0.96))] shadow-[0_0_30px_rgba(255,92,214,0.14)]"
            >
              <div className="pointer-events-none absolute inset-px bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_26%)]" />

              <div className="relative p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-pixel text-[0.52rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Music Control
                    </p>
                    <h3 className="mt-1 truncate font-display text-lg font-semibold text-[var(--text-primary)]">
                      {currentTrack.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {currentTrack.artist} • Track {playerState.currentTrackIndex + 1}/{tracks.length}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updatePlayerState({ enabled: !playerState.enabled })}
                      aria-label={playerState.enabled ? 'Tắt nhạc' : 'Bật nhạc'}
                      className={`music-control-button ${playerState.enabled ? 'music-control-button--active' : ''}`}
                    >
                      <Power size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePlayerState({ collapsed: true })}
                      aria-label="Thu gọn bảng điều khiển nhạc"
                      className="music-control-button"
                    >
                      <ChevronDown size={15} />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <PixelAudioVisualizer
                    analyser={analyserNode}
                    isPlaying={isPlaying}
                    enabled={playerState.enabled}
                    phase={visualizerPhase}
                    className="mb-4 h-24 sm:h-28"
                  />

                  <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={Math.min(currentTime, duration || 0)}
                    onChange={(event) => {
                      const audio = audioRef.current;
                      const nextTime = Number(event.target.value);

                      if (!audio) {
                        return;
                      }

                      audio.currentTime = nextTime;
                      commitProgress(nextTime, durationRef.current || duration, true);
                    }}
                    className="music-slider"
                    style={progressStyle}
                    aria-label="Thanh thời lượng bài hát"
                    disabled={!duration}
                  />

                  <div className="mt-2 flex items-center justify-between text-[0.72rem] text-[var(--text-muted)]">
                    <span>{formatTime(currentTime)}</span>
                    <span>{playerState.loopTrack ? 'Loop bài hiện tại' : playerState.shuffle ? 'Phát ngẫu nhiên' : 'Tự chuyển bài'}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updatePlayerState({ shuffle: !playerState.shuffle })}
                      aria-pressed={playerState.shuffle}
                      className={`music-control-button ${playerState.shuffle ? 'music-control-button--active' : ''}`}
                    >
                      <Shuffle size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={moveToPreviousTrack}
                      className="music-control-button"
                      aria-label="Bài trước"
                    >
                      <SkipBack size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!playerState.enabled) {
                        updatePlayerState({ enabled: true });
                        return;
                      }

                      if (isPlaying) {
                        pausePlayback();
                        return;
                      }

                      if (visualizerPhase === 'transition') {
                        return;
                      }

                      void startPlayback();
                    }}
                    className="music-play-button"
                    aria-label={isPlaying ? 'Tạm dừng' : 'Phát nhạc'}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={moveToNextTrack}
                      className="music-control-button"
                      aria-label="Bài tiếp theo"
                    >
                      <SkipForward size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => updatePlayerState({ loopTrack: !playerState.loopTrack })}
                      aria-pressed={playerState.loopTrack}
                      className={`music-control-button ${playerState.loopTrack ? 'music-control-button--active' : ''}`}
                    >
                      <Repeat1 size={15} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-[0.9rem] border border-white/8 bg-white/[0.04] px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                      {volumePercent === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      <span className="text-sm">Âm lượng</span>
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">
                      {volumePercent}% {volumePercent > 100 ? `• Boost x${(volumePercent / 100).toFixed(1)}` : ''}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={200}
                    step={1}
                    value={volumePercent}
                    onChange={(event) => updatePlayerState({ volume: Number(event.target.value) })}
                    className="music-slider mt-3"
                    style={volumeStyle}
                    aria-label="Âm lượng"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
