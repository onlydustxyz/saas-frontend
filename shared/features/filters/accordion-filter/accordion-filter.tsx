"use client";

import { Circle, CircleCheck } from "lucide-react";
import { useMemo } from "react";

import { IconPort } from "@/design-system/atoms/icon";
import { Accordion, AccordionSinglePort } from "@/design-system/molecules/accordion";

import { cn } from "@/shared/helpers/cn";

import { AccordionFilterProps } from "./accordion-filter.types";

export function AccordionFilter({ selected, children, title, name, classNames }: AccordionFilterProps) {
  const icon: IconPort = useMemo(() => {
    if (selected) {
      return {
        component: CircleCheck,
      };
    }

    return {
      component: Circle,
    };
  }, [selected]);

  const badge: AccordionSinglePort["badgeProps"] = useMemo(() => {
    if (selected) {
      return {
        children: selected.toString(),
        color: selected ? "brand" : undefined,
        shape: "rounded",
        classNames: { base: "min-w-6 min-h-6" },
      };
    }

    return undefined;
  }, [selected]);

  return (
    <Accordion
      startIcon={icon}
      badgeProps={badge}
      titleProps={title}
      id={name}
      classNames={{
        label: cn("transition-none", {
          "text-typography-brand-secondary-alt": selected,
        }),
      }}
    >
      <div className={cn("p-lg", classNames?.container)}>{children}</div>
    </Accordion>
  );
}
