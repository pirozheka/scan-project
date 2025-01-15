/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    colors: {
      aqua: "#029491",
      orange: '#FFB64F',
      lightAqua: '#7CE3E1',
      violet: '#5970FF'
    },
    extend: {
      borderRadius: {
        'md': '5px',
        'lg': '10px',
      }
    },
  },
  plugins: [],
}

