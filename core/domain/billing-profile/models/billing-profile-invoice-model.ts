import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BillingProfileInvoiceResponse = components["schemas"]["BillingProfileInvoicesPageItemResponse"];

export interface BillingProfileInvoiceInterface extends BillingProfileInvoiceResponse {}

export class BillingProfileInvoice implements BillingProfileInvoiceInterface {
  id!: BillingProfileInvoiceResponse["id"];
  number!: BillingProfileInvoiceResponse["number"];
  createdAt!: BillingProfileInvoiceResponse["createdAt"];
  totalAfterTax!: BillingProfileInvoiceResponse["totalAfterTax"];
  status!: BillingProfileInvoiceResponse["status"];

  constructor(props: BillingProfileInvoiceResponse) {
    Object.assign(this, props);
  }
}
