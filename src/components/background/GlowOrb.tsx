import { motion, useReducedMotion } from 'framer-motion';

type GlowOrbProps = {
  size: number;
  top: string;
  left?: string;
  right?: string;
  tone?: 'pink' | 'violet';
};

export function GlowOrb({
  size,
  top,
  left,
  right,
  tone = 'pink'
}: GlowOrbProps) {
  const shouldReduceMotion = useReducedMotion();

  const toneClass =
    tone === 'pink'
      ? 'bg-[radial-gradient(circle,rgba(255,92,214,0.34),rgba(255,92,214,0.12),transparent_72%)]'
      : 'bg-[radial-gradient(circle,rgba(138,92,255,0.3),rgba(138,92,255,0.1),transparent_72%)]';

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${toneClass}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right
      }}
      animate={
        shouldReduceMotion
          ? undefined
          : {
              x: [0, 18, -10, 0],
              y: [0, -14, 12, 0],
              scale: [1, 1.05, 0.98, 1]
            }
      }
      transition={
        shouldReduceMotion
          ? undefined
          : {
              duration: 18,
              ease: 'easeInOut',
              repeat: Number.POSITIVE_INFINITY
            }
      }
    />
  );
}
