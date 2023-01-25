/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "mobile":{"max":"360px"},
        "tab":{"max":"500px"},
        "untab":{"min":"500px"}
      }
    },
  },
  plugins: [],
}