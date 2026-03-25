import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Manrope"', 'sans-serif'],
        display: ['"Chakra Petch"', 'sans-serif'],
        pixel: ['"Silkscreen"', 'cursive']
      },
      boxShadow: {
        'neon-soft':
          '0 0 0 1px rgba(255, 92, 214, 0.16), 0 18px 50px rgba(7, 4, 20, 0.55), 0 0 42px rgba(255, 92, 214, 0.12)',
        'neon-strong':
          '0 0 0 1px rgba(255, 92, 214, 0.28), 0 24px 60px rgba(6, 4, 18, 0.62), 0 0 60px rgba(255, 92, 214, 0.22)',
        'violet-soft':
          '0 0 0 1px rgba(138, 92, 255, 0.18), 0 20px 54px rgba(10, 7, 24, 0.56), 0 0 46px rgba(138, 92, 255, 0.16)'
      }
    }
  },
  plugins: []
} satisfies Config;
