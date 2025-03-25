import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectAcquisitionTipResponse = components["schemas"]["ProjectAcquisitionTipResponse"];

interface ProjectAcquisitionTipInterface extends ProjectAcquisitionTipResponse {}

export class ProjectAcquisitionTip implements ProjectAcquisitionTipInterface {
  identifier!: ProjectAcquisitionTipResponse["identifier"];
  url!: ProjectAcquisitionTipResponse["url"];

  constructor(props: ProjectAcquisitionTipResponse) {
    Object.assign(this, props);
  }
}
