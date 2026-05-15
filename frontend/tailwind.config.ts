import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#08080c",
        terminal: "#0e0e14",
        panel: "#14141e",
        elevated: "#1a1a28",
        borderDim: "#2a2a3a",
        borderGlow: "#3a3a5a",
        textPrimary: "#d4c5a0",
        textSecondary: "#8a8070",
        textSystem: "#5a7a5a",
        rarityCommon: "#7a7a8a",
        rarityRare: "#4a8ab5",
        rarityElite: "#9b5de5",
        rarityMythic: "#d4a855",
        rarityAscendant: "#ff6b6b",
        accentFire: "#e85d3a",
        accentIce: "#5bc0de",
        accentNature: "#5a8a5a",
        accentShadow: "#6a4c93",
        accentHoly: "#f0d060",
      },
      boxShadow: {
        glow: "0 0 30px rgba(156, 93, 229, 0.18)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        ui: ["var(--font-ui)"],
      },
    },
  },
  plugins: [],
};

export default config;
