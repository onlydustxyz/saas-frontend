import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributorContributionsOverTimeResponse = components["schemas"]["ContributionCountOverTimeResponse"];

export interface ContributorContributionsOverTimeInterface extends ContributorContributionsOverTimeResponse {}

export class ContributorContributionsOverTime implements ContributorContributionsOverTimeInterface {
  counts!: ContributorContributionsOverTimeResponse["counts"];

  constructor(props: ContributorContributionsOverTimeResponse) {
    Object.assign(this, props);
  }
}
