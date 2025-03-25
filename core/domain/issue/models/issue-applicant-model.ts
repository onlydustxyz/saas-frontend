import {
  ContributorOverview,
  ContributorOverviewInterface,
} from "@/core/domain/user/models/contributor-overview-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type IssueApplicantResponse = components["schemas"]["IssueApplicantsPageItemResponse"];

export interface IssueApplicantInterface extends IssueApplicantResponse {
  contributor: ContributorOverviewInterface;
}

export class IssueApplicant implements IssueApplicantInterface {
  applicationId!: IssueApplicantResponse["applicationId"];
  categories!: IssueApplicantResponse["categories"];
  codeReviewCount!: IssueApplicantResponse["codeReviewCount"];
  contributionCount!: IssueApplicantResponse["contributionCount"];
  contributor!: ContributorOverviewInterface;
  country!: IssueApplicantResponse["country"];
  ecosystems!: IssueApplicantResponse["ecosystems"];
  issueCount!: IssueApplicantResponse["issueCount"];
  languages!: IssueApplicantResponse["languages"];
  prCount!: IssueApplicantResponse["prCount"];
  projectContributorLabels!: IssueApplicantResponse["projectContributorLabels"];
  projects!: IssueApplicantResponse["projects"];
  rewardCount!: IssueApplicantResponse["rewardCount"];
  totalRewardedUsdAmount!: IssueApplicantResponse["totalRewardedUsdAmount"];
  appliedAt!: IssueApplicantResponse["appliedAt"];
  inProgressIssueCount!: IssueApplicantResponse["inProgressIssueCount"];
  maintainedProjectCount!: IssueApplicantResponse["maintainedProjectCount"];
  pendingApplicationCount!: IssueApplicantResponse["pendingApplicationCount"];

  constructor(props: IssueApplicantResponse) {
    Object.assign(this, props);

    this.contributor = new ContributorOverview(props.contributor);
  }
}
