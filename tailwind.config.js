// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(240 5.9% 10%)",
        "primary-foreground": "hsl(0 0% 98%)",
        secondary: "hsl(240 4.8% 95.9%)",
        "secondary-foreground": "hsl(240 5.9% 10%)",
      },
    },
  },
  plugins: [],
};
