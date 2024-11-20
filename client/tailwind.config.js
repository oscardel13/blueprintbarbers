/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        spin90: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
      },
      animation: {
        spin90: "spin90 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
  important: true, // Remove this once bootstrap is uninstalled
};
