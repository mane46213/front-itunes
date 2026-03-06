/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8f6',
          100: '#dff0ed',
          200: '#bfe1db',
          300: '#9ecdc6',
          400: '#7eb4b0',
          500: '#16A085',
          600: '#129075',
          700: '#0d6b55',
          800: '#085c49',
          900: '#044d3e',
        },
        promaire: '#129075',
        secondary: '#7C3AED',
        success: '#22C55E',
        alert: '#F59E08',
        danger: '#EF4444',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        'light': '#FFFFEF',
      },
    },
  },
  plugins: [],
};
