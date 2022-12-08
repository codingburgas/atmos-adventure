/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    themeVariants: ["dust", "nuclea"],
  },
  variants: {},
  plugins: [require("tailwindcss-multi-theme")],
};
