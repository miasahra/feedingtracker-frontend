
const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./public/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
      gray: colors.blueGray,
    },
    extend: {
      fontFamily: { sans: ["Inter var", ...defaultTheme.fontFamily.sans] },
      screens: { print: { raw: "print" } }, // use utilities like print:text-black
      container: { center: true },
    },
  },
  variants: { extend: {} },
  plugins: [],
}