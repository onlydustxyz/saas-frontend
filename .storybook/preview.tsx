import "@/public/fonts/clash/stylesheet.css";
import "@/public/fonts/inter/stylesheet.css";
import { Controls, Description, Primary, Stories, Subtitle, Title } from "@storybook/blocks";
import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import React from "react";
import "remixicon/fonts/remixicon.css";

import "@/app/globals.css";

import { TranslationProvider } from "../shared/translation/components/translation-provider/translation-provider";
// @ts-ignore
import Logo from "./static/logo.svg";

const preview: Preview = {
  decorators: [
    Story => (
      <TranslationProvider>
        <Story />
      </TranslationProvider>
    ),
  ],
  parameters: {
    darkMode: {
      darkClass: "dark",
      lightClass: "light",
      classTarget: "html",

      dark: {
        ...themes.dark,
        fontBase: '"Inter", sans-serif',
        fontCode: "monospace",
        brandTitle: "Onlydust - Design System",
        brandUrl: "https://onlydust.com",
        brandImage: "https://cdn.prod.website-files.com/6526608bf8ef4218fa12c988/6526608bf8ef4218fa12ca2c_Left.png",
      },
      light: {
        ...themes.normal,
        fontBase: '"Inter", sans-serif',
        fontCode: "monospace",
        brandTitle: "Onlydust - Design System",
        brandUrl: "https://onlydust.com",
        brandImage: "https://cdn.prod.website-files.com/6526608bf8ef4218fa12c988/6526608bf8ef4218fa12ca2c_Left.png",
      },
      stylePreview: true,
    },
    docs: {
      toc: true,
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
      canvas: {
        sourceState: "shown",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
