/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        card: '#141414',
        'card-hover': '#1a1a1a',
        'border-subtle': '#1f1f1f',
        'text-muted': '#666666',
        'text-dim': '#888888',
        'teal': '#73A1B1',
        'teal-light': '#9bc2cf',
        'teal-dark': '#475059',
        bluegray: {
          950: '#11171c',
          900: '#1a242b',
          800: '#263640',
          700: '#475059',
          600: '#5F7482',
          500: '#668190',
          400: '#73A1B1',
          300: '#9bc2cf',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display': 'clamp(4rem, 12vw, 14rem)',
        'display-sm': 'clamp(2.5rem, 7vw, 6rem)',
        'headline': 'clamp(2rem, 5vw, 4rem)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
}
