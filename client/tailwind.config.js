/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Oswald': ['Staatliches', 'cursive'],
      }
    },
  },
  plugins: [],
}