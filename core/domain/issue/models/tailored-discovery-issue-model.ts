import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type TailoredDiscoveriesIssueResponse = components["schemas"]["TailoredDiscoveriesIssueResponse"];

export interface TailoredDiscoveriesIssueInterface extends TailoredDiscoveriesIssueResponse {}

export class TailoredDiscoveriesIssue implements TailoredDiscoveriesIssueInterface {
  uuid!: TailoredDiscoveriesIssueResponse["uuid"];
  type!: TailoredDiscoveriesIssueResponse["type"];
  repo!: TailoredDiscoveriesIssueResponse["repo"];
  githubAuthor!: TailoredDiscoveriesIssueResponse["githubAuthor"];
  githubNumber!: TailoredDiscoveriesIssueResponse["githubNumber"];
  githubStatus!: TailoredDiscoveriesIssueResponse["githubStatus"];
  githubTitle!: TailoredDiscoveriesIssueResponse["githubTitle"];
  githubHtmlUrl!: TailoredDiscoveriesIssueResponse["githubHtmlUrl"];
  githubBody!: TailoredDiscoveriesIssueResponse["githubBody"];
  githubLabels!: TailoredDiscoveriesIssueResponse["githubLabels"];
  lastUpdatedAt!: TailoredDiscoveriesIssueResponse["lastUpdatedAt"];
  githubId!: TailoredDiscoveriesIssueResponse["githubId"];
  createdAt!: TailoredDiscoveriesIssueResponse["createdAt"];
  completedAt!: TailoredDiscoveriesIssueResponse["completedAt"];
  activityStatus!: TailoredDiscoveriesIssueResponse["activityStatus"];
  project!: TailoredDiscoveriesIssueResponse["project"];
  contributors!: TailoredDiscoveriesIssueResponse["contributors"];
  applicants!: TailoredDiscoveriesIssueResponse["applicants"];
  mergedBy!: TailoredDiscoveriesIssueResponse["mergedBy"];
  languages!: TailoredDiscoveriesIssueResponse["languages"];
  linkedIssues!: TailoredDiscoveriesIssueResponse["linkedIssues"];
  totalRewardedUsdAmount!: TailoredDiscoveriesIssueResponse["totalRewardedUsdAmount"];
  callerTotalRewardedUsdAmount!: TailoredDiscoveriesIssueResponse["callerTotalRewardedUsdAmount"];
  githubCommentCount!: TailoredDiscoveriesIssueResponse["githubCommentCount"];
  isIncludedInLiveHackathon!: TailoredDiscoveriesIssueResponse["isIncludedInLiveHackathon"];
  amountOfWork!: TailoredDiscoveriesIssueResponse["amountOfWork"];
  algoVersion!: TailoredDiscoveriesIssueResponse["algoVersion"];
  recommendationRank!: TailoredDiscoveriesIssueResponse["recommendationRank"];
  rawRecommendationScore!: TailoredDiscoveriesIssueResponse["rawRecommendationScore"];
  adjustedRecommendationScore!: TailoredDiscoveriesIssueResponse["adjustedRecommendationScore"];
  isSlightlyRecommended!: TailoredDiscoveriesIssueResponse["isSlightlyRecommended"];
  isModeratelyRecommended!: TailoredDiscoveriesIssueResponse["isModeratelyRecommended"];
  isHighlyRecommended!: TailoredDiscoveriesIssueResponse["isHighlyRecommended"];
  languageReason!: TailoredDiscoveriesIssueResponse["languageReason"];
  ecosystemReason!: TailoredDiscoveriesIssueResponse["ecosystemReason"];
  domainReason!: TailoredDiscoveriesIssueResponse["domainReason"];
  popularityReason!: TailoredDiscoveriesIssueResponse["popularityReason"];

  constructor(props: TailoredDiscoveriesIssueResponse) {
    Object.assign(this, props);
  }
}
