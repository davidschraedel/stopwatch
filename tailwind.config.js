/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      xxsm: ".5rem",
      xsm: "1rem",
      sm: "3rem",
      md: "4rem",
      lg: "6rem",
      xl: "6.5rem",
      xxl: "7rem",
    },
  },
  plugins: [],
};
