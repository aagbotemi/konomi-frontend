/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      pink: "#DC398C",
      purple_light: "#902784",
      purple_dark: "#170C2E",
      purple: "#68299A",
      blue_dark: "#02062B",
      blue_light: "#00A3DE",
      blue: "#0E67AB",
      blue_deep: "#216781",
      grey_dark: "#222F38",
      grey_light: "#ABB0B3",
      grey: "#697278",
      black: '#000000',
      black_faint: "#11142C",
      white: '#ffffff',
      green: "#4BA94A",
    },
    fontFamily: {
      "poppins": ["Poppins", "sans-serif"],
      "mono": ["monospace"]
    },
    extend: {},
  },
  plugins: [],
}
