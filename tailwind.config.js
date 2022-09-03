/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/modules/**/*.{ts,tsx}",
    "./src/common/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offWhite: "#F7F8E8",
        offBlack: "#111313"
      },
      fontFamily: {
        distro: "Distro Mix"
      },
    },
  },
  plugins: [],
}