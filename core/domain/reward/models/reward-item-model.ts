import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type RewardItemResponse = components["schemas"]["RewardItemResponse"];

export interface RewardItemInterface extends RewardItemResponse {}

export class RewardItem implements RewardItemInterface {
  authorAvatarUrl!: RewardItemResponse["authorAvatarUrl"];
  authorGithubUrl!: RewardItemResponse["authorGithubUrl"];
  authorLogin!: RewardItemResponse["authorLogin"];
  commentsCount!: RewardItemResponse["commentsCount"];
  commitsCount!: RewardItemResponse["commitsCount"];
  completedAt!: RewardItemResponse["completedAt"];
  contributionId!: RewardItemResponse["contributionId"];
  createdAt!: RewardItemResponse["createdAt"];
  githubAuthorId!: RewardItemResponse["githubAuthorId"];
  githubBody!: RewardItemResponse["githubBody"];
  githubUrl!: RewardItemResponse["githubUrl"];
  id!: RewardItemResponse["id"];
  number!: RewardItemResponse["number"];
  repoName!: RewardItemResponse["repoName"];
  status!: RewardItemResponse["status"];
  title!: RewardItemResponse["title"];
  type!: RewardItemResponse["type"];
  userCommitsCount!: RewardItemResponse["userCommitsCount"];

  constructor(props: RewardItemResponse) {
    Object.assign(this, props);
  }
}
