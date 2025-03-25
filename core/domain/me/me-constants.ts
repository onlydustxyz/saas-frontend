import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type categories = components["schemas"]["NotificationSettingResponse"]["category"];

export const MeNotificationSettingsCategory: { [key in categories]: key } = {
  MAINTAINER_PROJECT_CONTRIBUTOR: "MAINTAINER_PROJECT_CONTRIBUTOR",
  MAINTAINER_PROJECT_PROGRAM: "MAINTAINER_PROJECT_PROGRAM",
  CONTRIBUTOR_REWARD: "CONTRIBUTOR_REWARD",
  CONTRIBUTOR_PROJECT: "CONTRIBUTOR_PROJECT",
  GLOBAL_BILLING_PROFILE: "GLOBAL_BILLING_PROFILE",
  GLOBAL_MARKETING: "GLOBAL_MARKETING",
  PROGRAM_LEAD: "PROGRAM_LEAD",
  SPONSOR_LEAD: "SPONSOR_LEAD",
  CONTRIBUTOR_REWIND: "CONTRIBUTOR_REWIND",
} as const;

type channels = components["schemas"]["NotificationSettingResponse"]["channels"][0];

export const MeNotificationSettingsChannel: { [key in channels]: key } = {
  EMAIL: "EMAIL",
  SUMMARY_EMAIL: "SUMMARY_EMAIL",
  IN_APP: "IN_APP",
} as const;
