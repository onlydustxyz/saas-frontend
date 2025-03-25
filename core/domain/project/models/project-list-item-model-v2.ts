import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategory, ProjectCategoryInterface } from "../../project-category/models/project-category-model";

type ProjectListItemResponseV2 = components["schemas"]["ProjectShortResponseV2"];

export interface ProjectListItemInterfaceV2 extends ProjectListItemResponseV2 {
  categories: ProjectCategoryInterface[];
}

export class ProjectListItemV2 implements ProjectListItemInterfaceV2 {
  id!: ProjectListItemResponseV2["id"];
  slug!: ProjectListItemResponseV2["slug"];
  name!: ProjectListItemResponseV2["name"];
  shortDescription!: ProjectListItemResponseV2["shortDescription"];
  contributorCount!: ProjectListItemResponseV2["contributorCount"];
  starCount!: ProjectListItemResponseV2["starCount"];
  forkCount!: ProjectListItemResponseV2["forkCount"];
  availableIssueCount!: ProjectListItemResponseV2["availableIssueCount"];
  goodFirstIssueCount!: ProjectListItemResponseV2["goodFirstIssueCount"];
  categories!: ProjectCategoryInterface[];
  languages!: ProjectListItemResponseV2["languages"];
  logoUrl!: ProjectListItemResponseV2["logoUrl"];
  ecosystems!: ProjectListItemResponseV2["ecosystems"];
  odHackStats!: ProjectListItemResponseV2["odHackStats"];
  contributorStats!: ProjectListItemResponseV2["contributorStats"];
  tags!: ProjectListItemResponseV2["tags"];

  constructor(props: ProjectListItemResponseV2) {
    Object.assign(this, props);
    this.categories = (props.categories || []).map(category => new ProjectCategory(category));
  }
}
