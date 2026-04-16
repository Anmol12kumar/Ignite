/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.05)" },
        },
        brain3dPop: {
          "0%": { transform: "perspective(1000px) rotateY(0deg) scale(1) translateY(0px)" },
          "25%": { transform: "perspective(1000px) rotateY(90deg) scale(1.12) translateY(-15px)" },
          "50%": { transform: "perspective(1000px) rotateY(180deg) scale(1) translateY(0px)" },
          "75%": { transform: "perspective(1000px) rotateY(270deg) scale(1.12) translateY(-15px)" },
          "100%": { transform: "perspective(1000px) rotateY(360deg) scale(1) translateY(0px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
        brain3dPop: "brain3dPop 8s linear infinite",
      },
    },
  },
  plugins: [],
};