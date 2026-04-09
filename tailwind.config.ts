import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Sans 3"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          50: '#fdf4ef',
          100: '#fbe6d8',
          200: '#f6c9b0',
          300: '#f0a67e',
          400: '#e8834f',
          500: '#d97757',
          600: '#c4613d',
          700: '#a34d33',
          800: '#84402e',
          900: '#6b3628',
        },
        surface: {
          0: 'var(--surface-0)',
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
        },
        border: {
          DEFAULT: 'var(--border)',
          light: 'var(--border-light)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
      },
    },
  },
  plugins: [],
}

export default config
