/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-translucent": "rgba(13, 110, 253, 0.8)", // Custom translucent blue
        "dark-translucent": "rgba(36, 36, 36, 0.9)", // Custom translucent dark
      },
    },
  },
  plugins: [],
};
