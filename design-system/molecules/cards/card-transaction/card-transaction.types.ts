import { ComponentPropsWithoutRef, ElementType } from "react";

import { ButtonPort } from "@/design-system/atoms/button/button.types";

interface Variants {}

interface ClassNames {
  base: string;
}

export type CardTransactionTypes = "GRANTED" | "RECEIVED" | "RETURNED";

interface Currency {
  id: string;
  code: string;
  name: string;
  logoUrl?: string;
  decimals: number;
}

interface Amount {
  value: number;
  currency: Currency;
  usdEquivalent?: number;
}

export interface CardTransactionPort<C extends ElementType> extends Partial<Variants> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  type: CardTransactionTypes;
  date: string;
  amount: Amount;
  buttonProps?: ButtonPort<"button">;
}
