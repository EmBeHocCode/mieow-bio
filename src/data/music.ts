export type MusicTrack = {
  src: string;
  title: string;
  artist: string;
};

type TrackMetadata = {
  title: string;
  artist?: string;
};

const trackModules = import.meta.glob('../../assets/music/*.{mp3,wav,ogg,m4a,aac,flac}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const TRACK_METADATA: Record<string, TrackMetadata> = {
  '01-hat-mua-vuong-van-tiktok-2026.mp3': {
    title: 'Hạt Mưa Vương Vấn (Bản Chuẩn TikTok 2026)'
  },
  '02-hat-mua-vuong-van-nam-con-remix.mp3': {
    title: 'Hạt Mưa Vương Vấn (Nam Con Remix)'
  }
};

function normalizeTrackTitle(filePath: string) {
  const fileName = filePath.split('/').pop() ?? 'Unknown Track';
  const nameWithoutExtension = fileName.replace(/\.[^.]+$/, '');

  return nameWithoutExtension
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const musicTracks: MusicTrack[] = Object.entries(trackModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([filePath, src]) => {
    const fileName = filePath.split('/').pop() ?? '';
    const metadata = TRACK_METADATA[fileName];

    return {
      src,
      title: metadata?.title ?? normalizeTrackTitle(filePath),
      artist: metadata?.artist ?? 'Local Playlist'
    };
  });
