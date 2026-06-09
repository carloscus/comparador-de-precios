/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'module-comparador',
    'btn-module', 'btn-outline',
    'input-module',
    'surface', 'surface-card', 'surface-elevated', 'glass',
    'fade-in', 'slide-up', 'scale-in', 'interactive',
    'focus-visible',
    'grid-responsive',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}