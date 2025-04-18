import { tv } from "tailwind-variants";

export const InputDefaultVariants = tv({
  slots: {
    container: "flex w-full flex-col gap-sm",
    wrapper: "flex w-full items-center justify-start",
    base: [
      "transition-all",
      "flex w-full items-center justify-start gap-md rounded-md border-1 border-[var(--shadcn-input)] bg-background-primary effect-box-shadow-xs",
      "data-[hover=true]:border-border-primary-hover hover:border-border-primary-hover",
    ],
    contentWrapper: "flex flex-col items-center justify-center text-foreground-tertiary",
    inputWrapper: "h-full flex-1",
    input:
      "h-full w-full bg-transparent text-typography-secondary outline-none placeholder:text-typography-placeholder",
  },

  variants: {
    size: {
      sm: {
        base: "h-[2rem] px-lg",
        input: "text-[0.875rem] leading-[1.25rem]",
      },
      md: {
        base: "h-[2.5rem] px-xl",
        input: "text-[0.875rem] leading-[1.25rem]",
      },
      lg: {
        base: "h-[3rem] px-2xl",
        input: "text-[1rem] leading-[1.5rem]",
      },
    },

    asOuterElement: {
      true: {
        base: "rounded-r-none",
      },
    },

    isFocused: {
      true: {
        base: [
          "border-border-active effect-ring-brand-glued",
          "data-[hover=true]:border-border-active hover:border-border-active",
        ],
      },
    },

    isError: {
      true: {
        base: "border-border-error-secondary data-[hover=true]:border-border-error-secondary-hover hover:border-border-error-secondary-hover",
      },
    },

    isDisabled: {
      true: {
        base: "pointer-events-none border-border-disabled bg-background-disabled-alt",
        contentWrapper: "text-foreground-disabled",
        input: "text-typography-disabled placeholder:text-typography-disabled",
      },
    },
    isTransparent: {
      true: {
        base: "!border-none !bg-transparent !shadow-none !outline-none",
      },
    },
  },

  compoundVariants: [
    {
      isFocused: true,
      isError: true,
      class: {
        base: [
          "border-border-error-primary effect-ring-error-glued",
          "data-[hover=true]:border-border-error-primary hover:border-border-error-primary",
        ],
      },
    },
  ],

  defaultVariants: {
    size: "sm",
    isFocused: false,
    isTransparent: false,
  },
});
