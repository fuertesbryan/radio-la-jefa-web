/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jefa: {
          dark: '#0f0f13',
          card: '#181820',
          accent: '#e63946',
          gold: '#f1c40f',
          goldHover: '#d4ac0d',
          goldLight: '#fef9e7',
          gray: '#8d99ae',
        }
      }
    },
  },
  plugins: [],
}
