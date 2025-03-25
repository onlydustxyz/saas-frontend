import { ContributionTypeUnion } from "@/core/domain/contribution/models/contribution.types";

export enum QuantityFilterType {
  EQUAL = "EQUAL",
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
}

export enum RewardedFilterType {
  REWARDED = "REWARDED",
  UNREWARDED = "UNREWARDED",
}

export const ContributionFilterType: { [key in ContributionTypeUnion]: key } = {
  ISSUE: "ISSUE",
  PULL_REQUEST: "PULL_REQUEST",
  CODE_REVIEW: "CODE_REVIEW",
} as const;
