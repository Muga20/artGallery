/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBackground: '#04111D',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}