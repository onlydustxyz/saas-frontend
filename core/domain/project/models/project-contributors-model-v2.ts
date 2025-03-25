import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { UserRank, UserRankInterface } from "../../user/models/user-rank-model";

type ProjectContributorsResponseV2 = components["schemas"]["ContributorPageItemResponseV2"];

export interface ProjectContributorsInterfaceV2 extends ProjectContributorsResponseV2 {
  rank: UserRankInterface;
}

export class ProjectContributorsV2 implements ProjectContributorsInterfaceV2 {
  githubUserId!: ProjectContributorsResponseV2["githubUserId"];
  login!: ProjectContributorsResponseV2["login"];
  avatarUrl!: ProjectContributorsResponseV2["avatarUrl"];
  isRegistered!: ProjectContributorsResponseV2["isRegistered"];
  id!: ProjectContributorsResponseV2["id"];
  mergedPullRequests!: ProjectContributorsResponseV2["mergedPullRequests"];
  rewards!: ProjectContributorsResponseV2["rewards"];
  totalEarnedUsdAmount!: ProjectContributorsResponseV2["totalEarnedUsdAmount"];
  rank: UserRankInterface;
  globalRank!: ProjectContributorsResponseV2["globalRank"];
  globalRankPercentile!: ProjectContributorsResponseV2["globalRankPercentile"];
  globalRankCategory!: ProjectContributorsResponseV2["globalRankCategory"];

  constructor(props: ProjectContributorsResponseV2) {
    Object.assign(this, props);

    this.rank = new UserRank({
      rankCategory: this.globalRankCategory,
      rank: this.globalRank,
      rankPercentile: this.globalRankPercentile,
    });
  }
}
