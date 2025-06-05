/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  safelist: [
    'dark',
    'bg-background',
    'text-foreground',
    'bg-card',
    'text-card-foreground',
    'border-border',
    'bg-muted',
    'text-muted-foreground',
    'bg-popover',
    'text-popover-foreground'
  ],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: '#1E1E1E',
        foreground: '#FFFFFF',

        primary: {
          DEFAULT: '#3A1C71', // Roxo escuro
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#4C3F91', // Azul profundo
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#B8A9C9', // Roxo claro
          foreground: '#1E1E1E',
        },
        card: {
          DEFAULT: '#1E1E1E',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#333333',
          foreground: '#B8A9C9',
        },
        border: '#333333',
        input: '#333333',
        ring: '#7F5283',

        success: '#4CAF50',
        warning: '#FFC107',
        danger: '#F44336',

        chart: {
          1: '#3A1C71',
          2: '#4C3F91',
          3: '#7F5283',
          4: '#B8A9C9',
          5: '#4CAF50',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
