import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vendeai: {
          gold: '#D4AF37', // Adjust this gold color as needed
        }
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
