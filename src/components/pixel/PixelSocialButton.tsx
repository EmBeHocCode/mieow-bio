import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PixelPanel } from './PixelPanel';

type PixelSocialButtonProps = {
  icon: ReactNode;
  label: string;
  description: string;
  href?: string;
  onClick?: () => void;
};

export function PixelSocialButton({
  icon,
  label,
  description,
  href,
  onClick
}: PixelSocialButtonProps) {
  const card = (
    <PixelPanel className="h-full p-5 sm:p-6">
      <div className="flex h-full items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center pixel-cut border border-white/10 bg-white/5 text-lg text-[var(--accent-primary)] shadow-[0_0_24px_rgba(255,92,214,0.16)]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">{label}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
            </div>
            <ArrowUpRight className="mt-1 shrink-0 text-[var(--text-muted)]" size={18} />
          </div>
        </div>
      </div>
    </PixelPanel>
  );

  if (href) {
    return (
      <motion.a
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
        className="block h-full"
      >
        {card}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="block h-full w-full bg-transparent p-0 text-left"
    >
      {card}
    </motion.button>
  );
}
