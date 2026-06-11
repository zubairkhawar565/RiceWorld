/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f3f4f6',
          DEFAULT: '#1a1a1a',
          dark: '#000000',
        },
        accent: {
          light: '#d4af37', // Gold for luxury feel
          DEFAULT: '#b8860b',
          dark: '#996515',
        },
        secondary: '#fdfbf7', // Off-white for clean look
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
