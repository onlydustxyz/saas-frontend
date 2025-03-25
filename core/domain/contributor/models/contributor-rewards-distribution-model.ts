import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributorRewardsDistributionResponse = components["schemas"]["ContributorRewardsDistributionResponse"];

export interface ContributorRewardsDistributionInterface extends ContributorRewardsDistributionResponse {}

export class ContributorRewardsDistribution implements ContributorRewardsDistributionInterface {
  totalRewardedUsdAmount!: ContributorRewardsDistributionResponse["totalRewardedUsdAmount"];
  rewardedContributionCount!: ContributorRewardsDistributionResponse["rewardedContributionCount"];
  averageRewardedUsdAmount!: ContributorRewardsDistributionResponse["averageRewardedUsdAmount"];
  distribution!: ContributorRewardsDistributionResponse["distribution"];

  constructor(props: ContributorRewardsDistributionResponse) {
    Object.assign(this, props);
  }
}
