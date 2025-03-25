import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectStatsResponse = components["schemas"]["ProjectStatsResponse"];

export interface ProjectStatsInterface extends ProjectStatsResponse {}

export class ProjectStats implements ProjectStatsInterface {
  activeContributorCount!: ProjectStatsResponse["activeContributorCount"];
  mergedPrCount!: ProjectStatsResponse["mergedPrCount"];
  onboardedContributorCount!: ProjectStatsResponse["onboardedContributorCount"];

  constructor(props: ProjectStatsResponse) {
    Object.assign(this, props);
  }
}
