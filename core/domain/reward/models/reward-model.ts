import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type RewardResponse = components["schemas"]["RewardDetailsResponse"];

export interface RewardInterface extends RewardResponse {}

export class Reward implements RewardInterface {
  amount!: RewardResponse["amount"];
  billingProfileId!: RewardResponse["billingProfileId"];
  createdAt!: RewardResponse["createdAt"];
  from!: RewardResponse["from"];
  id!: RewardResponse["id"];
  processedAt!: RewardResponse["processedAt"];
  project!: RewardResponse["project"];
  receipt!: RewardResponse["receipt"];
  status!: RewardResponse["status"];
  to!: RewardResponse["to"];
  unlockDate!: RewardResponse["unlockDate"];

  constructor(props: RewardResponse) {
    Object.assign(this, props);
  }
}
