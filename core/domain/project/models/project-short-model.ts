import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectShortResponse = components["schemas"]["ProjectShortResponse"];

export interface ProjectShortInterface extends ProjectShortResponse {}

export class ProjectShort implements ProjectShortInterface {
  shortDescription!: ProjectShortResponse["shortDescription"];
  id!: ProjectShortResponse["id"];
  languages!: ProjectShortResponse["languages"];
  logoUrl!: ProjectShortResponse["logoUrl"];
  name!: ProjectShortResponse["name"];
  slug!: ProjectShortResponse["slug"];
  visibility!: ProjectShortResponse["visibility"];

  constructor(props: ProjectShortResponse) {
    Object.assign(this, props);
  }
}
