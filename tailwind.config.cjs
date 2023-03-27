/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'narbarBg': '#012e40',
        'narbarBg1': '#024959',
        'narbarBg2': '#026773',
        'narbarBg3': '#3ca6a6',
        'bgShadow': 'rgba(0,0,0,0.5)',
        'navbarFont': '#f2e3d5',
      }
    },
  },
  plugins: [],
}