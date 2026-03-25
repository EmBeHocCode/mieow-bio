import { motion, useReducedMotion } from 'framer-motion';

const SPEED_MULTIPLIER = 0.7;

const particles = [
  { left: '5%', top: '78%', size: 4, duration: 14, delay: 0, drift: 20 },
  { left: '11%', top: '54%', size: 3, duration: 12, delay: 2, drift: -12 },
  { left: '18%', top: '88%', size: 5, duration: 15, delay: 1, drift: 18 },
  { left: '27%', top: '63%', size: 4, duration: 13, delay: 3, drift: 10 },
  { left: '34%', top: '92%', size: 3, duration: 16, delay: 0.5, drift: -16 },
  { left: '42%', top: '70%', size: 4, duration: 12, delay: 2.2, drift: 14 },
  { left: '49%', top: '84%', size: 3, duration: 13, delay: 4, drift: 9 },
  { left: '58%', top: '60%', size: 5, duration: 17, delay: 1.6, drift: -14 },
  { left: '64%', top: '90%', size: 3, duration: 11, delay: 3.4, drift: 16 },
  { left: '72%', top: '76%', size: 4, duration: 15, delay: 0.8, drift: -8 },
  { left: '79%', top: '58%', size: 3, duration: 12, delay: 2.6, drift: 13 },
  { left: '88%', top: '86%', size: 4, duration: 16, delay: 1.1, drift: -18 }
];

export function ParticleBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${index}`}
          className="absolute rounded-full bg-[var(--accent-primary)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow:
              '0 0 12px rgba(255, 92, 214, 0.55), 0 0 26px rgba(138, 92, 255, 0.32)'
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -140],
                  x: [0, particle.drift],
                  opacity: [0, 0.85, 0],
                  scale: [0.85, 1.15, 1]
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: particle.duration * SPEED_MULTIPLIER,
                  delay: particle.delay,
                  ease: 'easeInOut',
                  repeat: Number.POSITIVE_INFINITY
                }
          }
        />
      ))}
    </div>
  );
}
