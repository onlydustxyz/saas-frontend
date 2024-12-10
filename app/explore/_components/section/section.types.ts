import { PropsWithChildren, ReactNode } from "react";

import { AnyType } from "@/core/kernel/types";

import { TypoPort } from "@/design-system/atoms/typo/typo.types";

export interface SectionProps extends PropsWithChildren {
  title: TypoPort<AnyType>;
  description: TypoPort<AnyType>;
  count?: number;
  action?: ReactNode;
  classNames?: {
    base?: string;
  };
}
