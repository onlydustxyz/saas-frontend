import "@/public/fonts/Alfreda/stylesheet.css";
import "@/public/fonts/Belwe/stylesheet.css";
import "@/public/fonts/GTWalsheimPro/stylesheet.css";
import type { Preview } from "@storybook/react";
import "remixicon/fonts/remixicon.css";

import "@/app/globals.css";

import { TranslationProvider } from "../shared/translation/components/translation-provider/translation-provider";
import ThemeDark from "./theme";
import ThemeLight from "./theme-light";

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
      // Override the default dark theme
      dark: { ...ThemeDark },
      light: { ...ThemeLight },
      // Override the default light theme
      // light: { ...themes.normal, appBg: "red" },
      darkClass: "dark",
      lightClass: "light",
      classTarget: "html",
      stylePreview: true,
    },
    docs: {
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
