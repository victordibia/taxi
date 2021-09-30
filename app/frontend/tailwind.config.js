module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      translate: ["active", "group-hover"],
      backgroundColor: ["active"],
      display: ["group-hover"],
      opacity: ["group-hover"],
    },
  },
  plugins: [],
};
