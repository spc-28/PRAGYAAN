/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        robotoCondensed: ['Roboto Condensed', 'sans-serif'],
      },
      screens:{
        '3xl': '1900px',
        'mac': '1810px',
        'mini': "700px"
      }
    },
  },
  plugins: [],
}