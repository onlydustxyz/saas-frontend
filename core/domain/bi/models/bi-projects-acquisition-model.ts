import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BiProjectAcquisitionResponse = components["schemas"]["BiAcquisitionStatsResponse"];

export interface BiProjectAcquisitionInterface extends BiProjectAcquisitionResponse {}

export class BiProjectAcquisition implements BiProjectAcquisitionInterface {
  globalVisitorCount!: BiProjectAcquisitionResponse["globalVisitorCount"];
  projectVisitorCount!: BiProjectAcquisitionResponse["projectVisitorCount"];
  applicantCount!: BiProjectAcquisitionResponse["applicantCount"];
  assigneeCount!: BiProjectAcquisitionResponse["assigneeCount"];
  contributorCount!: BiProjectAcquisitionResponse["contributorCount"];

  constructor(props: BiProjectAcquisitionResponse) {
    Object.assign(this, props);
  }
}
