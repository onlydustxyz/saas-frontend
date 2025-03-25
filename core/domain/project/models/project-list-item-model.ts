import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectListItemResponse = components["schemas"]["ProjectPageItemResponse"];

export interface ProjectListItemInterface extends ProjectListItemResponse {
  truncateDescription(max: number): string;
}

export class ProjectListItem implements ProjectListItemInterface {
  contributorCount!: ProjectListItemResponse["contributorCount"];
  ecosystems!: ProjectListItemResponse["ecosystems"];
  hasMissingGithubAppInstallation!: ProjectListItemResponse["hasMissingGithubAppInstallation"];
  hiring!: ProjectListItemResponse["hiring"];
  id!: ProjectListItemResponse["id"];
  languages!: ProjectListItemResponse["languages"];
  leaders!: ProjectListItemResponse["leaders"];
  logoUrl!: ProjectListItemResponse["logoUrl"];
  name!: ProjectListItemResponse["name"];
  remainingUsdBudget!: ProjectListItemResponse["remainingUsdBudget"];
  repoCount!: ProjectListItemResponse["repoCount"];
  shortDescription!: ProjectListItemResponse["shortDescription"];
  slug!: ProjectListItemResponse["slug"];
  tags!: ProjectListItemResponse["tags"];
  visibility!: ProjectListItemResponse["visibility"];

  constructor(props: ProjectListItemResponse) {
    Object.assign(this, props);
  }

  truncateDescription(max: number) {
    return this.shortDescription.length > max ? `${this.shortDescription.slice(0, max)}...` : this.shortDescription;
  }
}
