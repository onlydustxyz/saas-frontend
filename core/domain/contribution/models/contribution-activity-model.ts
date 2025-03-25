import { ContributionItemDto } from "@/core/domain/contribution/dto/contribution-item-dto";
import { Applicant, ApplicantInterface } from "@/core/domain/user/models/applicant-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributionActivityResponse = components["schemas"]["ContributionActivityPageItemResponse"];

export interface ContributionActivityInterface
  extends Omit<ContributionActivityResponse, "applicants" | "contributors" | "assignees" | "uuid"> {
  applicants: ApplicantInterface[];
  contributors: NonNullable<ContributionActivityResponse["contributors"]>;
  isNotAssigned(): boolean;
  isInProgress(): boolean;
  isToReview(): boolean;
  isArchived(): boolean;
  isDone(): boolean;
  toItemDto(): ContributionItemDto;
  canLinkIssues(): boolean;
  isIssue(): boolean;
  isPullRequest(): boolean;
  isCodeReview(): boolean;
  id: string;
}

export class ContributionActivity implements ContributionActivityInterface {
  activityStatus!: ContributionActivityResponse["activityStatus"];
  applicants!: ApplicantInterface[];
  completedAt!: ContributionActivityResponse["completedAt"];
  contributors!: NonNullable<ContributionActivityResponse["contributors"]>;
  createdAt!: ContributionActivityResponse["createdAt"];
  githubAuthor!: ContributionActivityResponse["githubAuthor"];
  githubBody!: ContributionActivityResponse["githubBody"];
  githubHtmlUrl!: ContributionActivityResponse["githubHtmlUrl"];
  githubLabels!: ContributionActivityResponse["githubLabels"];
  githubNumber!: ContributionActivityResponse["githubNumber"];
  githubStatus!: ContributionActivityResponse["githubStatus"];
  githubTitle!: ContributionActivityResponse["githubTitle"];
  languages!: ContributionActivityResponse["languages"];
  lastUpdatedAt!: ContributionActivityResponse["lastUpdatedAt"];
  linkedIssues!: ContributionActivityResponse["linkedIssues"];
  project!: ContributionActivityResponse["project"];
  repo!: ContributionActivityResponse["repo"];
  totalRewardedUsdAmount!: ContributionActivityResponse["totalRewardedUsdAmount"];
  type!: ContributionActivityResponse["type"];
  id!: ContributionActivityResponse["uuid"];
  githubId!: ContributionActivityResponse["githubId"];
  isIncludedInLiveHackathon!: ContributionActivityResponse["isIncludedInLiveHackathon"];

  constructor(props: ContributionActivityResponse) {
    Object.assign(this, props);
    this.applicants = (props.applicants ?? []).map(applicant => new Applicant(applicant));
    this.contributors = props.contributors ?? [];
    this.id = props.uuid;
  }

  isNotAssigned(): boolean {
    return this.activityStatus === "NOT_ASSIGNED";
  }

  isAssigned(): boolean {
    return this.activityStatus === "IN_PROGRESS";
  }

  isInProgress(): boolean {
    return this.activityStatus === "IN_PROGRESS";
  }

  isToReview(): boolean {
    return this.activityStatus === "TO_REVIEW";
  }

  isArchived(): boolean {
    return this.activityStatus === "ARCHIVED";
  }

  isDone(): boolean {
    return this.activityStatus === "DONE";
  }

  canLinkIssues(): boolean {
    return this.type === "PULL_REQUEST";
  }

  isIssue(): boolean {
    return this.type === "ISSUE";
  }

  isPullRequest(): boolean {
    return this.type === "PULL_REQUEST";
  }

  isCodeReview(): boolean {
    return this.type === "CODE_REVIEW";
  }

  toItemDto(): ContributionItemDto {
    return new ContributionItemDto({
      type: this.type,
      id: this.githubId,
      number: this.githubNumber,
      repoId: this.repo?.id,
      uuid: this.id,
    });
  }
}
