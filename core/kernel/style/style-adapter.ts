import { StyleFacadePort } from "./style-facade-port";

export const StyleAdapter: StyleFacadePort = {
  pxToRem: (px: number) => {
    const bodyFontSize = parseFloat(
      typeof window !== "undefined" ? window?.getComputedStyle(document.body)?.fontSize : "16"
    );

    const remValue = Math.round((px / bodyFontSize) * 100) / 100;

    return `${remValue}rem`;
  },
};
