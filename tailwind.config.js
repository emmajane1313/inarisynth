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
        lensLight: "#ABFE2C",
        lensDark: "#00501E",
        themeBlue: "#9FD4FB"
      },
      fontFamily: {
        distro: "Distro Mix",
        space: "Space Grotesk",
        sourceReg: "Source Code Pro"
      },
      transformOrigin: {
        homeAnim: '0 0'
      }
    },
  },
  plugins: [],
}