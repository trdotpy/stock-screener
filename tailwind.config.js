/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      blue: '#084887',
      white: '#F7F5FB',
      red: '#DB162F',
      black: '#0D1116',
      orange: '#ff7849',
      green: '#1B998B',
      purple: '#4c0cfb',
      'purple-light': '#7F7EFF',
      yellow: '#E2C044',
      'gray-dark': '#E2E2E2',
      gray: '#161C22',
      'gray-light': '#d3dce6',
    },
    extend: {
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('tailwind-scrollbar'),
  ],
}
