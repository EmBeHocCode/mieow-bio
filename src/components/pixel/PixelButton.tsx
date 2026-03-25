import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

type PixelButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
};

const variantClasses = {
  primary:
    'border-[var(--accent-border)] bg-[linear-gradient(180deg,rgba(255,92,214,0.24),rgba(255,52,191,0.16))] text-white shadow-neon-soft hover:border-[rgba(255,92,214,0.55)]',
  secondary:
    'border-[var(--accent-border-soft)] bg-[linear-gradient(180deg,rgba(138,92,255,0.14),rgba(20,16,38,0.82))] text-[var(--text-primary)] shadow-violet-soft hover:border-[rgba(138,92,255,0.45)]',
  ghost:
    'border-white/10 bg-white/[0.04] text-[var(--text-secondary)] hover:border-white/20 hover:text-[var(--text-primary)]'
};

const sizeClasses = {
  sm: 'px-3 py-2 text-[0.58rem]',
  md: 'px-4 py-3 text-[0.62rem]',
  lg: 'px-5 py-3.5 text-[0.66rem]'
};

const baseClass =
  'pixel-cut relative inline-flex items-center justify-center gap-2 overflow-hidden font-pixel uppercase tracking-[0.18em] transition-all duration-200 focus-visible:outline-none';

const innerOverlay =
  'pointer-events-none absolute inset-px bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent_36%)] opacity-80';

export function PixelButton({
  children,
  className = '',
  href,
  external = false,
  onClick,
  leftIcon,
  rightIcon,
  variant = 'primary',
  size = 'md',
  type = 'button',
  ariaLabel
}: PixelButtonProps) {
  const classes = `${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      <span className={innerOverlay} />
      <span className="relative z-[1] inline-flex items-center gap-2">
        {leftIcon ? <span className="text-sm">{leftIcon}</span> : null}
        <span>{children}</span>
        {rightIcon ? <span className="text-sm">{rightIcon}</span> : null}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        whileHover={{ y: -2, scale: 1.01 }}
        whileTap={{ y: 1, scale: 0.985 }}
        transition={{ duration: 0.18 }}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ y: 1, scale: 0.985 }}
      transition={{ duration: 0.18 }}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
