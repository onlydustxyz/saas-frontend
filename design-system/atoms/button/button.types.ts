import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

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
  loaderContainer: string;
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
  type?: HTMLButtonElement["type"];
  canInteract?: boolean;
  variant?: ButtonTextVariant | ButtonSolidVariant;
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
  extends Pick<ButtonSolidPort<"button">, "theme" | "classNames" | "size" | "isDisabled" | "iconOnly"> {
  buttons: Omit<ButtonSolidPort<"button">[], "variant">;
  onClick?: (index: number) => void;
}
