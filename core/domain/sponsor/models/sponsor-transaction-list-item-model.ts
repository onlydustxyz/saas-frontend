import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type SponsorTransactionListItemResponse = components["schemas"]["SponsorTransactionPageItemResponse"];

export interface SponsorTransactionListItemInterface extends SponsorTransactionListItemResponse {}

export class SponsorTransactionListItem implements SponsorTransactionListItemInterface {
  id!: SponsorTransactionListItemResponse["id"];
  date!: SponsorTransactionListItemResponse["date"];
  type!: SponsorTransactionListItemResponse["type"];
  amount!: SponsorTransactionListItemResponse["amount"];
  program!: SponsorTransactionListItemResponse["program"];
  depositStatus!: SponsorTransactionListItemResponse["depositStatus"];

  constructor(props: SponsorTransactionListItemResponse) {
    Object.assign(this, props);
  }
}
