import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type RewardListItemResponseV2 = components["schemas"]["RewardPageItemResponse"];

export interface RewardListItemV2Interface extends RewardListItemResponseV2 {
  isBlocked(): boolean;
}

export class RewardListItemV2 implements RewardListItemV2Interface {
  id!: RewardListItemResponseV2["id"];
  amount!: RewardListItemResponseV2["amount"];
  status!: RewardListItemResponseV2["status"];
  from!: RewardListItemResponseV2["from"];
  to!: RewardListItemResponseV2["to"];
  requestedAt!: RewardListItemResponseV2["requestedAt"];
  processedAt!: RewardListItemResponseV2["processedAt"];
  unlockDate!: RewardListItemResponseV2["unlockDate"];
  project!: RewardListItemResponseV2["project"];
  billingProfileId!: RewardListItemResponseV2["billingProfileId"];

  constructor(props: RewardListItemResponseV2) {
    Object.assign(this, props);
  }

  isBlocked() {
    return this.status !== "PENDING_REQUEST" && this.status !== "PROCESSING" && this.status !== "COMPLETE";
  }
}
