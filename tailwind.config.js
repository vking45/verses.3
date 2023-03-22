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
      'thor': '#1A4E76',
      'sherlock': '#5D5C23',
      'loki': '#8BA8B6',
      'watson': '#AEAE8A',
      'romeo': '#264E2C',
      'juliet': '#93A68F',
      'walt': '#143A09',
      'jesse': '#899D7E',
      'bachira': '#37541E',
      'isagi': '#9CAA8C',
    }
  },
  plugins: [],
}
