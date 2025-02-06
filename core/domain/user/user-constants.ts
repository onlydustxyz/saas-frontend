import { GetUserResponse } from "@/core/domain/user/user-contract.types";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export const LOCAL_STORAGE_JOINING_REASON_KEY = "joiningReason";

export enum USER_PROFILE_JOINING_REASON {
  CONTRIBUTOR = "CONTRIBUTOR",
  MAINTAINER = "MAINTAINER",
  SPONSOR = "SPONSOR",
}

type rankCategory = NonNullable<GetUserResponse["statsSummary"]>["rankCategory"];

export const userRankCategoryMapping: Record<rankCategory, string> = {
  A: "Diamond contributor",
  B: "Gold contributor",
  C: "Silver contributor",
  D: "Bronze contributor",
  E: "Steel contributor",
  F: "Wood contributor",
};

export const userRankCategoryEmojiMapping: Record<rankCategory, string> = {
  A: "💎",
  B: "🥇",
  C: "🥈",
  D: "🥉",
  E: "🔨",
  F: "🪵",
};

type categories = components["schemas"]["NotificationSettingResponse"]["category"];

export const UserNotificationCategories: { [key in categories]: key } = {
  MAINTAINER_PROJECT_CONTRIBUTOR: "MAINTAINER_PROJECT_CONTRIBUTOR",
  MAINTAINER_PROJECT_PROGRAM: "MAINTAINER_PROJECT_PROGRAM",
  CONTRIBUTOR_REWARD: "CONTRIBUTOR_REWARD",
  CONTRIBUTOR_PROJECT: "CONTRIBUTOR_PROJECT",
  GLOBAL_BILLING_PROFILE: "GLOBAL_BILLING_PROFILE",
  GLOBAL_MARKETING: "GLOBAL_MARKETING",
  PROGRAM_LEAD: "PROGRAM_LEAD",
  SPONSOR_LEAD: "SPONSOR_LEAD",
  CONTRIBUTOR_REWIND: "CONTRIBUTOR_REWIND",
};

type channels = components["schemas"]["NotificationSettingResponse"]["channels"][0];

export const UserNotificationChannels: { [key in channels]: key } = {
  EMAIL: "EMAIL",
  SUMMARY_EMAIL: "SUMMARY_EMAIL",
  IN_APP: "IN_APP",
};
