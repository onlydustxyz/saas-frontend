import { GetUserResponse } from "@/core/domain/user/user-contract.types";

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
