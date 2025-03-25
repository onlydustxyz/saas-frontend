import { Selection } from "@nextui-org/react";
import { ReactNode } from "react";

import { BadgePort } from "@/design-system/atoms/badge";
import { IconPort } from "@/design-system/atoms/icon";
import { TypoPort } from "@/design-system/atoms/typo";

type ClassNames = Partial<{
  base: string;
  heading: string;
  trigger: string;
  content: string;
  indicator: string;
  label: string;
  startIcon: string;
}>;

export interface AccordionItemProps {
  id: string;
  titleProps: Partial<TypoPort<"span">>;
  content: ReactNode;
  badgeProps?: BadgePort<"div">;
  startIcon?: IconPort;
  startContent?: ReactNode;
  endTitleContent?: ReactNode;
  endContent?: ReactNode;
}

interface AccordionBasePort {
  classNames?: ClassNames;
  defaultSelected?: string[];
  inline?: boolean;
  controlled?: {
    selectedKeys: string[];
    onSelectionChange: (keys: Selection) => void;
  };
}

export interface AccordionMultiplePort extends AccordionBasePort {
  items?: AccordionItemProps[];
  multiple?: boolean;
  children?: never;
  titleProps?: never;
  id?: never;
}

export interface AccordionSinglePort extends AccordionBasePort, Omit<AccordionItemProps, "content"> {
  items?: never[];
  multiple?: never;
  children: ReactNode;
}

export type AccordionPort = AccordionMultiplePort | AccordionSinglePort;
