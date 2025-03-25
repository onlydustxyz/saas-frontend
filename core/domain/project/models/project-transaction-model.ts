import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectTransactionResponse = components["schemas"]["ProjectTransactionPageItemResponse"];

export interface ProjectTransactionInterface extends ProjectTransactionResponse {}

export class ProjectTransaction implements ProjectTransactionInterface {
  amount!: ProjectTransactionResponse["amount"];
  date!: ProjectTransactionResponse["date"];
  id!: ProjectTransactionResponse["id"];
  thirdParty!: ProjectTransactionResponse["thirdParty"];
  type!: ProjectTransactionResponse["type"];

  constructor(props: ProjectTransactionResponse) {
    Object.assign(this, props);
  }
}
