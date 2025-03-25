import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { UserRank, UserRankInterface } from "../../user/models/user-rank-model";

type EcosystemContributorsResponse = components["schemas"]["ContributorPageItemResponseV2"];

export interface EcosystemContributorsInterface extends EcosystemContributorsResponse {
  rank: UserRankInterface;
}

export class EcosystemContributorsListItem implements EcosystemContributorsInterface {
  githubUserId!: EcosystemContributorsResponse["githubUserId"];
  login!: EcosystemContributorsResponse["login"];
  avatarUrl!: EcosystemContributorsResponse["avatarUrl"];
  isRegistered!: EcosystemContributorsResponse["isRegistered"];
  id!: EcosystemContributorsResponse["id"];
  mergedPullRequests!: EcosystemContributorsResponse["mergedPullRequests"];
  rewards!: EcosystemContributorsResponse["rewards"];
  totalEarnedUsdAmount!: EcosystemContributorsResponse["totalEarnedUsdAmount"];
  rank!: UserRankInterface;
  globalRank!: EcosystemContributorsResponse["globalRank"];
  globalRankPercentile!: EcosystemContributorsResponse["globalRankPercentile"];
  globalRankCategory!: EcosystemContributorsResponse["globalRankCategory"];

  constructor(props: EcosystemContributorsResponse) {
    Object.assign(this, props);

    this.rank = new UserRank({
      rankCategory: this.globalRankCategory,
      rank: this.globalRank,
      rankPercentile: this.globalRankPercentile,
    });
  }
}
