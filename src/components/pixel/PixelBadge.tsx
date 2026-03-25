import type { ReactNode } from 'react';

type PixelBadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: 'pink' | 'violet' | 'muted';
};

const toneClasses = {
  pink: 'border-[var(--accent-border)] bg-[rgba(255,92,214,0.14)] text-[var(--accent-primary)]',
  violet:
    'border-[var(--accent-border-soft)] bg-[rgba(138,92,255,0.14)] text-[rgba(201,188,255,0.95)]',
  muted: 'border-white/10 bg-white/5 text-[var(--text-secondary)]'
};

export function PixelBadge({
  children,
  className = '',
  tone = 'pink'
}: PixelBadgeProps) {
  return (
    <span
      className={`pixel-cut inline-flex items-center gap-2 border px-3 py-1.5 font-pixel text-[0.58rem] uppercase tracking-[0.18em] ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
