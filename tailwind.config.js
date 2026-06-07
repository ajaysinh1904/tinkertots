/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunshine: '#FFD93D',
        coral: '#FF6B6B',
        skyblue: '#74C0FC',
        mint: '#69DB7C',
        lavender: '#B197FC',
        cream: '#FFF8EE',
        navy: '#1A1A2E',
      },
      fontFamily: {
        display: ['"Baloo 2"', 'cursive'],
        body: ['"Nunito"', 'sans-serif'],
        accent: ['"Fredoka One"', 'cursive'],
      },
      animation: {
        'blob-morph': 'blob-morph 10s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
      keyframes: {
        'blob-morph': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '33%': { borderRadius: '70% 30% 50% 50% / 50% 60% 40% 60%' },
          '66%': { borderRadius: '50% 50% 30% 70% / 40% 40% 60% 60%' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}

