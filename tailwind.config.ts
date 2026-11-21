import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        muted: "#6d776f",
        brand: "#176b45",
        lime: "#d9f36a",
        canvas: "#f7f8f4"
      },
      boxShadow: {
        soft: "0 12px 36px rgba(22, 40, 28, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;