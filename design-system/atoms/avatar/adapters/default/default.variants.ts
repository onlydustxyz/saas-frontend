import { tv } from "tailwind-variants";

export const AvatarDefaultVariants = tv({
  slots: {
    base: "bg-components-avatar-bg relative flex items-center justify-center border",
    image: "h-full w-full object-cover object-center",
    name: "text-components-avatar-typo font-medium",
    icon: "outline-background-primary-alt absolute bottom-0 right-0 rounded-full outline",
  },
  variants: {
    size: {
      "3xl": {
        base: "h-24 w-24",
        icon: "h-8 w-8 outline-4",
      },
      "2xl": {
        base: "h-16 w-16",
        icon: "h-6 w-6 outline-[3px]",
      },
      xl: {
        base: "h-12 w-12",
        icon: "h-5 w-5 outline-2",
      },
      lg: {
        base: "h-10 w-10",
        icon: "h-4 w-4 outline-2",
      },
      md: {
        base: "h-8 w-8",
        icon: "h-3.5 w-3.5 outline-2",
      },
      s: {
        base: "h-6 w-6",
        icon: "h-3 w-3 outline-1",
      },
      xs: {
        base: "h-5 w-5",
        icon: "h-3 w-3 outline-1",
      },
      xxs: {
        base: "h-4 w-4",
        icon: "h-2.5 w-2.5 outline-1",
      },
    },
    shape: {
      rounded: {
        base: "rounded-full",
        image: "rounded-full",
      },
      squared: "",
    },
    name: {
      true: {
        base: "border-components-avatar-border",
      },
      false: {
        base: "border-components-avatar-contrast-border",
      },
    },
    onlineIcon: {
      true: {
        base: "bg-foreground-success",
      },
      false: {
        base: "bg-components-avatar-bg border-components-avatar-contrast-border",
      },
    },
  },
  compoundVariants: [
    {
      size: "3xl",
      onlineIcon: true,
      class: {
        icon: "h-5 w-5",
      },
    },
    {
      size: "2xl",
      onlineIcon: true,
      class: {
        icon: "h-4 w-4",
      },
    },
    {
      size: "xl",
      onlineIcon: true,
      class: {
        icon: "h-3 w-3",
      },
    },
    {
      size: "lg",
      onlineIcon: true,
      class: {
        icon: "h-2.5 w-2.5",
      },
    },
    {
      size: "md",
      onlineIcon: true,
      class: {
        icon: "h-2 w-2",
      },
    },
    {
      size: "s",
      onlineIcon: true,
      class: {
        icon: "h-1.5 w-1.5",
      },
    },
    {
      size: "xs",
      onlineIcon: true,
      class: {
        icon: "h-[5px] w-[5px]",
      },
    },
    {
      size: "xxs",
      onlineIcon: true,
      class: {
        icon: "h-1.5 w-1.5",
      },
    },
    {
      size: "3xl",
      shape: "squared",
      class: {
        base: "rounded-2xl",
        image: "rounded-2xl",
      },
    },
    {
      size: "2xl",
      shape: "squared",
      class: {
        base: "rounded-xl",
        image: "rounded-xl",
      },
    },
    {
      size: "xl",
      shape: "squared",
      class: {
        base: "rounded-xl",
        image: "rounded-xl",
      },
    },
    {
      size: "lg",
      shape: "squared",
      class: {
        base: "rounded-lg",
        image: "rounded-lg",
      },
    },
    {
      size: "md",
      shape: "squared",
      class: {
        base: "rounded-lg",
        image: "rounded-lg",
      },
    },
    {
      size: "s",
      shape: "squared",
      class: {
        base: "rounded-md",
        image: "rounded-md",
      },
    },
    {
      size: "xs",
      shape: "squared",
      class: {
        base: "rounded-md",
        image: "rounded-md",
      },
    },
    {
      size: "xxs",
      shape: "squared",
      class: {
        base: "rounded",
        image: "rounded",
      },
    },
    {
      size: "3xl",
      name: true,
      class: {
        name: "text-xl",
      },
    },
    {
      size: "2xl",
      name: true,
      class: {
        name: "text-lg",
      },
    },
    {
      size: "xl",
      name: true,
      class: {
        name: "text-lg",
      },
    },
    {
      size: "lg",
      name: true,
      class: {
        name: "text-md",
      },
    },
    {
      size: "md",
      name: true,
      class: {
        name: "text-sm",
      },
    },
    {
      size: "s",
      name: true,
      class: {
        name: "text-xs",
      },
    },
    {
      size: "xs",
      name: true,
      class: {
        name: "text-xs",
      },
    },
    {
      size: "xxs",
      name: true,
      class: {
        name: "text-xs",
      },
    },
  ],
  defaultVariants: {
    size: "md",
    shape: "rounded",
  },
});
