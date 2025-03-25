import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type DepositResponse = components["schemas"]["DepositResponse"];

export interface DepositInterface extends DepositResponse {}

export class Deposit implements DepositInterface {
  amount!: DepositResponse["amount"];
  billingInformation!: DepositResponse["billingInformation"];
  currentBalance!: DepositResponse["currentBalance"];
  finalBalance!: DepositResponse["finalBalance"];
  id!: DepositResponse["id"];
  senderInformation!: DepositResponse["senderInformation"];
  status!: DepositResponse["status"];

  constructor(props: DepositResponse) {
    Object.assign(this, props);
  }
}
