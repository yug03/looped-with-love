import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#E8A0BF',
        secondary: '#BA90C6',
        'accent-blue': '#C0DBEA',
        'accent-warm': '#F2D388',
        background: '#FFF8F0',
        'card-bg': '#FFFFFF',
        'text-primary': '#2D2D2D',
        'text-secondary': '#6B6B6B',
        success: '#7DB9B6',
        danger: '#E57373',
        'dark-bg': '#1A1614',
        'dark-card': '#251E1B',
        'dark-surface': '#2E2522',
        'dark-border': '#3D3330',
        'dark-text': '#F5EDE8',
        'dark-text-secondary': '#B8A9A4',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        nunito: ['"Nunito"', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 2px 15px rgba(232, 160, 191, 0.15)',
        card: '0 4px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 30px rgba(232, 160, 191, 0.25)',
        button: '0 2px 10px rgba(232, 160, 191, 0.4)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(5deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-3deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
