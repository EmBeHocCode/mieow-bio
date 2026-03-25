import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, BriefcaseBusiness, Sparkles } from 'lucide-react';
import { heroData } from '../../data/site';
import { PixelBadge } from '../pixel/PixelBadge';
import { PixelButton } from '../pixel/PixelButton';
import { PixelPanel } from '../pixel/PixelPanel';

type HeroSectionProps = {
  avatarSrc: string;
};

export function HeroSection({ avatarSrc }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      data-section
      className="scroll-mt-32 py-12 sm:py-16 lg:py-20"
    >
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-4xl pt-14 sm:pt-16"
        >
          <div className="pointer-events-none absolute left-1/2 top-5 h-44 w-44 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,92,214,0.28),transparent_68%)] blur-2xl sm:top-6" />

          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -8, 0]
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut'
                  }
            }
            className="absolute inset-x-0 top-5 z-[2] flex justify-center sm:top-6"
          >
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-[rgba(255,92,214,0.42)] bg-[linear-gradient(180deg,rgba(255,92,214,0.18),rgba(12,8,24,0.86))] p-2 shadow-neon-strong sm:h-32 sm:w-32">
              <div className="absolute inset-0 rounded-full border border-white/10" />
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[rgba(0,0,0,0.35)] p-1.5">
                <img
                  src={avatarSrc}
                  alt="EmBeby avatar"
                  className="block h-full w-full rounded-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          <PixelPanel
            tone="pink"
            className="ambient-scanline px-6 pb-10 pt-24 text-center sm:px-10 sm:pb-12 sm:pt-28 lg:px-14"
          >
            <div className="flex flex-col items-center">
              <PixelBadge tone="violet">Hybrid Pixel Landing</PixelBadge>

              <h1 className="mt-6 font-display text-4xl font-semibold tracking-[0.03em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
                <span className="text-gradient text-glow">{heroData.title}</span>
                <span className="mt-2 block text-[var(--text-primary)]">{heroData.subtitle}</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)] sm:text-lg">
                {heroData.description}
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <PixelButton
                  href="mailto:mieowshopsite@gmail.com"
                  leftIcon={<BriefcaseBusiness size={16} />}
                >
                  Nhận dự án
                </PixelButton>
                <PixelButton
                  href="#projects"
                  variant="secondary"
                  leftIcon={<ArrowDownRight size={16} />}
                >
                  Xem projects
                </PixelButton>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {heroData.chips.map((chip) => (
                  <PixelBadge
                    key={chip}
                    tone="muted"
                  >
                    <Sparkles size={10} />
                    {chip}
                  </PixelBadge>
                ))}
              </div>
            </div>
          </PixelPanel>
        </motion.div>
      </div>
    </section>
  );
}
