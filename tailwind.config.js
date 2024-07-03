/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#570df8",
          "secondary": "#f000b8",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#E6FFE6",
          "warning": "#fbbd23",
          "error": "#f87272",
          "Green-200":"#bbf7d0",
        },
        dark: {
          "primary": "#793ef9",
          "secondary": "#f000b8",
          "accent": "#37cdbe",
          "neutral": "#2a2e37",
          "base-100": "#1f2937",
          "info": "#3abff8",
          "success": "#343A40",
          "warning": "#fbbd23",
          "error": "#f87272",
          "Green-200":"#4ade80",
        },
      }
    ],
  },
}
