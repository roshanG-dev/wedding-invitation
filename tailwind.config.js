// tailwind.config.js
export default {
  content: ["./index.html", "./src/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        greatvibes: ["'Great Vibes'", "cursive"],
        pacifico: ["'Pacifico'", "cursive"],
        dancing: ["'Dancing Script'", "cursive"],
      },
    },
  },
  plugins: [],
};
