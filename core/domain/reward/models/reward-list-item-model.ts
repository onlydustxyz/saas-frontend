import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type RewardListItemResponse = components["schemas"]["RewardsPageItemResponse"];

export interface RewardListItemInterface extends RewardListItemResponse {
  isCompleted(): boolean;
  isProcessing(): boolean;
}

export class RewardListItem implements RewardListItemInterface {
  amount!: RewardListItemResponse["amount"];
  id!: RewardListItemResponse["id"];
  numberOfRewardedContributions!: RewardListItemResponse["numberOfRewardedContributions"];
  processedAt!: RewardListItemResponse["processedAt"];
  requestedAt!: RewardListItemResponse["requestedAt"];
  rewardedUser!: RewardListItemResponse["rewardedUser"];
  status!: RewardListItemResponse["status"];
  unlockDate!: RewardListItemResponse["unlockDate"];

  constructor(props: RewardListItemResponse) {
    Object.assign(this, props);
  }

  isCompleted() {
    return this.status === "COMPLETE";
  }

  isProcessing() {
    return this.status === "PROCESSING";
  }
}
