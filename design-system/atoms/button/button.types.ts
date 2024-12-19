import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { TooltipPort } from "../tooltip";

export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonSolidVariant = "primary" | "secondary" | "tertiary";
export type ButtonSolidTheme = "primary" | "destructive";
export type ButtonTextSize = "xs" | "md" | "lg";
export type ButtonTextVariant = "primary" | "secondary";

interface Variants {
  isDisabled: boolean;
  iconOnly: boolean;
  size: ButtonSize;
}

interface ClassNames {
  base: string;
  content: string;
  startIcon: string;
  endIcon: string;
  label: string;
  spinner: string;
  spinnerCircle: string;
}

export interface ButtonDefaultPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  htmlProps?: Omit<ComponentPropsWithoutRef<C>, "type">;
  classNames?: Partial<ClassNames>;
  translate?: TranslateProps;
  as?: C;
  startIcon?: IconPort;
  endIcon?: IconPort;
  startContent?: ReactNode;
  endContent?: ReactNode;
  onClick?: () => void;
  onNativeClick?: ComponentPropsWithoutRef<C>["onClick"];
  type?: HTMLButtonElement["type"];
  canInteract?: boolean;
  variant?: ButtonTextVariant | ButtonSolidVariant;
  isLoading?: boolean;
}

export interface ButtonBaseDefaultPort<C extends ElementType> extends ButtonDefaultPort<C> {
  theme?: ButtonSolidTheme;
}

export interface ButtonSolidPort<C extends ElementType> extends ButtonBaseDefaultPort<C> {
  variant?: ButtonSolidVariant;
  isTextButton?: never;
  underline?: never;
}

export interface ButtonTextPort<C extends ElementType>
  extends Omit<ButtonBaseDefaultPort<C>, "isTextButton" | "underline"> {
  isTextButton: true;
  underline?: boolean;
  variant?: ButtonTextVariant;
}

export type ButtonPort<C extends ElementType> = ButtonSolidPort<C> | ButtonTextPort<C>;

export interface ButtonGroupPort
  extends Pick<ButtonSolidPort<AnyType>, "theme" | "classNames" | "size" | "isDisabled" | "iconOnly"> {
  buttons: (Omit<ButtonSolidPort<AnyType>, "variant"> & { tooltip?: TooltipPort<"div"> })[];
  onClick?: (index: number) => void;
  fullWidth?: boolean;
  variant?: ButtonSolidVariant;
  layout?: "horizontal" | "vertical";
}
