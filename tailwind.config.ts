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
        'slide-in-elliptic-bottom-bck': {
          '0%': {
            transform: 'translateY(600px) rotateX(-30deg) scale(6.5)',
            'transform-origin': '50% -100%',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0) rotateX(0) scale(1)',
            'transform-origin': '50% 500px',
            opacity: '1',
          },
        },
        'slide-out-elliptic-bottom-fwd': {
          '0%': {
            transform: 'translateY(0) rotateX(0) scale(1)',
            'transform-origin': '50% 500px',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(600px) rotateX(-20deg) scale(6)',
            'transform-origin': '50% -100%',
            opacity: '0',
          },
        },
      },
      animation: {
        slideInEllipticBottomBck: 'slide-in-elliptic-bottom-bck 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        slideOutEllipticBottomFwd: 'slide-out-elliptic-bottom-fwd 0.7s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
export default config;
