import { ArrowDown, ArrowRight, Undo2 } from "lucide-react";
import { ReactNode } from "react";

import { IconPort } from "@/design-system/atoms/icon";

import { Translate } from "@/shared/translation/components/translate/translate";

import { CardTransactionTypes } from "./card-transaction.types";

export function getComponentsVariants(type: CardTransactionTypes): {
  iconProps: IconPort;
  typeName: ReactNode;
} {
  const map: Record<CardTransactionTypes, { iconProps: IconPort }> = {
    GRANTED: {
      iconProps: {
        component: ArrowRight,
        classNames: { base: "text-utility-secondary-blue-500" },
      },
    },
    RECEIVED: {
      iconProps: {
        component: ArrowDown,
        classNames: { base: "text-utility-secondary-green-500" },
      },
    },
    RETURNED: {
      iconProps: {
        component: Undo2,
        classNames: { base: "text-foreground-error" },
      },
    },
  };

  return {
    iconProps: map[type].iconProps,
    typeName: <Translate token={`cards:cardTransaction.types.${type}`} />,
  };
}
