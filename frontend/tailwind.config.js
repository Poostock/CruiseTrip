/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/react-tailwindcss-datetimepicker/dist/react-tailwindcss-datetimepicker.js",
  ],

  theme: {
      extend: {
          colors: {
              white: "#FFFFFF",
              secondary: "#D9EDAC",
              third: "#B3B3B3",
              black: "#000000",
              green: "#C9FE54",
              gray: "#242424",
              hover: "#8BC804",
              iconUser: "#96B84B",
              createBTN: "#383838",
              use: "#C9FE59",
              dropZone: "#C4C4C4",
              success: "#4caf50",
              error: "#f44336",
              blue: "#00BFFF",
              highblue: "#133e87",
              bluelight: "#ADD8E6",
          },
          fontFamily: {
              sans: ["Poppins", "sans-serif"],
          },
          spacing: {
              112: "28rem",
              120: "30rem",
              '5': '1.25rem',
          },
      },
  },
  plugins: [],
};