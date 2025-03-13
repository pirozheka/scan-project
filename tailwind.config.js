/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'bg-orange',
    'bg-lightAqua',
    'bg-black'
  ],
  theme: {
    colors: {
      aqua: "#029491",
      orange: '#FFB64F',
      lightAqua: '#7CE3E1',
      violet: '#5970FF',
      black: '#000000',
      white: '#ffffff',
      red: '#FF2400',
      gray: '#949494',
      green: '#8AC540'
    },
    extend: {
      borderRadius: {
        'md': '5px',
        'lg': '10px',
      },
      fontFamily: {
        ferry: ['Ferry', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      boxShadow: {
        'custom': '0 0 15px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}