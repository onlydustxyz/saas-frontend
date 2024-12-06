import { ComponentPropsWithoutRef, ElementType } from "react";

import { IconPort } from "@/design-system/atoms/icon";

interface ClassNames {
  base: string;
}

export interface CardProjectMarketplacePort<C extends ElementType> {
  as?: C;
  htmlProps?: ComponentPropsWithoutRef<C>;
  classNames?: Partial<ClassNames>;
  logoUrl?: string;
  name: string;
  contributorCount: number;
  starCount: number;
  pullRequestCount: number;
  issueCount: number;
  goodFirstIssueCount: number;
  description?: string;
  categories?: {
    id: string;
    name: string;
  }[];
  languages?: {
    id: string;
    name: string;
    percentage: number;
  }[];
  onClick?: () => void;
}

export interface MetricProps {
  icon: NonNullable<IconPort["component"]>;
  count: number;
}

export interface LanguageProps {
  id: string;
  name: string;
  percentage: number;
  nameClassNames?: string;
}
