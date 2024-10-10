import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type RewardableItemResponse = components["schemas"]["RewardableItemResponse"];

export interface RewardableItemInterface extends RewardableItemResponse {}

export class RewardableItem implements RewardableItemInterface {
  author!: RewardableItemResponse["author"];
  commentsCount!: RewardableItemResponse["commentsCount"];
  commitsCount!: RewardableItemResponse["commitsCount"];
  completedAt!: RewardableItemResponse["completedAt"];
  contributionId!: RewardableItemResponse["contributionId"];
  createdAt!: RewardableItemResponse["createdAt"];
  githubBody!: RewardableItemResponse["githubBody"];
  htmlUrl!: RewardableItemResponse["htmlUrl"];
  id!: RewardableItemResponse["id"];
  ignored!: RewardableItemResponse["ignored"];
  number!: RewardableItemResponse["number"];
  repoId!: RewardableItemResponse["repoId"];
  repoName!: RewardableItemResponse["repoName"];
  status!: RewardableItemResponse["status"];
  title!: RewardableItemResponse["title"];
  type!: RewardableItemResponse["type"];
  userCommitsCount!: RewardableItemResponse["userCommitsCount"];

  constructor(props: RewardableItemResponse) {
    Object.assign(this, props);
  }
}
