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
    extend: {
      boxShadow: {
        display: "inset -0.35rem -0.15rem 2rem rgb(168, 162, 158,0.7);",
        outerPlastic: " -0.3rem -0.1rem 1.5rem rgb(28, 25, 23,0.1)",
      },
      fontFamily: {
        calc: "Courier New, Trebuchet MS",
      },
    },
  },
  plugins: [],
};
