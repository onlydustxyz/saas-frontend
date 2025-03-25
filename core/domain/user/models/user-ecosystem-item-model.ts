import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type UserEcosystemItemResponse = components["schemas"]["UserProfileEcosystemPageItem"];

interface UserEcosystemItemInterface extends UserEcosystemItemResponse {}

export class UserEcosystemItem implements UserEcosystemItemInterface {
  rank!: UserEcosystemItemResponse["rank"];
  contributingStatus!: UserEcosystemItemResponse["contributingStatus"];
  contributedProjectCount!: UserEcosystemItemResponse["contributedProjectCount"];
  contributionCount!: UserEcosystemItemResponse["contributionCount"];
  rewardCount!: UserEcosystemItemResponse["rewardCount"];
  totalEarnedUsd!: UserEcosystemItemResponse["totalEarnedUsd"];
  projects!: UserEcosystemItemResponse["projects"];
  ecosystem!: UserEcosystemItemResponse["ecosystem"];

  constructor(props: UserEcosystemItemResponse) {
    Object.assign(this, props);
  }
}
