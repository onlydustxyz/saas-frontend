import { tv } from "tailwind-variants";

export const PaperDefaultVariants = tv({
  slots: {
    base: "w-full rounded-md text-left transition-all data-[clickable=true]:cursor-pointer data-[clickable=true]:outline-none data-[clickable=true]:focus-visible:effect-ring-brand-spaced",
  },
  variants: {
    px: {
      none: { base: "px-none" },
      xxs: { base: "px-xxs" },
      xs: { base: "px-xs" },
      sm: { base: "px-sm" },
      md: { base: "px-md" },
      "2md": { base: "px-2md" },
      lg: { base: "px-lg" },
      "2lg": { base: "px-2lg" },
      xl: { base: "px-xl" },
      "2xl": { base: "px-2xl" },
      "3xl": { base: "px-3xl" },
      "4xl": { base: "px-4xl" },
      "5xl": { base: "px-5xl" },
      "6xl": { base: "px-6xl" },
      "7xl": { base: "px-7xl" },
      "8xl": { base: "px-8xl" },
      "9xl": { base: "px-9xl" },
      "10xl": { base: "px-10xl" },
      "11xl": { base: "px-11xl" },
    },
    py: {
      none: { base: "py-none" },
      xxs: { base: "py-xxs" },
      xs: { base: "py-xs" },
      sm: { base: "py-sm" },
      md: { base: "py-md" },
      "2md": { base: "py-2md" },
      lg: { base: "py-lg" },
      "2lg": { base: "py-2lg" },
      xl: { base: "py-xl" },
      "2xl": { base: "py-2xl" },
      "3xl": { base: "py-3xl" },
      "4xl": { base: "py-4xl" },
      "5xl": { base: "py-5xl" },
      "6xl": { base: "py-6xl" },
      "7xl": { base: "py-7xl" },
      "8xl": { base: "py-8xl" },
      "9xl": { base: "py-9xl" },
      "10xl": { base: "py-10xl" },
      "11xl": { base: "py-11xl" },
    },
    background: {
      transparent: { base: "bg-transparent" },
      primary: { base: "bg-background-primary data-[clickable=true]:hover:bg-background-primary-hover" },
      "primary-alt": { base: "bg-background-primary-alt data-[clickable=true]:hover:bg-background-primary-alt-hover" },
      "primary-solid": { base: "bg-background-primary-solid" },
      secondary: { base: "bg-background-secondary data-[clickable=true]:hover:bg-background-secondary-hover" },
      "secondary-alt": { base: "bg-background-secondary-alt" },
      "secondary-alt-2": { base: "bg-background-secondary-alt-2" },
      tertiary: { base: "bg-background-tertiary data-[clickable=true]:hover:bg-background-tertiary-hover" },
      quaternary: { base: "bg-background-quaternary" },
      active: { base: "bg-background-active" },
      disabled: { base: "bg-background-disabled" },
      "disabled-alt": { base: "bg-background-disabled-alt" },
      overlay: { base: "bg-background-overlay" },
      error: { base: "bg-background-error" },
      "error-alt": { base: "bg-background-error-alt" },
      "error-solid": { base: "bg-background-error-solid data-[clickable=true]:hover:bg-background-error-solid-hover" },
      "brand-primary": { base: "bg-background-brand-primary" },
      "brand-primary-alt": { base: "bg-background-brand-primary-alt" },
      "brand-primary-solid": {
        base: "bg-background-brand-primary-solid data-[clickable=true]:hover:bg-background-brand-primary-solid-hover",
      },
      "brand-secondary": { base: "bg-background-brand-secondary" },
      warning: { base: "bg-background-warning" },
      "warning-alt": { base: "bg-background-warning-alt" },
      "warning-solid": {
        base: "bg-background-warning-solid data-[clickable=true]:hover:bg-background-warning-solid-hover",
      },
      success: { base: "bg-background-success" },
      "success-alt": { base: "bg-background-success-alt" },
      "success-solid": {
        base: "bg-background-success-solid data-[clickable=true]:hover:bg-background-success-solid-hover",
      },
      "primary-hover": { base: "bg-primary-hover" },
      "primary-alt-hover": { base: "bg-primary-alt-hover" },
      "secondary-hover": { base: "bg-secondary-hover" },
      "tertiary-hover": { base: "bg-tertiary-hover" },
      "error-solid-hover": { base: "bg-error-solid-hover" },
      "brand-primary-solid-hover": { base: "bg-brand-primary-solid-hover" },
      "warning-solid-hover": { base: "bg-warning-solid-hover" },
      "success-solid-hover": { base: "bg-success-solid-hover" },
    },
    border: {
      none: { base: "border-none" },
      primary: { base: "border border-border-primary" },
      "primary-hover": { base: "border border-border-primary-hover" },
      "primary-alt": { base: "border border-border-primary-alt" },
      secondary: { base: "border border-border-secondary" },
      tertiary: { base: "border border-border-tertiary" },
      disabled: { base: "border border-border-disabled" },
      "brand-primary": { base: "border border-border-brand-primary" },
      "brand-secondary": { base: "border border-border-brand-secondary" },
      "error-primary": { base: "border border-border-error-primary" },
      "error-secondary": { base: "border border-border-error-secondary" },
      "error-secondary-hover": { base: "border border-border-error-secondary-hover" },
      "warning-primary": { base: "border border-border-warning-primary" },
      "warning-secondary": { base: "border border-border-warning-secondary" },
      "success-primary": { base: "border border-border-success-primary" },
      active: { base: "border border-border-active" },
      "success-secondary": { base: "border border-border-success-secondary" },
    },
    hasBorderHover: {
      true: { base: "" },
    },
  },
  compoundVariants: [
    {
      hasBorderHover: true,
      border: "primary",
      class: {
        base: "data-[clickable=true]:hover:border-primary-hover",
      },
    },
    {
      hasBorderHover: true,
      border: "error-secondary",
      class: {
        base: "data-[clickable=true]:hover:error-secondary-hover",
      },
    },
  ],
  defaultVariants: {
    size: "m",
    background: "primary-alt",
    border: "none",
  },
});
