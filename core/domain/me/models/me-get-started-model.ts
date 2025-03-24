import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MeGetStartedResponse = components["schemas"]["GetStartedResponse"];

export interface MeGetStartedInterface extends MeGetStartedResponse {}

export class MeGetStarted implements MeGetStartedInterface {
  hasAppliedToAnIssue!: MeGetStartedResponse["hasAppliedToAnIssue"];
  hasBeenAssignedToAnIssue!: MeGetStartedResponse["hasBeenAssignedToAnIssue"];
  hasCompletedOneContribution!: MeGetStartedResponse["hasCompletedOneContribution"];

  constructor(props: MeGetStartedResponse) {
    Object.assign(this, props);
  }
}
