import { ElementType } from "react";
import { tv } from "tailwind-variants";

import { ButtonDefaultAdapter } from "@/design-system/atoms/button/adapters/default/default.adapter";
import { ButtonDefaultVariants } from "@/design-system/atoms/button/adapters/default/default.variants";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { cn } from "@/shared/helpers/cn";

import { ButtonSolidPort } from "../button.types";

export const ButtonPrimaryColorVariants = tv({
  extend: ButtonDefaultVariants,
  slots: {
    base: "outline-none data-[focus-visible=true]:effect-ring-brand-spaced focus-visible:effect-ring-brand-spaced",
  },
  variants: {
    variant: {
      primary: {
        base: [
          "bg-components-buttons-button-primary-bg",
          "text-components-buttons-button-primary-fg",
          "effect-box-shadow-xs",
          "data-[hover=true]:bg-components-buttons-button-primary-bg-hover hover:bg-components-buttons-button-primary-bg-hover",
        ],
        spinnerCircle: "border-b-components-buttons-button-primary-fg",
      },
      secondary: {
        base: [
          "border-1 border-components-buttons-button-secondary-border",
          "bg-components-buttons-button-secondary-bg",
          "text-components-buttons-button-secondary-fg",
          "effect-box-shadow-xs",
          "data-[hover=true]:bg-components-buttons-button-secondary-bg-hover hover:bg-components-buttons-button-secondary-bg-hover",
        ],
        spinnerCircle: "border-b-components-buttons-button-secondary-fg",
      },
      tertiary: {
        base: [
          "bg-components-buttons-button-tertiary-bg",
          "text-components-buttons-button-tertiary-fg",
          "data-[hover=true]:bg-components-buttons-button-tertiary-bg-hover hover:bg-components-buttons-button-tertiary-bg-hover",
        ],
        spinnerCircle: "border-b-components-buttons-button-tertiary-fg",
      },
    },
    isDisabled: {
      true: {
        base: "bg-background-disabled text-typography-disabled",
        startIcon: "text-foreground-disabled",
        endIcon: "text-foreground-disabled",
        content: "text-foreground-disabled",
        label: "text-typography-disabled",
      },
    },
  },
});

export function ButtonPrimaryColor<C extends ElementType = "button">(props: ButtonSolidPort<C>) {
  const { isDisabled, iconOnly, size, canInteract, variant = "primary" } = props;
  const slotsDefault = ButtonPrimaryColorVariants({ isDisabled, iconOnly, size, canInteract, variant });

  return withComponentAdapter<ButtonSolidPort<C>>(ButtonDefaultAdapter)({
    ...props,
    variant,
    classNames: {
      ...(props.classNames || {}),
      base: cn(slotsDefault.base(), props.classNames?.base),
      spinnerCircle: cn(slotsDefault.spinnerCircle(), props.classNames?.spinnerCircle),
    },
  });
}
