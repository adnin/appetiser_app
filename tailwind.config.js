module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      container: true,
      padding: "2rem"
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
