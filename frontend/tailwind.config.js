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
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(52, 211, 153, 0)" },
          "50%": { boxShadow: "0 0 25px rgba(52, 211, 153, 0.4)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-4px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(4px)" },
        },
        gradientFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        floatBounce: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        ctaPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(52, 211, 153, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(52, 211, 153, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
        brain3dPop: "brain3dPop 8s linear infinite",
        slideUp: "slideUp 0.5s ease-out",
        slideDown: "slideDown 0.5s ease-out",
        glow: "glow 3s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
        gradientFlow: "gradientFlow 8s ease infinite",
        floatBounce: "floatBounce 3s ease-in-out infinite",
        spinSlow: "spinSlow 3s linear infinite",
        ctaPulse: "ctaPulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        fadeInScale: "fadeInScale 0.6s ease-out",
      },
    },
  },
  plugins: [],
};