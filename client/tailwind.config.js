/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["src/**/*.js", "src/**/*.jsx"],
  theme: {
    themeVariants: ["dust", "nuclea"],
    extend: {
      fontFamily: {
        sans: ["Commissioner", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        landing: "url('./assets/tempBackground.svg')",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "dust"],
    textColor: ["responsive", "dust"],
  },
  plugins: [require("tailwindcss-multi-theme")],
};
