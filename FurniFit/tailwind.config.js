// CommonJS is fine in your setup
module.exports = {
  darkMode: "class",
  content: ["./public/index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { lg: "1024px", xl: "1200px" },
    },
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          600: "#4f46e5", // primary
          700: "#4338ca",
          900: "#1e1b4b",
        },
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.05), 0 1px 3px rgba(16,24,40,.1)",
        soft: "0 10px 25px rgba(2,6,23,.06)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
