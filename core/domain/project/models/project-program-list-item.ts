import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectProgramListItemResponse = components["schemas"]["ProjectProgramPageItemResponse"];

export interface ProjectProgramListItemInterface extends ProjectProgramListItemResponse {}

export class ProjectProgramListItem implements ProjectProgramListItemInterface {
  id!: ProjectProgramListItemResponse["id"];
  leads!: ProjectProgramListItemResponse["leads"];
  logoUrl!: ProjectProgramListItemResponse["logoUrl"];
  name!: ProjectProgramListItemResponse["name"];
  totalAvailable!: ProjectProgramListItemResponse["totalAvailable"];
  totalGranted!: ProjectProgramListItemResponse["totalGranted"];
  totalRewarded!: ProjectProgramListItemResponse["totalRewarded"];

  constructor(props: ProjectProgramListItemResponse) {
    Object.assign(this, props);
  }
}
