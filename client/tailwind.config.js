/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["src/**/*.js", "src/**/*.jsx"],
  theme: {
    screens: {
      laptop: "1537px",
    },
    themeVariants: ["dust", "nuclea"],
    extend: {
      fontFamily: {
        sans: ["Commissioner", ...defaultTheme.fontFamily.sans],
        serif: ["Inter", ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        dust: "url('./assets/tempDust.svg')",
        nuclea: "url('./assets/tempNuclea.svg')",
        form: "url('./assets/formBackground.svg')",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "dust"],
    textColor: ["responsive", "dust"],
  },
  plugins: [require("tailwindcss-multi-theme")],
};
