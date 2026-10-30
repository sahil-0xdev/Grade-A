/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F9870D',
          'orange-hover': '#ea7600',
          'orange-light': '#ff9b30',
          'orange-subtle': 'rgba(249, 135, 13, 0.12)',
          'orange-border': 'rgba(249, 135, 13, 0.35)',
          black: '#000000',
          white: '#FFFFFF',
          dark: '#0a0a0a',
          card: '#121212',
          border: '#262626'
        },
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#F9870D', // Official Brand Orange
          600: '#ea7600',
          700: '#c25e00',
          800: '#9a4b00',
          900: '#7c3d00',
          950: '#431c00',
        },
        risk: {
          low: '#10b981',     // emerald-500
          medium: '#f59e0b',  // amber-500
          high: '#ef4444',    // red-500
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'card-hover': '0 12px 30px -10px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
