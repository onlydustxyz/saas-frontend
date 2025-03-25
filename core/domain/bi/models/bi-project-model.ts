import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BiProjectResponse = components["schemas"]["BiProjectsPageItemResponse"];

export interface BiProjectInterface extends BiProjectResponse {}

export class BiProject implements BiProjectInterface {
  activeContributorCount!: BiProjectResponse["activeContributorCount"];
  availableBudget!: BiProjectResponse["availableBudget"];
  averageRewardUsdAmount!: BiProjectResponse["averageRewardUsdAmount"];
  categories!: BiProjectResponse["categories"];
  codeReviewCount!: BiProjectResponse["codeReviewCount"];
  contributionCount!: BiProjectResponse["contributionCount"];
  ecosystems!: BiProjectResponse["ecosystems"];
  issueCount!: BiProjectResponse["issueCount"];
  languages!: BiProjectResponse["languages"];
  onboardedContributorCount!: BiProjectResponse["onboardedContributorCount"];
  percentUsedBudget!: BiProjectResponse["percentUsedBudget"];
  prCount!: BiProjectResponse["prCount"];
  programs!: BiProjectResponse["programs"];
  project!: BiProjectResponse["project"];
  projectLeads!: BiProjectResponse["projectLeads"];
  rewardCount!: BiProjectResponse["rewardCount"];
  totalGrantedUsdAmount!: BiProjectResponse["totalGrantedUsdAmount"];
  totalRewardedUsdAmount!: BiProjectResponse["totalRewardedUsdAmount"];

  constructor(props: BiProjectResponse) {
    Object.assign(this, props);
  }
}
