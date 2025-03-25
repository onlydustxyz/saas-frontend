import { ComponentPropsWithoutRef, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { FieldContainerPort } from "@/design-system/atoms/field-container";
import { IconPort } from "@/design-system/atoms/icon";

type htmlInputProps = Omit<ComponentPropsWithoutRef<"input">, "size" | "name">;

type InputSize = "sm" | "md" | "lg";
interface Variants {
  isDisabled: boolean;
  isError: boolean;
  isFocused: boolean;
  size: InputSize;
  isTransparent: boolean;
}

interface ClassNames {
  container: string;
  base: string;
  input: string;
  label: string;
}

interface DataAttributes {
  "data-hover"?: boolean;
}

export interface InputPort extends htmlInputProps, Partial<Variants>, FieldContainerPort {
  name: string;
  classNames?: Partial<ClassNames>;
  value?: string;
  isError?: boolean;
  startContent?: ReactNode;
  startIcon?: IconPort;
  avatar?: AvatarPort;
  button?: ButtonPort<"button">;
  endContent?: ReactNode;
  endIcon?: IconPort;
  isDisabled?: boolean;
  placeholder?: string;
  canInteract?: boolean;
  attr?: DataAttributes;
}
