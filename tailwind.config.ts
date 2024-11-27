import type { Config } from 'tailwindcss';

export default {
  darkMode: 'selector',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        neutral: 'var(--color-neutral)',
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
        roboto: 'var(--font-roboto)',
        lora: 'var(--font-lora)',
      },
      container: {
        center: true,
        padding: '0.75rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
