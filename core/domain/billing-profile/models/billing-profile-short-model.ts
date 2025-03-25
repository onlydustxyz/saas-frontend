import { BillingProfileType } from "@/core/domain/billing-profile/billing-profile.types";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BillingProfileShortResponse = components["schemas"]["ShortBillingProfileResponse"];

export interface BillingProfileShortInterface extends BillingProfileShortResponse {
  getTypeLabel(): string | undefined;
  getWarning(): string | undefined;
  getError(): string | undefined;
  isIndividualLimitReached(): boolean;
  isBillingProfileIndividual(): boolean;
  isBillingProfileCompany(): boolean;
  isBillingProfileSelfEmployed(): boolean;
}

export class BillingProfileShort implements BillingProfileShortInterface {
  currentYearPaymentAmount!: BillingProfileShortResponse["currentYearPaymentAmount"];
  currentYearPaymentLimit!: BillingProfileShortResponse["currentYearPaymentLimit"];
  enabled!: BillingProfileShortResponse["enabled"];
  id!: BillingProfileShortResponse["id"];
  individualLimitReached!: BillingProfileShortResponse["individualLimitReached"];
  invoiceMandateAccepted!: BillingProfileShortResponse["invoiceMandateAccepted"];
  invoiceableRewardCount!: BillingProfileShortResponse["invoiceableRewardCount"];
  missingPayoutInfo!: BillingProfileShortResponse["missingPayoutInfo"];
  missingVerification!: BillingProfileShortResponse["missingVerification"];
  name!: BillingProfileShortResponse["name"];
  pendingInvitationResponse!: BillingProfileShortResponse["pendingInvitationResponse"];
  requestableRewardCount!: BillingProfileShortResponse["requestableRewardCount"];
  rewardCount!: BillingProfileShortResponse["rewardCount"];
  role!: BillingProfileShortResponse["role"];
  type!: BillingProfileShortResponse["type"];
  verificationBlocked!: BillingProfileShortResponse["verificationBlocked"];

  constructor(props: BillingProfileShortResponse) {
    Object.assign(this, props);
  }

  getTypeLabel() {
    switch (this.type) {
      case BillingProfileType.Company:
        return "Company";
      case BillingProfileType.Individual:
        return "Individual";
      case BillingProfileType.SelfEmployed:
        return "Self-Employed";
    }
  }

  getWarning() {
    if (this.missingVerification) {
      return "Missing Verification";
    }

    if (this.missingPayoutInfo) {
      return "Missing Payout Info";
    }
  }

  getError() {
    if (this.verificationBlocked) {
      return "Verification Blocked";
    }

    if (this.individualLimitReached) {
      return "Individual Limit Reached";
    }
  }

  isIndividualLimitReached() {
    return this.individualLimitReached || false;
  }

  isBillingProfileIndividual() {
    return this.type === BillingProfileType.Individual;
  }

  isBillingProfileCompany() {
    return this.type === BillingProfileType.Company;
  }

  isBillingProfileSelfEmployed() {
    return this.type === BillingProfileType.SelfEmployed;
  }
}
