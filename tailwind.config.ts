import type { Config } from 'tailwindcss'
import { fontFamily, spacing } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        md: '720px',
      },
      colors: {
        gr33n: 'rgb(var(--gr33n) / <alpha-value>)',
        'app-bg': 'var(--app-bg)',
        'app-fg': 'var(--app-fg)',
        keyline: 'var(--keyline)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      keyframes: {
        glitch: {
          '0%': {
            'clip-path':
              'polygon(27% 56%, 66% 81%, 28% 70%, 97% 23%, 21% 44%, 64% 83%, 10% 82%, 88% 23%, 69% 8%, 39% 25%, 20% 88%, 91% 72%, 59% 20%, 48% 71%, 51% 73%, 97% 79%, 49% 30%, 7% 66%, 1% 82%, 15% 6%, 14% 32%, 98% 3%, 88% 46%, 58% 57%, 53% 29%, 57% 29%)',
            color: 'rgb(var(--gr33n) / 1)',
          },
          '4%': {
            'clip-path':
              'polygon(92% 91%, 21% 94%, 60% 75%, 58% 90%, 60% 4%, 40% 66%, 44% 34%, 40% 73%, 5% 56%, 81% 69%, 7% 22%, 90% 95%, 26% 2%, 5% 14%, 13% 87%, 54% 86%, 0% 72%, 96% 18%, 11% 72%, 39% 42%, 46% 10%, 55% 63%, 40% 79%, 76% 6%, 22% 85%, 6% 71%)',
            color: 'rgb(var(--gr33n) / 1)',
          },
          '6%': {
            'clip-path':
              'polygon(60% 46%, 90% 47%, 63% 20%, 35% 61%, 72% 10%, 13% 27%, 86% 68%, 26% 43%, 5% 20%, 77% 96%, 28% 40%, 26% 89%, 81% 59%, 12% 96%, 9% 39%, 3% 52%, 86% 12%, 70% 88%, 25% 39%, 54% 12%, 54% 8%, 10% 33%, 72% 85%, 4% 71%, 46% 59%)',
            color: 'rgb(var(--gr33n) / 1)',
          },
          '11%': {
            'clip-path':
              'polygon(11% 88%, 93% 18%, 73% 11%, 85% 8%, 36% 31%, 52% 34%, 3% 90%, 22% 97%, 77% 96%, 38% 22%, 85% 41%, 24% 63%, 80% 2%, 80% 75%, 55% 6%, 65% 41%, 94% 56%, 20% 13%, 77% 3%, 65% 13%, 4% 86%, 96% 66%, 57% 19%, 79% 13%, 50% 70%, 93% 81%)',
            color: 'rgb(var(--gr33n) / 1)',
          },
          '14%': {
            'clip-path':
              'polygon(80% 20%, 78% 81%, 62% 82%, 16% 11%, 17% 70%, 7% 56%, 58% 68%, 52% 34%, 86% 36%, 18% 54%, 72% 97%, 91% 89%, 87% 97%, 63% 20%, 28% 20%, 85% 14%, 50% 50%, 32% 76%, 89% 3%, 98% 1%, 85% 75%, 33% 32%, 82% 2%, 4% 19%, 50% 6%, 24% 20%)',
            color: 'rgb(var(--gr33n) / 1)',
          },
          '20%': {
            'clip-path':
              'polygon(69% 40%, 84% 21%, 40% 18%, 78% 98%, 33% 34%, 39% 50%, 56% 11%, 100% 17%, 53% 29%, 40% 82%, 17% 8%, 81% 29%, 54% 75%, 85% 0%, 28% 31%, 94% 37%, 54% 15%, 13% 22%, 55% 37%, 1% 48%, 43% 0%, 95% 40%, 46% 49%, 84% 40%, 5% 75%, 1% 16%)',
            color: 'rgb(var(--gr33n) / 1)',
          },
          '1%, 5%, 7%, 12%, 15%, 21%': {
            'clip-path': 'none',
            color: 'var(--app-fg)',
          },
        },
        scroll: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: `translateX(calc(-100% - ${spacing[8]}))`,
          },
        },
      },
      animation: {
        glitch: 'glitch 7000ms infinite linear alternate',
        scroll: 'scroll 20000ms linear infinite reverse',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: ['class', ],
  plugins: [],
}

export default config
