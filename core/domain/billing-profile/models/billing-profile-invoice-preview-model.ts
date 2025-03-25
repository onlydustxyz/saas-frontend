import { BillingProfileType } from "@/core/domain/billing-profile/billing-profile.types";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BillingProfileInvoicePreviewResponse = components["schemas"]["InvoicePreviewResponse"];

export interface BillingProfileInvoicePreviewInterface extends BillingProfileInvoicePreviewResponse {
  isBillingProfileIndividual(): boolean;
  isBillingProfileCompany(): boolean;
  isBillingProfileSelfEmployed(): boolean;
}

export class BillingProfileInvoicePreview implements BillingProfileInvoicePreviewInterface {
  billingProfileType!: BillingProfileInvoicePreviewResponse["billingProfileType"];
  companyBillingProfile!: BillingProfileInvoicePreviewResponse["companyBillingProfile"];
  createdAt!: BillingProfileInvoicePreviewResponse["createdAt"];
  destinationAccounts!: BillingProfileInvoicePreviewResponse["destinationAccounts"];
  dueAt!: BillingProfileInvoicePreviewResponse["dueAt"];
  id!: BillingProfileInvoicePreviewResponse["id"];
  individualBillingProfile!: BillingProfileInvoicePreviewResponse["individualBillingProfile"];
  number!: BillingProfileInvoicePreviewResponse["number"];
  rewards!: BillingProfileInvoicePreviewResponse["rewards"];
  taxRate!: BillingProfileInvoicePreviewResponse["taxRate"];
  totalAfterTax!: BillingProfileInvoicePreviewResponse["totalAfterTax"];
  totalAfterTaxPerCurrency!: BillingProfileInvoicePreviewResponse["totalAfterTaxPerCurrency"];
  totalBeforeTax!: BillingProfileInvoicePreviewResponse["totalBeforeTax"];
  totalTax!: BillingProfileInvoicePreviewResponse["totalTax"];
  usdToEurConversionRate!: BillingProfileInvoicePreviewResponse["usdToEurConversionRate"];

  constructor(props: BillingProfileInvoicePreviewResponse) {
    Object.assign(this, props);
  }

  isBillingProfileIndividual() {
    return this.billingProfileType === BillingProfileType.Individual;
  }

  isBillingProfileCompany() {
    return this.billingProfileType === BillingProfileType.Company;
  }

  isBillingProfileSelfEmployed() {
    return this.billingProfileType === BillingProfileType.SelfEmployed;
  }
}
