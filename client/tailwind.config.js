/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["src/**/*.js", "src/**/*.jsx"],
  theme: {
    themeVariants: ["dust", "nuclea"],
    extend: {},
  },
  variants: {
    backgroundColor: ["responsive", "dust"],
    textColor: ["responsive", "dust"],
  },
  plugins: [require("tailwindcss-multi-theme")],
};
