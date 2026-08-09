import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        md: "2rem",
        lg: "2.625rem"
      }
    },
    extend: {
      colors: {
        bg: "#FCFCFA",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#20221F",
          2: "#747871",
          3: "#9A9D97"
        },
        line: "#E8EAE5",
        green: {
          DEFAULT: "#3EAD35",
          tint: "#EAF5E8",
          hover: "#359A2D"
        },
        brown: {
          DEFAULT: "#754513",
          tint: "#F4EDE5"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      fontSize: {
        "hero-lg": ["clamp(36px, 3.4vw + 22px, 64px)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "tit-lg": ["clamp(27px, 1.4vw + 22px, 42px)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        eyebrow: ["11px", { lineHeight: "1", letterSpacing: "0.16em" }]
      },
      maxWidth: {
        editorial: "1200px"
      },
      transitionTimingFunction: {
        sa: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        "sa-soft": "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      keyframes: {
        halo: {
          "0%": { opacity: "0.45", transform: "scale(1)" },
          "70%": { opacity: "0", transform: "scale(2.4)" },
          "100%": { opacity: "0", transform: "scale(2.4)" }
        }
      },
      animation: {
        halo: "halo 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite"
      }
    }
  },
  plugins: []
};

export default config;
