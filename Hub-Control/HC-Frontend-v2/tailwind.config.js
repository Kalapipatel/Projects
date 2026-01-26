/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Critical for your theme toggle
  theme: {
    extend: {
      colors: {
        // Preserving your custom dark mode colors
        dark: {
          bg: '#0f172a',   // slate-900
          card: '#1e293b', // slate-800
        }
      }
    },
  },
  plugins: [],
}