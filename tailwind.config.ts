import { nextui } from "@nextui-org/react";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";
import { withTV } from "tailwind-variants/transformer";
import type { Config } from "tailwindcss";

import { BREAKPOINTS } from "./shared/constants/breakpoints";

const config: Config = withTV({
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { alfreda: ["Alfreda"], walsheim: ["GT Walsheim"], belwe: ["Belwe"] },
      colors: {
        /** CONTAINER */
        "container-1": "var(--container-1)",
        "container-2": "var(--container-2)",
        "container-3": "var(--container-3)",
        "container-4": "var(--container-4)",
        "container-action": "var(--container-action)",
        "container-inverse": "var(--container-inverse)",
        "container-stroke-separator": "var(--container-stroke-separator)",
        "container-backdrop": "var(--container-backdrop)",

        /** TEXT */
        "text-1": "var(--text-1)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
        "text-4": "var(--text-4)",

        /** LABEL */
        "label-red": "var(--label-red)",
        "label-pink": "var(--label-pink)",
        "label-green": "var(--label-green)",
        "label-yellow": "var(--label-yellow)",
        "label-orange": "var(--label-orange)",
        "label-purple": "var(--label-purple)",
        "label-blue": "var(--label-blue)",
        "label-grey": "var(--label-grey)",

        /** INTERACTION */
        "interactions-error-default": "var(--interactions-error-default)",
        "interactions-error-hover": "var(--interactions-error-hover)",
        "interactions-error-active": "var(--interactions-error-active)",
        "interactions-error-disabled": "var(--interactions-error-disabled)",
        "interactions-white-default": "var(--interactions-white-default)",
        "interactions-white-hover": "var(--interactions-white-hover)",
        "interactions-white-active": "var(--interactions-white-active)",
        "interactions-white-disabled": "var(--interactions-white-disabled)",
        "interactions-black-default": "var(--interactions-black-default)",
        "interactions-black-hover": "var(--interactions-black-hover)",
        "interactions-black-active": "var(--interactions-black-active)",
        "interactions-black-disabled": "var(--interactions-black-disabled)",

        /**BRAND */
        "brand-1": "var(--_Brand1)",
        "brand-2": "var(--_Brand2)",
        "brand-3": "var(--_Brand3)",
        "brand-4": "var(--_Brand4)",

        /**CHART */
        "chart-1": "var(--_Chart1)",
        "chart-2": "var(--_Chart2)",
        "chart-3": "var(--_Chart3)",
        "chart-4": "var(--_Chart4)",
      },
      screens: {
        mobile: `${BREAKPOINTS.mobile}px`,
        tablet: `${BREAKPOINTS.tablet}px`,
        laptop: `${BREAKPOINTS.laptop}px`,
        desktop: `${BREAKPOINTS.desktop}px`,
        wide: `${BREAKPOINTS.wide}px`,
      },
    },
  },
  plugins: [
    typography,
    scrollbar,
    nextui({
      defaultTheme: "dark",
      // themes: {
      //   dark: {
      //     colors: {
      //       background: "transparent",
      //       primary: "#AE00FF", // Space Purple 500
      //     },
      //     layout: {
      //       radius: {
      //         large: "10px",
      //       },
      //       boxShadow: {
      //         medium: "0px 8px 64px 0px rgba(0, 0, 0, 0.32)",
      //       },
      //     },
      //   },
      // },
    }),
  ],
});

export default config;
