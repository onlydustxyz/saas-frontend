import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type UserLanguageItemResponse = components["schemas"]["UserProfileLanguagePageItem"];

interface UserLanguageItemInterface extends UserLanguageItemResponse {}

export class UserLanguageItem implements UserLanguageItemInterface {
  rank!: UserLanguageItemResponse["rank"];
  contributingStatus!: UserLanguageItemResponse["contributingStatus"];
  contributedProjectCount!: UserLanguageItemResponse["contributedProjectCount"];
  contributionCount!: UserLanguageItemResponse["contributionCount"];
  rewardCount!: UserLanguageItemResponse["rewardCount"];
  totalEarnedUsd!: UserLanguageItemResponse["totalEarnedUsd"];
  projects!: UserLanguageItemResponse["projects"];
  language!: UserLanguageItemResponse["language"];

  constructor(props: UserLanguageItemResponse) {
    Object.assign(this, props);
  }
}
