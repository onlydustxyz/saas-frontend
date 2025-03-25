import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributorLastYearRewindResponse = components["schemas"]["ContributorRewindResponse"];

export interface ContributorLastYearRewindInterface extends ContributorLastYearRewindResponse {}

export class ContributorLastYearRewind implements ContributorLastYearRewindInterface {
  githubUserId!: ContributorLastYearRewindResponse["githubUserId"];
  login!: ContributorLastYearRewindResponse["login"];
  avatarUrl!: ContributorLastYearRewindResponse["avatarUrl"];
  isRegistered!: ContributorLastYearRewindResponse["isRegistered"];
  id!: ContributorLastYearRewindResponse["id"];
  commitCount!: ContributorLastYearRewindResponse["commitCount"];
  contributionCount!: ContributorLastYearRewindResponse["contributionCount"];
  pullRequestCount!: ContributorLastYearRewindResponse["pullRequestCount"];
  issueCount!: ContributorLastYearRewindResponse["issueCount"];
  leaderboard!: ContributorLastYearRewindResponse["leaderboard"];
  codeReviewCount!: ContributorLastYearRewindResponse["codeReviewCount"];
  longestStreak!: ContributorLastYearRewindResponse["longestStreak"];
  weekendIntensity!: ContributorLastYearRewindResponse["weekendIntensity"];
  dailyIntensity!: ContributorLastYearRewindResponse["dailyIntensity"];
  sprintIntensity!: ContributorLastYearRewindResponse["sprintIntensity"];
  mostActiveMonth!: ContributorLastYearRewindResponse["mostActiveMonth"];
  languages!: ContributorLastYearRewindResponse["languages"];
  mostActiveEcosystem!: ContributorLastYearRewindResponse["mostActiveEcosystem"];
  isReady!: ContributorLastYearRewindResponse["isReady"];

  constructor(props: ContributorLastYearRewindResponse) {
    Object.assign(this, props);
  }
}
