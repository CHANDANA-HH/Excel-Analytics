/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        times: ['"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}

module.exports = {
  darkMode: 'class', // ⭐ important!
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}
