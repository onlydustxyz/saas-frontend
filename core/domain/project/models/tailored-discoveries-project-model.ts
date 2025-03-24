import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategory, ProjectCategoryInterface } from "../../project-category/models/project-category-model";

export type TailoredDiscoveriesProjectResponse = components["schemas"]["TailoredDiscoveriesProjectResponse"];

export interface TailoredDiscoveriesProjectInterface extends TailoredDiscoveriesProjectResponse {
  categories: ProjectCategoryInterface[];
}

export class TailoredDiscoveriesProject implements TailoredDiscoveriesProjectInterface {
  id!: TailoredDiscoveriesProjectResponse["id"];
  slug!: TailoredDiscoveriesProjectResponse["slug"];
  name!: TailoredDiscoveriesProjectResponse["name"];
  shortDescription!: TailoredDiscoveriesProjectResponse["shortDescription"];
  contributorCount!: TailoredDiscoveriesProjectResponse["contributorCount"];
  starCount!: TailoredDiscoveriesProjectResponse["starCount"];
  forkCount!: TailoredDiscoveriesProjectResponse["forkCount"];
  availableIssueCount!: TailoredDiscoveriesProjectResponse["availableIssueCount"];
  goodFirstIssueCount!: TailoredDiscoveriesProjectResponse["goodFirstIssueCount"];
  categories!: ProjectCategoryInterface[];
  languages!: TailoredDiscoveriesProjectResponse["languages"];
  logoUrl!: TailoredDiscoveriesProjectResponse["logoUrl"];
  ecosystems!: TailoredDiscoveriesProjectResponse["ecosystems"];
  odHackStats!: TailoredDiscoveriesProjectResponse["odHackStats"];
  contributorStats!: TailoredDiscoveriesProjectResponse["contributorStats"];
  tags!: TailoredDiscoveriesProjectResponse["tags"];
  algoVersion!: TailoredDiscoveriesProjectResponse["algoVersion"];
  recommendationRank!: TailoredDiscoveriesProjectResponse["recommendationRank"];
  rawRecommendationScore!: TailoredDiscoveriesProjectResponse["rawRecommendationScore"];
  adjustedRecommendationScore!: TailoredDiscoveriesProjectResponse["adjustedRecommendationScore"];
  isSlightlyRecommended!: TailoredDiscoveriesProjectResponse["isSlightlyRecommended"];
  isModeratelyRecommended!: TailoredDiscoveriesProjectResponse["isModeratelyRecommended"];
  isHighlyRecommended!: TailoredDiscoveriesProjectResponse["isHighlyRecommended"];
  languageReason!: TailoredDiscoveriesProjectResponse["languageReason"];
  ecosystemReason!: TailoredDiscoveriesProjectResponse["ecosystemReason"];
  domainReason!: TailoredDiscoveriesProjectResponse["domainReason"];
  popularityReason!: TailoredDiscoveriesProjectResponse["popularityReason"];

  constructor(props: TailoredDiscoveriesProjectResponse) {
    Object.assign(this, props);
    this.categories = (props.categories || []).map(category => new ProjectCategory(category));
  }
}
