/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["src/**/*.js", "src/**/*.jsx"],
  theme: {
    screens: {
      extraXl: "2399px",
      xl: "1600px",
      el: "1535px",
      extra: "1281px",
      desktop: "1023px",
      tablet: "768px",
    },
    themeVariants: ["dust", "nuclea"],
    extend: {
      fontFamily: {
        sans: ["Commissioner", ...defaultTheme.fontFamily.sans],
        serif: ["Inter", ...defaultTheme.fontFamily.serif],
        dreamScape: ["Dreamscape", ...defaultTheme.fontFamily.sans],
        dreamScapeSans: ["Dreamscape Sans", ...defaultTheme.fontFamily.sans],
        raleway: ["Raleway", ...defaultTheme.fontFamily.sans],
        josefin: ["Josefin Sans", ...defaultTheme.fontFamily.sans],
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
        404: "url('./assets/404.jpg')",
        forms: "url('./assets/forms.png')",
        dashboardBg: "url('./assets/dashboardBg.jpg')",
        profileBg: "url('./assets/profileBg.jpg')",
        Blobs: "url('./assets/Blobs.png')",
      },
      backgroundSize: {
        20: "27px",
        45: "45px",
        70: "70px",
        300: "380px",
        700: "700px",
      },
    },
    colors: {
      darkBlue: "#39575D",
      white: "#FFFFFF",
      lightGreen: "#DAF5D5",
      lightBlue: "#7D7BDC",
      stroke: "#ABCFE9",
      transparent: "transparent",
      smoothWhite: "#F6F4EA",
      smoothPurple: "#B08BD6",
      red: "#FF0000",
      button: "rgba(68, 66, 158, 0.3)",
      cards: "rgba(70, 100, 118, 0.4)",
    },
    keyframes: {
      trX: {
        "0%": { transform: "translateX(100%)" },
        "100%": { transform: "translateX(0%)" },
      },
      trXRev: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
      spin: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
      scrollEmoticon: {
        "0%": { transform: "translateY(0)", opacity: 0 },
        "10%": { transform: "translateY(0)", opacity: 1 },
        "100%": { transform: "translateY(15%)", opacity: 0 },
      },
    },
    animation: {
      trX: "trX 1s ease-in-out",
      trXRev: "trXRev 1s ease-in-out",
      spin: "spin 2s linear infinite",
      scrollEmoticon: "scrollEmoticon 1.5s infinite",
    },
  },
  variants: {
    backgroundColor: ["responsive", "dust"],
    textColor: ["responsive", "dust"],
  },
  plugins: [
    require("tailwindcss-multi-theme"),
    require("tailwind-scrollbar-hide"),
  ],
};
