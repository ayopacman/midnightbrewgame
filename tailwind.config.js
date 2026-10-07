/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deja: {
          blossom: '#FFF0F3',
          blossomLight: '#FFF9FA',
          blossomBorder: '#F8D7DF',
          pink: '#E84A74',
          pinkHover: '#D43862',
          pinkDeep: '#9E334D',
          dark: '#2D2020',
          coffeeBrown: '#4A2828',
          textMuted: '#7A6767',
        },
        midnight: {
          darkest: '#14131A',
          dark: '#1E1B26',
          card: '#292433',
          border: '#3F394D',
          accent: '#A580FF',
          accentHover: '#8C5FFF',
          amber: '#FFB86C',
          cream: '#F4ECE1',
        },
        coffee: {
          espresso: '#2B1704',
          darkRoast: '#3D2314',
          mediumRoast: '#5C3822',
          caramel: '#C68B59',
          crema: '#DEB887',
          foam: '#FFFDF9',
          matcha: '#4E7C59',
          matchaLight: '#8BA888',
          tea: '#7B241C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Quicksand"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Courier New"', 'monospace'],
      },
      animation: {
        'steam': 'steam 3s ease-in-out infinite',
        'steam-delayed': 'steam 3s ease-in-out 1.5s infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-15px) scaleX(1.3) rotate(3deg)', opacity: '0.4' },
          '100%': { transform: 'translateY(-30px) scaleX(1.8) rotate(-4deg)', opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      }
    },
  },
  plugins: [],
}
