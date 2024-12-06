import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategory, ProjectCategoryInterface } from "../../project-category/models/project-category-model";

export type ProjectListItemResponseV2 = components["schemas"]["ProjectShortResponseV2"];

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
  pullRequestCount!: ProjectListItemResponseV2["pullRequestCount"];
  issueCount!: ProjectListItemResponseV2["issueCount"];
  goodFirstIssueCount!: ProjectListItemResponseV2["goodFirstIssueCount"];
  categories!: ProjectCategoryInterface[];
  languages!: ProjectListItemResponseV2["languages"];

  constructor(props: ProjectListItemResponseV2) {
    Object.assign(this, props);
    this.categories = (props.categories || []).map(category => new ProjectCategory(category));
  }
}
