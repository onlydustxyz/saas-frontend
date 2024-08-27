import { tv } from "tailwind-variants";

export const DateRangePickerNextUiVariants = tv({
  slots: {
    base: "h-fit flex-col items-start gap-2",
    popoverContent: "rounded-lg bg-background-primary effect-shadow-lg",
    inputWrapper:
      "effect-box-shadow-xs rounded-lg border border-border-primary px-3 py-2 text-[1rem] leading-[1.5rem] text-typography-secondary transition-colors focus-within:border-border-active focus-within:effect-ring-brand-glued group-data-[invalid=true]:border-border-error-secondary group-data-[invalid=true]:focus-within:border-border-error-primary group-data-[invalid=true]:focus-within:effect-ring-error-glued hover:border-border-primary-hover focus-within:hover:border-border-active group-data-[invalid=true]:hover:border-border-error-secondary-hover",
    innerWrapper: "h-4 !text-typography-secondary",
    input: "flex items-center text-[0.875rem] leading-[1.25rem] text-typography-secondary",
    label: "text-[0.875rem] font-medium leading-[1.25rem] !text-typography-secondary",
    segment:
      "focus:effect-box-shadow-xs my-0 text-typography-placeholder data-[editable=true]:data-[placeholder=true]:text-typography-placeholder data-[editable=true]:text-typography-secondary data-[invalid=true]:data-[editable=true]:text-typography-secondary data-[invalid=true]:text-typography-secondary focus:!bg-components-buttons-button-tertiary-bg-hover data-[editable=true]:focus:text-typography-secondary data-[invalid=true]:data-[editable=true]:focus:text-typography-secondary",
    separator: "text-typography-placeholder",
    selectorButton:
      "h-6 w-6 min-w-6 rounded-md bg-components-buttons-button-tertiary-bg text-components-buttons-button-tertiary-fg !outline-none data-[hover=true]:bg-components-buttons-button-tertiary-bg-hover data-[disabled=true]:text-foreground-disabled data-[focus-visible=true]:effect-ring-brand-spaced",
    errorMessage: "text-[0.875rem] leading-[1.25rem] text-typography-error",
  },
  variants: {
    isDisabled: {
      true: {
        base: "!opacity-100",
        inputWrapper: "border-border-disabled bg-background-disabled-alt",
        segment: "!text-typography-disabled",
        separator: "text-typography-disabled",
        selectorButton: "!opacity-100",
      },
    },
    isError: {
      true: {
        inputWrapper:
          "border-border-error-secondary focus-within:border-border-error-primary focus-within:effect-ring-error-glued hover:border-border-error-secondary-hover",
        segment: "!text-typography-secondary",
      },
    },
  },
  defaultVariants: {},
});
