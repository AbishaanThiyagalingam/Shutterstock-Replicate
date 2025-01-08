/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx,js,html}",
    "./src/components/**/*.{ts,tsx,js,html}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xs: "450px",
        sm: "575px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        container: "1.5rem",
        section: "2rem",
        "header-height": "4rem",
      },
      colors: {
        border: "hsl(var(--border, 210, 24%, 87%))", // Fallback for --border
        input: "hsl(var(--input, 210, 22%, 96%))",
        ring: "hsl(var(--ring, 210, 50%, 50%))",
        background: "hsl(var(--background, 0, 0%, 100%))",
        foreground: "hsl(var(--foreground, 210, 10%, 23%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 210, 85%, 50%))",
          foreground: "hsl(var(--primary-foreground, 210, 90%, 96%))",
          bright: "hsl(var(--bright-primary, 210, 70%, 60%))",
          indigo: "hsl(var(--deep-indigo, 245, 50%, 40%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 270, 80%, 60%))",
          foreground: "hsl(var(--secondary-foreground, 270, 90%, 96%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 0, 60%, 50%))",
          foreground: "hsl(var(--destructive-foreground, 0, 70%, 96%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 210, 15%, 60%))",
          foreground: "hsl(var(--muted-foreground, 210, 10%, 70%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 150, 80%, 40%))",
          foreground: "hsl(var(--accent-foreground, 150, 90%, 96%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0, 0%, 100%))",
          foreground: "hsl(var(--popover-foreground, 210, 10%, 23%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0, 0%, 100%))",
          foreground: "hsl(var(--card-foreground, 210, 10%, 23%))",
        },
        yellow: "#FBB040",
        "body-color": "#788293",
        "body-color-dark": "#959CB1",
        "gray-dark": "#1E232E",
        "gray-light": "#F0F2F9",
        stroke: "#E3E8EF",
        "stroke-dark": "#353943",
        "bg-color-dark": "#171C28",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
        "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
        submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
        "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
        btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
        "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
