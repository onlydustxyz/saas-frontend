import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type PublicProfilerankCategoryUnion = components["schemas"]["UserProfileStatsSummary"]["rankCategory"];

export type ActivityGraphLevel = 1 | 2 | 3 | 4;

export interface PublicProfileImageMetadataProps {
  title: string;
  login: string;
  image: string;
  contributionCount: number;
  rewardsCount: number;
  rank: number;
  rankPercentile: number;
  topLanguages?: {
    name: string;
    image: string;
  };
  topEcosystem?: {
    name: string;
    image: string;
  };
  data: {
    [key: string]: {
      level: ActivityGraphLevel;
      reward?: boolean;
    };
  };
}

export const rankCategoryTranslationMapping: Record<PublicProfilerankCategoryUnion, string> = {
  A: "💎 Diamond contributor",
  B: "🥇 Gold contributor",
  C: "🥈 Silver contributor",
  D: "🥉 Bronze contributor",
  E: "🔨 Steel contributor",
  F: "🪵 Wood contributor",
};

export const ACTIVITY_WEEK_NUMBER = 54;
export const ACTIVITY_NUMBER_OF_ROW = 8;

export interface ActivityGraphWeek {
  id: string;
  startDate: Date;
  endDate: Date;
}
