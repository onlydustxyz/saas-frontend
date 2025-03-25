import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BillingProfilePayoutInfoResponse = components["schemas"]["BillingProfilePayoutInfoResponse"];

export interface BillingProfilePayoutInfoInterface extends BillingProfilePayoutInfoResponse {}

export class BillingProfilePayoutInfo implements BillingProfilePayoutInfoInterface {
  hasValidPayoutSettings!: BillingProfilePayoutInfoResponse["hasValidPayoutSettings"];
  bankAccount!: BillingProfilePayoutInfoResponse["bankAccount"];
  missingBankAccount!: BillingProfilePayoutInfoResponse["missingBankAccount"];
  ethWallet!: BillingProfilePayoutInfoResponse["ethWallet"];
  missingEthWallet!: BillingProfilePayoutInfoResponse["missingEthWallet"];
  optimismAddress!: BillingProfilePayoutInfoResponse["optimismAddress"];
  missingOptimismWallet!: BillingProfilePayoutInfoResponse["missingOptimismWallet"];
  aptosAddress!: BillingProfilePayoutInfoResponse["aptosAddress"];
  missingAptosWallet!: BillingProfilePayoutInfoResponse["missingAptosWallet"];
  starknetAddress!: BillingProfilePayoutInfoResponse["starknetAddress"];
  missingStarknetWallet!: BillingProfilePayoutInfoResponse["missingStarknetWallet"];
  stellarAccountId!: BillingProfilePayoutInfoResponse["stellarAccountId"];
  missingStellarWallet!: BillingProfilePayoutInfoResponse["missingStellarWallet"];
  nearAccountId!: BillingProfilePayoutInfoResponse["nearAccountId"];
  missingNearWallet!: BillingProfilePayoutInfoResponse["missingNearWallet"];

  constructor(props: BillingProfilePayoutInfoResponse) {
    Object.assign(this, props);
  }
}
