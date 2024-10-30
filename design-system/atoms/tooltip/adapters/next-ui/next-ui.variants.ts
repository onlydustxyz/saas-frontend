import { tv } from "tailwind-variants";

export const TooltipNextUiVariants = tv({
  slots: {
    wrapper: "",
    tooltip: "rounded-md bg-background-primary-solid p-2 px-lg py-md shadow-none effect-box-shadow-lg",
  },
  variants: {
    background: {
      "primary-solid": {
        tooltip: "bg-background-primary-solid",
      },
      primary: {
        tooltip: "bg-background-primary",
      },
    },
  },
  defaultVariants: {
    background: "primary-solid",
  },
});
