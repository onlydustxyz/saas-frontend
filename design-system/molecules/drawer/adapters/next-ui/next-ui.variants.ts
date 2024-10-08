import { tv } from "tailwind-variants";

export const DrawerNextUiVariants = tv({
  slots: {
    base: "border-b-none !m-0 h-[calc(100%_-_24px)] max-w-full rounded-xl rounded-b-none border border-border-primary bg-background-primary sm:!m-3 sm:rounded-b-xl sm:border-b-1",
    wrapper: "justify-end",
    body: "gap-0 overflow-hidden p-3 pt-0",
    backdrop: "bg-background-overlay",
    footer: "flex items-center justify-between border-t-1 border-border-primary bg-background-primary p-3",
    header: "flex items-center justify-between p-3",
  },
  variants: {
    size: {
      m: {
        base: "w-[640px]",
      },
    },
  },
  defaultVariants: {
    size: "m",
  },
});
