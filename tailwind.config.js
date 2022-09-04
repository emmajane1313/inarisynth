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
        offBlack: "#111313",
        synth: "#1DFAE6",
        grad1: "#86EEB4",
        grad2: "#B9D6FF",
        grad3: "#DBBFFF",
        grad4: "#EB91F4",
        lensLight: "#ABFE2C"
      },
      fontFamily: {
        distro: "Distro Mix"
      },
      transformOrigin: {
        homeAnim: '0 0'
      }
    },
  },
  plugins: [],
}