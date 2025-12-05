/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "Times New Roman", "serif"],
        sans: ["Source Sans Pro", "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1a1a1a",
          secondary: "#4a4a4a",
          accent: "#8b0000",
          neutral: "#6b6b6b",
          "base-100": "#faf9f6",
          "base-200": "#f0ebe3",
          "base-300": "#e5dfd3",
          "base-content": "#1a1a1a",
          info: "#4a4a4a",
          success: "#2d5016",
          warning: "#8b4513",
          error: "#8b0000",
        },
        dark: {
          primary: "#f5f5f5",
          secondary: "#c0c0c0",
          accent: "#cd5c5c",
          neutral: "#808080",
          "base-100": "#1a1a1a",
          "base-200": "#2a2a2a",
          "base-300": "#3a3a3a",
          "base-content": "#f5f5f5",
          info: "#a0a0a0",
          success: "#6b8e23",
          warning: "#cd853f",
          error: "#cd5c5c",
        },
      },
    ],
  },
};
