import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategory, ProjectCategoryInterface } from "../../project-category/models/project-category-model";

type ProjectRankedListItemResponse = components["schemas"]["RankedProjectListItem"];

export interface ProjectRankedListItemInterface extends ProjectRankedListItemResponse {
  categories: ProjectCategoryInterface[];
}

export class ProjectRankedListItem implements ProjectRankedListItemInterface {
  id!: ProjectRankedListItemResponse["id"];
  slug!: ProjectRankedListItemResponse["slug"];
  name!: ProjectRankedListItemResponse["name"];
  shortDescription!: ProjectRankedListItemResponse["shortDescription"];
  contributorCount!: ProjectRankedListItemResponse["contributorCount"];
  starCount!: ProjectRankedListItemResponse["starCount"];
  forkCount!: ProjectRankedListItemResponse["forkCount"];
  availableIssueCount!: ProjectRankedListItemResponse["availableIssueCount"];
  goodFirstIssueCount!: ProjectRankedListItemResponse["goodFirstIssueCount"];
  categories!: ProjectCategoryInterface[];
  languages!: ProjectRankedListItemResponse["languages"];
  logoUrl!: ProjectRankedListItemResponse["logoUrl"];
  ecosystems!: ProjectRankedListItemResponse["ecosystems"];
  odHackStats!: ProjectRankedListItemResponse["odHackStats"];
  contributorStats!: ProjectRankedListItemResponse["contributorStats"];
  tags!: ProjectRankedListItemResponse["tags"];
  rank!: ProjectRankedListItemResponse["rank"];

  constructor(props: ProjectRankedListItemResponse) {
    Object.assign(this, props);
    this.categories = (props.categories || []).map(category => new ProjectCategory(category));
  }
}
