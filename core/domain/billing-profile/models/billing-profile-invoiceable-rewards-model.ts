import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BillingProfileInvoiceableRewardResponse = components["schemas"]["MyRewardPageItemResponse"];

export interface BillingProfileInvoiceableRewardInterface extends BillingProfileInvoiceableRewardResponse {}

export class BillingProfileInvoiceableReward implements BillingProfileInvoiceableRewardInterface {
  amount!: BillingProfileInvoiceableRewardResponse["amount"];
  billingProfileId!: BillingProfileInvoiceableRewardResponse["billingProfileId"];
  id!: BillingProfileInvoiceableRewardResponse["id"];
  networks!: BillingProfileInvoiceableRewardResponse["networks"];
  numberOfRewardedContributions!: BillingProfileInvoiceableRewardResponse["numberOfRewardedContributions"];
  processedAt!: BillingProfileInvoiceableRewardResponse["processedAt"];
  projectId!: BillingProfileInvoiceableRewardResponse["projectId"];
  requestedAt!: BillingProfileInvoiceableRewardResponse["requestedAt"];
  rewardedOnProjectLogoUrl!: BillingProfileInvoiceableRewardResponse["rewardedOnProjectLogoUrl"];
  rewardedOnProjectName!: BillingProfileInvoiceableRewardResponse["rewardedOnProjectName"];
  rewardedUser!: BillingProfileInvoiceableRewardResponse["rewardedUser"];
  status!: BillingProfileInvoiceableRewardResponse["status"];
  unlockDate!: BillingProfileInvoiceableRewardResponse["unlockDate"];

  constructor(props: BillingProfileInvoiceableRewardResponse) {
    Object.assign(this, props);
  }
}
