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
          DEFAULT: '#0a403a',
          dark: '#072623',
        },
        secondary: '#7f9896',
      }
    },
  },
  plugins: [],
}
