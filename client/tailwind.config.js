/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Oswald': ['Oswald', 'cursive'],
      }
    },
  },
  plugins: [],
}