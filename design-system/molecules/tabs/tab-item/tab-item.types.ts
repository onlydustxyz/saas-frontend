import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";

interface Variants {}

type TabVariant = "underline" | "solid" | "flat" | "brand";
type TabsSize = "sm" | "md";

interface DataAttributes {
  "data-hover"?: boolean;
  "data-focus"?: boolean;
}

interface ClassNames {
  base: string;
  startIcon: string;
  endIcon: string;
  label: string;
  badge: string;
}

export interface TabItemPort<C extends ElementType> extends Partial<Variants>, PropsWithChildren {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  badge?: BadgePort<"div">;
  startIcon?: IconPort;
  endIcon?: IconPort;
  isSelected?: boolean;
  variant?: TabVariant;
  size?: TabsSize;
  attr?: DataAttributes;
  id: string;
  isLocked?: boolean;
  onClick?: (id: string) => void;
}
