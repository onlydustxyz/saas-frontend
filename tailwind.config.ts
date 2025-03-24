import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";

import { BREAKPOINTS } from "./shared/constants/breakpoints";
import { COLORS } from "./shared/theme/colors";
import GradientsPreset from "./shared/theme/tailwind/gradients-preset";
import RadiusPreset from "./shared/theme/tailwind/radius-preset";
import RingsPreset from "./shared/theme/tailwind/rings-preset";
import ShadowPreset from "./shared/theme/tailwind/shadow-preset";
import SizePreset from "./shared/theme/tailwind/size-preset";
import SpacingPreset from "./shared/theme/tailwind/spacing-preset";

const config: Config = withTV({
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [ShadowPreset, RingsPreset, GradientsPreset, SizePreset, SpacingPreset, RadiusPreset],
  theme: {
    extend: {
      fontFamily: {
        clash: "Clash Display",
        sans: ["var(--font-geist)"],
      },
      colors: {
        ...COLORS,
        glass: {
          white: "rgba(255, 255, 255, 0.03)",
          "white-gradient":
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255, 255, 255, 0.03) 50%, rgba(255,255,255,0) 100%)",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          ...COLORS.background,
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          ...COLORS.foreground,
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        stack: {
          DEFAULT: "var(--stack-background)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          ...COLORS.border,
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      screens: {
        mobile: `${BREAKPOINTS.mobile}px`,
        tablet: `${BREAKPOINTS.tablet}px`,
        laptop: `${BREAKPOINTS.laptop}px`,
        desktop: `${BREAKPOINTS.desktop}px`,
        wide: `${BREAKPOINTS.wide}px`,
      },
      maxWidth: {
        mobile: `${BREAKPOINTS.mobile}px`,
        tablet: `${BREAKPOINTS.tablet}px`,
        laptop: `${BREAKPOINTS.laptop}px`,
        desktop: `${BREAKPOINTS.desktop}px`,
        wide: `${BREAKPOINTS.wide}px`,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    typography,
    scrollbar,
    nextui({
      defaultTheme: "dark",
    }),
    require("tailwindcss-animate"),
  ],
});

export default config;
