import { UserPublic, UserPublicInterface } from "@/core/domain/user/models/user-public-model";
import { UserRank, UserRankInterface } from "@/core/domain/user/models/user-rank-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BiContributorListItemResponse = components["schemas"]["BiContributorsPageItemResponse"];

export interface BiContributorListItemInterface extends BiContributorListItemResponse {
  rank: UserRankInterface;
  toContributorPublicModel(): UserPublicInterface;
}

export class BiContributorListItem implements BiContributorListItemInterface {
  categories!: BiContributorListItemResponse["categories"];
  codeReviewCount!: BiContributorListItemResponse["codeReviewCount"];
  contributionCount!: BiContributorListItemResponse["contributionCount"];
  contributor!: BiContributorListItemResponse["contributor"];
  country!: BiContributorListItemResponse["country"];
  ecosystems!: BiContributorListItemResponse["ecosystems"];
  issueCount!: BiContributorListItemResponse["issueCount"];
  languages!: BiContributorListItemResponse["languages"];
  prCount!: BiContributorListItemResponse["prCount"];
  projects!: BiContributorListItemResponse["projects"];
  rewardCount!: BiContributorListItemResponse["rewardCount"];
  totalRewardedUsdAmount!: BiContributorListItemResponse["totalRewardedUsdAmount"];
  inProgressIssueCount!: BiContributorListItemResponse["inProgressIssueCount"];
  maintainedProjectCount!: BiContributorListItemResponse["maintainedProjectCount"];
  pendingApplicationCount!: BiContributorListItemResponse["pendingApplicationCount"];
  projectContributorLabels!: BiContributorListItemResponse["projectContributorLabels"];
  rank: UserRankInterface;
  engagementStatus!: BiContributorListItemResponse["engagementStatus"];

  constructor(props: BiContributorListItemResponse) {
    Object.assign(this, props);

    this.rank = new UserRank({
      rankCategory: this.contributor.globalRankCategory,
      rank: this.contributor.globalRank,
      rankPercentile: this.contributor.globalRankPercentile,
    });
  }

  toContributorPublicModel(): UserPublicInterface {
    return new UserPublic({
      ...this.contributor,
      statsSummary: {
        rank: this.contributor?.globalRank,
        rankPercentile: this?.contributor?.globalRankPercentile,
        rankCategory: this?.contributor?.globalRankCategory,
        contributedProjectCount: 0,
        leadedProjectCount: 0,
        contributionCount: this.contributionCount.value,
        rewardCount: this.rewardCount.value,
      },
    });
  }
}
