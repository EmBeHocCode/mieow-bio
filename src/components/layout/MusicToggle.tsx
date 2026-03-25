import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Volume2, VolumeX } from 'lucide-react';

type MusicToggleProps = {
  src: string;
};

const STORAGE_KEY = 'musicPlaying';

export function MusicToggle({ src }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicEnabled, setMusicEnabled] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    return window.localStorage.getItem(STORAGE_KEY) !== 'false';
  });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.35;

    const syncPlay = () => setIsPlaying(true);
    const syncPause = () => setIsPlaying(false);

    audio.addEventListener('play', syncPlay);
    audio.addEventListener('pause', syncPause);

    return () => {
      audio.removeEventListener('play', syncPlay);
      audio.removeEventListener('pause', syncPause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, musicEnabled ? 'true' : 'false');

    if (!musicEnabled) {
      audio.pause();
      return;
    }

    audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, [musicEnabled]);

  useEffect(() => {
    if (!musicEnabled) {
      return;
    }

    const tryPlayOnInteraction = () => {
      const audio = audioRef.current;

      if (!audio || !audio.paused) {
        return;
      }

      audio.play().catch(() => {
        setIsPlaying(false);
      });
    };

    window.addEventListener('click', tryPlayOnInteraction, { once: true });
    window.addEventListener('keydown', tryPlayOnInteraction, { once: true });
    window.addEventListener('touchstart', tryPlayOnInteraction, { once: true });

    return () => {
      window.removeEventListener('click', tryPlayOnInteraction);
      window.removeEventListener('keydown', tryPlayOnInteraction);
      window.removeEventListener('touchstart', tryPlayOnInteraction);
    };
  }, [musicEnabled]);

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
      />

      <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
        <motion.button
          type="button"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ y: 1, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          onClick={() => setMusicEnabled((current) => !current)}
          aria-pressed={musicEnabled}
          aria-label={musicEnabled ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          className={`pixel-cut relative inline-flex items-center gap-3 overflow-hidden border px-4 py-3 text-left shadow-neon-soft transition-all duration-200 ${
            musicEnabled
              ? 'border-[var(--accent-border)] bg-[linear-gradient(180deg,rgba(255,92,214,0.18),rgba(14,10,28,0.92))]'
              : 'border-white/10 bg-[rgba(11,8,24,0.92)]'
          }`}
        >
          <span className="pointer-events-none absolute inset-px bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_38%)]" />
          <span className="relative flex h-11 w-11 items-center justify-center pixel-cut border border-white/10 bg-white/[0.05] text-[var(--accent-primary)]">
            {musicEnabled ? (isPlaying ? <Volume2 size={18} /> : <Music2 size={18} />) : <VolumeX size={18} />}
          </span>
          <span className="relative hidden sm:block">
            <span className="block font-pixel text-[0.54rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Music
            </span>
            <span className="mt-1 block font-display text-sm font-semibold text-[var(--text-primary)]">
              {musicEnabled ? (isPlaying ? 'Playing' : 'Ready') : 'Muted'}
            </span>
          </span>
        </motion.button>
      </div>
    </>
  );
}
