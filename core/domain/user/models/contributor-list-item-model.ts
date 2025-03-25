import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributorListItemResponse = components["schemas"]["ContributorPageItemResponseV2"];

export interface ContributorListItemInterface extends ContributorListItemResponse {}

export class ContributorListItem implements ContributorListItemInterface {
  githubUserId!: ContributorListItemResponse["githubUserId"];
  login!: ContributorListItemResponse["login"];
  avatarUrl!: ContributorListItemResponse["avatarUrl"];
  isRegistered!: ContributorListItemResponse["isRegistered"];
  id?: ContributorListItemResponse["id"];
  globalRank!: ContributorListItemResponse["globalRank"];
  globalRankPercentile!: ContributorListItemResponse["globalRankPercentile"];
  globalRankCategory!: ContributorListItemResponse["globalRankCategory"];
  mergedPullRequests!: ContributorListItemResponse["mergedPullRequests"];
  rewards!: ContributorListItemResponse["rewards"];
  totalEarnedUsdAmount!: ContributorListItemResponse["totalEarnedUsdAmount"];

  constructor(props: ContributorListItemResponse) {
    Object.assign(this, props);
  }
}
