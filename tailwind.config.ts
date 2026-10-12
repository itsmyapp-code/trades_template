import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-primary, #0f172a)',
          'primary-hover': 'var(--color-primary-hover, #1e293b)',
          secondary: 'var(--color-secondary, #f59e0b)',
          'secondary-hover': 'var(--color-secondary-hover, #d97706)',
          accent: 'var(--color-accent, #b45309)',
          bg: 'var(--color-background, #faf9f5)',
          surface: 'var(--color-surface, #ffffff)',
          border: 'var(--color-border, #e2e8f0)',
          text: 'var(--color-text-main, #0f172a)',
          muted: 'var(--color-text-muted, #64748b)',
        },
        sistine: {
          dark: '#1e293b',
          navy: '#0f172a',
          blue: '#2c3e50',
          sand: '#f5f3ee',
          cream: '#faf9f5',
          gold: '#c69234',
          goldLight: '#fef3c7',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Cinzel', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius-card, 1rem)',
      },
    },
  },
  plugins: [],
};
export default config;
