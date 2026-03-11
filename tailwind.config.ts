import type { Config } from 'tailwindcss'

const config: Config = {
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
          0: '#faf9f5',
          1: '#ffffff',
          2: '#f5f3ee',
        },
        border: {
          DEFAULT: '#e8e5de',
          light: '#f0ede6',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#5a5a5a',
          muted: '#8a8a8a',
        },
      },
    },
  },
  plugins: [],
}

export default config
