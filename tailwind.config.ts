
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
          darkgold: '#A08B2C', // Darker gold for hover states
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
