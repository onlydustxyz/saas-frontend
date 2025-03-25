import { ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { AvatarPort } from "@/design-system/atoms/avatar";
import { IconPort } from "@/design-system/atoms/icon";

interface Variants {}

interface ClassNames {
  base: string;
  inner: string;
}

interface DataAttributes {
  "data-hover"?: boolean;
}

export type MenuItemId<T = string> = T;

interface MenuItemBasePort<T extends AnyType> extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  id: MenuItemId<T>;
  label: ReactNode;
  searchValue?: string;
  isDisabled?: boolean;
  startContent?: ReactNode;
  showIndicatorOnSelected?: boolean;
  attr?: DataAttributes;
  isSelected?: boolean;
  onClick?: (id: MenuItemId<T>) => void;
}

export interface MenuItemAvatarPort<T = string> extends MenuItemBasePort<T> {
  avatar: AvatarPort;
}

export interface MenuItemIconPort<T = string> extends MenuItemBasePort<T> {
  icon: IconPort;
}

export interface MenuItemCheckboxPort<T = string> extends MenuItemBasePort<T> {
  isCheckbox?: boolean;
  mixed?: boolean;
}

export interface MenuItemRadioPort<T = string> extends MenuItemBasePort<T> {
  isRadio?: boolean;
}

export interface MenuItemLabelPort<T = string> extends MenuItemBasePort<T> {
  isLabel?: boolean;
}

export interface MenuItemSeparatorPort<T = string> extends Omit<MenuItemBasePort<T>, "label"> {
  isSeparator?: boolean;
  label?: never;
}

export type MenuItemPort<T = string> =
  | MenuItemBasePort<T>
  | MenuItemAvatarPort<T>
  | MenuItemIconPort<T>
  | MenuItemCheckboxPort<T>
  | MenuItemRadioPort<T>
  | MenuItemLabelPort<T>
  | MenuItemSeparatorPort<T>;
