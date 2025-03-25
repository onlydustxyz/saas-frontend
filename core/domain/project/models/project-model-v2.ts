import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategory, ProjectCategoryInterface } from "../../project-category/models/project-category-model";

type ProjectResponseV2 = components["schemas"]["ProjectResponseV2"];

export interface ProjectInterfaceV2 extends ProjectResponseV2 {
  categories: ProjectCategoryInterface[];
}

export class ProjectV2 implements ProjectInterfaceV2 {
  id!: ProjectResponseV2["id"];
  slug!: ProjectResponseV2["slug"];
  name!: ProjectResponseV2["name"];
  logoUrl!: ProjectResponseV2["logoUrl"];
  shortDescription!: ProjectResponseV2["shortDescription"];
  longDescription!: ProjectResponseV2["longDescription"];
  contributorCount!: ProjectResponseV2["contributorCount"];
  starCount!: ProjectResponseV2["starCount"];
  forkCount!: ProjectResponseV2["forkCount"];
  availableIssueCount!: ProjectResponseV2["availableIssueCount"];
  goodFirstIssueCount!: ProjectResponseV2["goodFirstIssueCount"];
  categories!: ProjectCategoryInterface[];
  languages!: ProjectResponseV2["languages"];
  ecosystems!: ProjectResponseV2["ecosystems"];
  leads!: ProjectResponseV2["leads"];
  moreInfos!: ProjectResponseV2["moreInfos"];
  mergedPrCount!: ProjectResponseV2["mergedPrCount"];
  currentWeekAvailableIssueCount!: ProjectResponseV2["currentWeekAvailableIssueCount"];
  currentWeekMergedPrCount!: ProjectResponseV2["currentWeekMergedPrCount"];
  tags!: ProjectResponseV2["tags"];
  repos!: ProjectResponseV2["repos"];

  constructor(props: ProjectResponseV2) {
    Object.assign(this, props);
    this.categories = (props.categories || []).map(category => new ProjectCategory(category));
  }
}
