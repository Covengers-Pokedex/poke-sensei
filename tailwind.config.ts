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
        'scale-in-ver-center': {
          '0%': {
            transform: 'scaleY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scaleY(1)',
            opacity: '1',
          },
        },
        'scale-out-ver-center': {
          '0%': {
            transform: 'scaleY(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scaleY(0)',
            opacity: '1',
          },
        },
      },
      animation: {
        scaleInVerCenter: 'scale-in-ver-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        scaleOutVerCenter: 'scale-out-ver-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
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
