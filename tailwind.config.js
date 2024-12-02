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
        display: "inset -0.35rem -0.15rem 2rem rgb(168, 162, 158,0.5);",
        outer:
          "inset -0.05rem -0.03rem 0.8rem rgb(28, 25, 23,0.02), 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
      },
      fontFamily: {
        calc: "Courier New, Trebuchet MS",
      },
      colors: {
        darkGreen: "hsl(144,61%,5%)",
      },
    },
  },
  plugins: [],
};
