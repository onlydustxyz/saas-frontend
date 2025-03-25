import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributorLocDistributionResponse = components["schemas"]["ContributorLocDistributionResponse"];

export interface ContributorLocDistributionInterface extends ContributorLocDistributionResponse {}

export class ContributorLocDistribution implements ContributorLocDistributionInterface {
  total!: ContributorLocDistributionResponse["total"];
  distribution!: ContributorLocDistributionResponse["distribution"];

  constructor(props: ContributorLocDistributionResponse) {
    Object.assign(this, props);
  }
}
