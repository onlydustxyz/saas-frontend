import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MyProjectsAsContributorPageItemResponse = components["schemas"]["MyProjectsAsContributorPageItemResponse"];

export interface MeContributorProjectsInterface extends MyProjectsAsContributorPageItemResponse {}

export class MeContributorProjects implements MeContributorProjectsInterface {
  billingProfile!: MyProjectsAsContributorPageItemResponse["billingProfile"];
  contributionCount!: MyProjectsAsContributorPageItemResponse["contributionCount"];
  contributorCount!: MyProjectsAsContributorPageItemResponse["contributorCount"];
  goodFirstIssueIds!: MyProjectsAsContributorPageItemResponse["goodFirstIssueIds"];
  id!: MyProjectsAsContributorPageItemResponse["id"];
  languages!: MyProjectsAsContributorPageItemResponse["languages"];
  leads!: MyProjectsAsContributorPageItemResponse["leads"];
  logoUrl!: MyProjectsAsContributorPageItemResponse["logoUrl"];
  name!: MyProjectsAsContributorPageItemResponse["name"];
  repos!: MyProjectsAsContributorPageItemResponse["repos"];
  rewardedUsdAmount!: MyProjectsAsContributorPageItemResponse["rewardedUsdAmount"];
  shortDescription!: MyProjectsAsContributorPageItemResponse["shortDescription"];
  slug!: MyProjectsAsContributorPageItemResponse["slug"];
  visibility!: MyProjectsAsContributorPageItemResponse["visibility"];

  constructor(props: MyProjectsAsContributorPageItemResponse) {
    Object.assign(this, props);
  }
}
