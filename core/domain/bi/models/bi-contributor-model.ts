import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type BiContributorResponse = components["schemas"]["BiContributorsPageItemResponse"];

export interface BiContributorInterface extends BiContributorResponse {}

export class BiContributor implements BiContributorInterface {
  categories!: BiContributorResponse["categories"];
  contributionCount!: BiContributorResponse["contributionCount"];
  contributor!: BiContributorResponse["contributor"];
  countryCode!: BiContributorResponse["countryCode"];
  ecosystems!: BiContributorResponse["ecosystems"];
  languages!: BiContributorResponse["languages"];
  mergedPrCount!: BiContributorResponse["mergedPrCount"];
  projects!: BiContributorResponse["projects"];
  rewardCount!: BiContributorResponse["rewardCount"];
  totalRewardedUsdAmount!: BiContributorResponse["totalRewardedUsdAmount"];

  constructor(props: BiContributorResponse) {
    Object.assign(this, props);
  }
}