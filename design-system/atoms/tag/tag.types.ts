import { ComponentPropsWithoutRef, ElementType, PropsWithChildren, ReactNode } from "react";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { IconPort } from "@/design-system/atoms/icon";
import { TypoPort } from "@/design-system/atoms/typo";

import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

type TagSize = "xxs" | "xs" | "sm" | "md";
interface Variants {
  size: TagSize;
}

interface ClassNames {
  base: string;
  content: string;
  label: string;
  closeButton: string;
  closeIcon: string;
}

interface TagBasePort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  translate?: TranslateProps;
  startContent?: ReactNode;
  endContent?: ReactNode;
  labelProps?: Partial<TypoPort<"span">>;
  startIcon?: IconPort;
  onClose?: () => void;
  onSelect?: () => void;
  isSelected?: boolean;
}

export interface TagAvatarPort<C extends ElementType> extends TagBasePort<C> {
  avatar: AvatarPort;
}

export type TagPort<C extends ElementType> = TagBasePort<C> | TagAvatarPort<C>;
