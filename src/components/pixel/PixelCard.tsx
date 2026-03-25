import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { PixelPanel } from './PixelPanel';

type PixelCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  tone?: 'pink' | 'violet' | 'muted';
};

export function PixelCard({
  icon,
  title,
  description,
  children,
  className = '',
  tone = 'muted'
}: PixelCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={`h-full ${className}`}
    >
      <PixelPanel
        tone={tone}
        className="h-full p-6 sm:p-7"
      >
        <div className="flex h-full flex-col gap-5">
          <div className="flex h-12 w-12 items-center justify-center pixel-cut border border-white/10 bg-white/5 text-[var(--accent-primary)] shadow-[0_0_24px_rgba(255,92,214,0.16)]">
            {icon}
          </div>
          <div className="space-y-3">
            <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">{title}</h3>
            <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-[0.95rem]">
              {description}
            </p>
          </div>
          {children ? <div className="mt-auto">{children}</div> : null}
        </div>
      </PixelPanel>
    </motion.div>
  );
}
