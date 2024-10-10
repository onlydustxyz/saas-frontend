import { BadgeBasePort } from "@/design-system/atoms/badge";
import { TypoPort } from "@/design-system/atoms/typo";

import { ContributionInlinePort } from "../contribution-inline";

interface Variants {}

interface ClassNames {
  base: string;
}

export interface TimelineContributionPort extends Partial<Variants> {
  classNames?: Partial<ClassNames>;
  titleProps: TypoPort<"p">;
  badgeProps?: BadgeBasePort<"span">;
  contributions: ContributionInlinePort<"span">[];
}
