import { LucideIcon } from "lucide-react";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";

interface ClassNames {
  base: string;
}

export type IconSize = "xxs" | "xs" | "sm" | "md" | "lg" | "banner";

type IconColor = "green" | "red" | "purple" | "blue" | "quaternary" | "yellow" | "pink";

interface BaseIconPort {
  classNames?: Partial<ClassNames>;
  size?: IconSize;
}

export interface LucideIconPort extends BaseIconPort {
  component: LucideIcon;
  color?: IconColor;
}

export interface RemixIconPort extends BaseIconPort {
  name: RemixIconsName;
  color?: IconColor;
  component?: never;
}

export type IconPort = LucideIconPort | RemixIconPort;
