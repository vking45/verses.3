/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jura: "'Jura', sans-serif",
      }
    },
    colors: {
      'main': '#121212',
      'primary': '#dedede',
      'secondary': '#242424',
      'etc1': '#1A4E76',
      'etc2': '#5D5C23',
      'etc3': '#8BA8B6',
      'etc4': '#AEAE8A',
    }
  },
  plugins: [],
}
