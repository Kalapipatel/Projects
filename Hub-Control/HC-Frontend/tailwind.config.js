/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // You can extend specific dark mode colors here if needed
        dark: {
          bg: '#0f172a', // slate-900
          card: '#1e293b', // slate-800
        }
      }
    },
  },
  plugins: [],
}