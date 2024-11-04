import { tv } from "tailwind-variants";

export const BadgeDefaultVariants = tv({
  slots: {
    base: "group block overflow-hidden border-1 outline-none transition-all focus-visible:effect-ring-brand-spaced",
    content: "flex flex-row items-center justify-center",
    label: "truncate text-inherit",
    deletableIcon: "text-inherit",
  },
  variants: {
    size: {
      xxs: {
        base: "px-sm py-xxs",
        content: "gap-1",
      },
      xs: {
        base: "px-md py-xs",
        content: "gap-1",
      },
      sm: {
        base: "px-md py-sm",
        content: "gap-1",
      },
      md: {
        base: "px-lg py-md",
        content: "gap-2",
      },
      lg: {
        base: "px-lg py-2md",
        content: "gap-md",
      },
      xl: {
        base: "px-xl py-lg",
        content: "gap-2md",
      },
    },
    isDeletable: {
      true: {},
    },
    iconOnly: {
      true: {},
    },
    color: {
      grey: {
        base: "",
      },
      brand: {
        base: "",
      },
      error: {
        base: "",
      },
      warning: {
        base: "",
      },
      success: {
        base: "",
      },
      inverse: {
        base: "",
      },
    },
    variant: {
      flat: {
        base: "",
      },
      outline: {
        base: "",
      },
      solid: {
        base: "",
      },
    },
    shape: {
      rounded: {
        base: "rounded-full",
      },
      squared: {
        base: "rounded-sm",
      },
    },
  },
  compoundVariants: [
    {
      size: "xxs",
      isDeletable: true,
      class: {
        base: "py-0.5 pl-1.5 pr-0.5",
      },
    },
    {
      size: "xs",
      isDeletable: true,
      class: {
        base: "py-1.5 pl-2 pr-1",
      },
    },
    {
      size: "sm",
      isDeletable: true,
      class: {
        base: "py-2 pl-2 pr-1.5",
      },
    },
    {
      size: "md",
      isDeletable: true,
      class: {
        base: "px-2 py-3",
      },
    },

    {
      size: "xxs",
      iconOnly: true,
      class: {
        base: "px-xxs py-xxs",
      },
    },
    {
      size: "xs",
      iconOnly: true,
      class: {
        base: "px-xs py-xs",
      },
    },
    {
      size: "sm",
      iconOnly: true,
      class: {
        base: "px-sm py-sm",
      },
    },
    {
      size: "md",
      iconOnly: true,
      class: {
        base: "px-md py-md",
      },
    },
    // FLAT
    {
      variant: "flat",
      color: "grey",
      class: {
        base: "bg-components-badge-grey-backgroundoutline-bg border-components-badge-grey-backgroundoutline-border",
        content: "text-components-badge-grey-backgroundoutline-typo",
      },
    },
    {
      variant: "flat",
      color: "warning",
      class: {
        base: "bg-components-badge-warning-backgroundoutline-bg border-components-badge-warning-backgroundoutline-border",
        content: "text-components-badge-warning-backgroundoutline-typo",
      },
    },
    {
      variant: "flat",
      color: "brand",
      class: {
        base: "bg-components-badge-brand-backgroundoutline-bg border-components-badge-brand-backgroundoutline-border",
        content: "text-components-badge-brand-backgroundoutline-typo",
      },
    },
    {
      variant: "flat",
      color: "success",
      class: {
        base: "bg-components-badge-success-backgroundoutline-bg border-components-badge-success-backgroundoutline-border",
        content: "text-components-badge-success-backgroundoutline-typo",
      },
    },
    {
      variant: "flat",
      color: "error",
      class: {
        base: "bg-components-badge-error-backgroundoutline-bg border-components-badge-error-backgroundoutline-border",
        content: "text-components-badge-error-backgroundoutline-typo",
      },
    },

    // OUTLINE
    {
      variant: "outline",
      color: "grey",
      class: {
        base: "bg-components-badge-grey-outline-bg border-components-badge-grey-outline-border",
        content: "text-components-badge-grey-outline-typo",
      },
    },
    {
      variant: "outline",
      color: "warning",
      class: {
        base: "bg-components-badge-warning-outline-bg border-components-badge-warning-outline-border",
        content: "text-components-badge-warning-outline-typo",
      },
    },
    {
      variant: "outline",
      color: "brand",
      class: {
        base: "bg-components-badge-brand-outline-bg border-components-badge-brand-outline-border",
        content: "text-components-badge-brand-outline-typo",
      },
    },
    {
      variant: "outline",
      color: "success",
      class: {
        base: "bg-components-badge-success-outline-bg border-components-badge-success-outline-border",
        content: "text-components-badge-success-outline-typo",
      },
    },
    {
      variant: "outline",
      color: "error",
      class: {
        base: "bg-components-badge-error-outline-bg border-components-badge-error-outline-border",
        content: "text-components-badge-error-outline-typo",
      },
    },
    // OUTLINE
    {
      variant: "solid",
      color: "grey",
      class: {
        base: "bg-components-badge-grey-solid-bg border-0",
        content: "text-components-badge-grey-solid-typo",
      },
    },
    {
      variant: "solid",
      color: "warning",
      class: {
        base: "bg-components-badge-warning-solid-bg border-0",
        content: "text-components-badge-warning-solid-typo",
      },
    },
    {
      variant: "solid",
      color: "brand",
      class: {
        base: "bg-components-badge-brand-solid-bg border-0",
        content: "text-components-badge-brand-solid-typo",
      },
    },
    {
      variant: "solid",
      color: "success",
      class: {
        base: "bg-components-badge-success-solid-bg border-0",
        content: "text-components-badge-success-solid-typo",
      },
    },
    {
      variant: "solid",
      color: "error",
      class: {
        base: "bg-components-badge-error-solid-bg border-0",
        content: "text-components-badge-error-solid-typo",
      },
    },
    {
      variant: "solid",
      color: "inverse",
      class: {
        base: "bg-components-badge-invert-solid-bg border-0",
        content: "text-components-badge-invert-solid-typo",
      },
    },
  ],
  defaultVariants: {
    size: "sm",
    shape: "rounded",
    color: "grey",
    variant: "flat",
    isDeletable: false,
    iconOnly: false,
  },
});
