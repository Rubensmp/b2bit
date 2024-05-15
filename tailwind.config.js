/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'white': "#FFFFFF",
        'white-1': '#FAFAFA',
        'grey': '#F1F1F1',
        'grey-1': '#999999',
        'blue': '#02274F',
        'blue-1': '#f1f5f9',
        'yellow': '#FDCF00',
        'black': '#262626',
        'red': '#D2042D',
      }
    },
  },
  plugins: [],
}

