import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#090907",
        emerald: "#0f2a22",
        ivory: "#f5efe3",
        gold: {
          100: "#f6e8bf",
          200: "#e8cf8c",
          300: "#d8b76d",
          400: "#c69a45",
          500: "#9a7131"
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Arial", "sans-serif"]
      },
      boxShadow: {
        gold: "0 0 40px rgba(216, 183, 109, 0.18)"
      },
      backgroundImage: {
        "radial-gold": "radial-gradient(circle at center, rgba(216,183,109,0.16), transparent 60%)"
      }
    }
  },
  plugins: []
};

export default config;
