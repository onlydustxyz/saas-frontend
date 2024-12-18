import { ComponentPropsWithoutRef, ElementType } from "react";

import { AnyType } from "@/core/kernel/types";

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
  slug: string;
  contributorCount: number;
  starCount: number;
  forkCount: number;
  availableIssueCount: number;
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
    logoUrl: string;
    color?: string;
    transparentLogoUrl?: string;
  }[];
  ecosystems?: {
    id: string;
    name: string;
    logoUrl: string;
  }[];
  onClick?: () => void;
}

export interface MetricProps {
  icon: NonNullable<IconPort["component"]>;
  count: number;
}

export interface AvatarWithEcosystemsProps {
  name: string;
  logoUrl?: string;
  ecosystems?: CardProjectMarketplacePort<AnyType>["ecosystems"];
}

export interface CategoriesProps {
  categories: CardProjectMarketplacePort<AnyType>["categories"];
}

export interface LanguagesProps {
  languages: CardProjectMarketplacePort<AnyType>["languages"];
}
