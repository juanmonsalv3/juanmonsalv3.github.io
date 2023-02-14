/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      flexBasis: {
        '1/13': '7.5%',
        '3/13': '22.5%',
      }
    },
  },
  plugins: [],
}
