import { ComponentPropsWithoutRef, ElementType } from "react";

import { TypoPort } from "@/design-system/atoms/typo";

interface Variants {
  isDisabled?: boolean;
}

interface ClassNames {
  base: string;
  item: string;
  indicator: string;
  indicatorIcon: string;
}

interface DataAttributes {
  "data-hover"?: boolean;
  "data-focus"?: boolean;
}

export interface RadioPort<V extends string | null, C extends ElementType> extends Partial<Variants> {
  as?: C;
  classNames?: Partial<ClassNames>;
  componentProps?: ComponentPropsWithoutRef<C>;
  value: V;
  attr?: DataAttributes;
  title?: TypoPort<"span">;
  description?: TypoPort<"span">;
}

export interface RadioGroupPort<V extends string, C extends ElementType> extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  componentProps?: ComponentPropsWithoutRef<C>;
  value: V;
  as?: C;
  onChange?: (value: V) => void;
  items: RadioPort<V, C>[];
  layout?: "horizontal" | "vertical";
}
