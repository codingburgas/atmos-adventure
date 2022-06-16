/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["src/**/*.js", "src/**/*.jsx"],
  theme: {
    screens: {
      extra: "1281px",
      desktop: "1023px",
    },
    themeVariants: ["dust", "nuclea"],
    extend: {
      fontFamily: {
        sans: ["Commissioner", ...defaultTheme.fontFamily.sans],
        serif: ["Inter", ...defaultTheme.fontFamily.serif],
        dreamScape: ["Dreamscape", ...defaultTheme.fontFamily.sans],
        dreamScapeSans: ["Dreamscape Sans", ...defaultTheme.fontFamily.sans],
      },
      width: {
        half: "38%",
      },
      backgroundImage: {
        dust: "url('./assets/tempDust.svg')",
        nuclea: "url('./assets/tempNuclea.svg')",
        form: "url('./assets/formBackground.jpg')",
        account:
          "url('https://cdn.discordapp.com/attachments/883768694835130390/986689684820357170/My_project_2.png')",
        lock: "url('https://cdn.discordapp.com/attachments/883768694835130390/986678843786035261/My_project.png')",
        email:
          "url('https://cdn.discordapp.com/attachments/883768694835130390/986687019046551642/My_project_1.png')",
      },
      backgroundSize: {
        20: "27px",
        45: "45px",
        70: "70px",
      },
    },
    colors: {
      darkBlue: "#39575D",
      white: "#FFFFFF",
      lightGreen: "#DAF5D5",
      lightBlue: "#7D7BDC",
      stroke: "#ABCFE9",
      transparent: "transparent",
    },
  },
  variants: {
    backgroundColor: ["responsive", "dust"],
    textColor: ["responsive", "dust"],
  },
  plugins: [require("tailwindcss-multi-theme")],
};
