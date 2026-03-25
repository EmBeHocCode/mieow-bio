import { motion, useReducedMotion } from 'framer-motion';

export function GridBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,92,214,0.08),transparent_34%),radial-gradient(circle_at_84%_0%,rgba(138,92,255,0.08),transparent_24%)]" />

      <motion.div
        className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                backgroundPosition: ['0px 0px', '56px 56px']
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 28,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY
              }
        }
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,1,13,0)_0%,rgba(5,1,13,0.12)_35%,rgba(5,1,13,0.5)_100%)]" />
    </div>
  );
}
