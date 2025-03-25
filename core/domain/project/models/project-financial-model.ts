import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectFinancialResponse = components["schemas"]["ProjectFinancialResponse"];

export interface ProjectFinancialInterface extends ProjectFinancialResponse {}

export class ProjectFinancial implements ProjectFinancialInterface {
  id!: ProjectFinancialResponse["id"];
  logoUrl!: ProjectFinancialResponse["logoUrl"];
  name!: ProjectFinancialResponse["name"];
  slug!: ProjectFinancialResponse["slug"];
  totalAvailable!: ProjectFinancialResponse["totalAvailable"];
  totalGranted!: ProjectFinancialResponse["totalGranted"];
  totalRewarded!: ProjectFinancialResponse["totalRewarded"];

  constructor(props: ProjectFinancialResponse) {
    Object.assign(this, props);
  }
}
