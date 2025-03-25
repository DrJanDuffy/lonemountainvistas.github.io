/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2540',
        secondary: '#3A8DDE',
        accent: '#16B286',
        background: '#F7F9FC',
      },
      boxShadow: {
        'property': '0 2px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
} 