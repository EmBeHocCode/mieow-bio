import type { ReactNode } from 'react';

type PixelPanelProps = {
  children: ReactNode;
  className?: string;
  tone?: 'pink' | 'violet' | 'muted';
  animatedFrame?: boolean;
};

const toneClasses = {
  pink: 'shadow-neon-soft',
  violet: 'shadow-violet-soft',
  muted: 'shadow-[0_18px_48px_rgba(6,4,20,0.5)]'
};

export function PixelPanel({
  children,
  className = '',
  tone = 'muted',
  animatedFrame = false
}: PixelPanelProps) {
  return (
    <div className={`pixel-surface ${toneClasses[tone]} ${className}`}>
      {animatedFrame ? (
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pixel-orbit-frame"
        >
          <polygon
            pathLength={100}
            points="1.2,15.2 15.2,15.2 15.2,1.2 84.8,1.2 84.8,15.2 98.8,15.2 98.8,84.8 84.8,84.8 84.8,98.8 15.2,98.8 15.2,84.8 1.2,84.8"
            className="pixel-orbit-frame__path pixel-orbit-frame__path--base"
          />
          <polygon
            pathLength={100}
            points="1.2,15.2 15.2,15.2 15.2,1.2 84.8,1.2 84.8,15.2 98.8,15.2 98.8,84.8 84.8,84.8 84.8,98.8 15.2,98.8 15.2,84.8 1.2,84.8"
            className="pixel-orbit-frame__path pixel-orbit-frame__path--glow"
          />
          <polygon
            pathLength={100}
            points="1.2,15.2 15.2,15.2 15.2,1.2 84.8,1.2 84.8,15.2 98.8,15.2 98.8,84.8 84.8,84.8 84.8,98.8 15.2,98.8 15.2,84.8 1.2,84.8"
            className="pixel-orbit-frame__path pixel-orbit-frame__path--streak"
          />
        </svg>
      ) : null}
      <span className="pixel-corner pixel-corner--tl" />
      <span className="pixel-corner pixel-corner--tr" />
      <span className="pixel-corner pixel-corner--bl" />
      <span className="pixel-corner pixel-corner--br" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
