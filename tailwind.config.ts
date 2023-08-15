import { type Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        unique: "#f9a825",
      },
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],

          primary: "#0277bd",

          secondary: "#e8f2f9",

          accent: "#000",

          neutral: "#f5f5f5",

          "base-100": "#fff",

          info: "#666",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],

          primary: "#0277bd",

          secondary: "#e8f2f9",

          accent: "#fff",

          neutral: "#f5f5f5",

          "base-100": "#000",

          info: "#666",

          success: "#36d399",

          warning: "#fbbd23",

          error: "#f87272",
        },
      },
    ],
  },
  darkMode: ["class", '[data-theme="dark"]'],
} satisfies Config;
