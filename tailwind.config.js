/** @type {import('tailwindcss').Config} */
export default {
  base: './src/',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        'primary-dark': '#6B3000',
        secondary: '#F5F0E8',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}