import { motion } from 'framer-motion';
import { PixelBadge } from './PixelBadge';

type PixelSectionTitleProps = {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
};

export function PixelSectionTitle({
  label,
  title,
  description,
  align = 'center'
}: PixelSectionTitleProps) {
  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-10 flex flex-col gap-4 sm:mb-12 ${alignClass}`}
    >
      <PixelBadge tone="violet">{label}</PixelBadge>
      <div className="space-y-3">
        <h2 className="font-display text-3xl font-semibold tracking-[0.02em] text-[var(--text-primary)] sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}
