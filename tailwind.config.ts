import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-bottom': {
          '0%': {
            transform: 'translateY(50px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'fade-out-bottom': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(50px)',
            opacity: '0',
          },
        },
        'backdrop-fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0.3',
          },
        },
        'backdrop-fade-out': {
          '0%': {
            opacity: '0.3',
          },
          '100%': {
            opacity: '0',
          },
        },
        'wobble-hor-bottom': {
          '0%': {
            transform: 'translateX(0%)',
            'transform-origin': ' 50% 50%',
            opacity: '0.8',
            filter: 'brightness(0.7) saturate(100%)',
          },
          '100%': { transform: 'translateX(0%)', 'transform-origin': ' 50% 50%', opacity: '1' },
          '15%': {
            transform: 'translateX(-3px) rotate(-6deg)',
          },
          '30%': {
            transform: 'translateX(1.5px) rotate(6deg)',
          },
          '45%': {
            transform: 'translateX(-1.5px) rotate(-7.6deg)',
          },
          '60%': {
            transform: 'translateX(0.9px) rotate(4.4deg)',
          },
          '75%': {
            transform: 'translateX(-0.6px) rotate(-1.2deg)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        fadeInBottom: 'fade-in-bottom 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;',
        fadeOutBottom: 'fade-out-bottom 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        backdropFadeIn: 'backdrop-fade-in 0.5s ease-out both',
        backdropFadeOut: 'backdrop-fade-out 0.5s ease-out both',
        wobbleHorBottom: 'wobble-hor-bottom 0.7s infinite ease-out both',
        fadeIn: 'fadeIn 0.6s ease-in-out',
        fadeOut: 'fadeOut 0.6s ease-in-out',
      },
      fontFamily: {
        Galmuri9: ['Galmuri9', 'sans-serif'],
        Galmuri7: ['Galmuri7', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
