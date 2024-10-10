import {
  AddOtherIssuePortParams,
  AddOtherIssuePortResponse,
  AddOtherPullRequestPortParams,
  AddOtherPullRequestPortResponse,
  AddOtherWorkPortParams,
  AddOtherWorkPortResponse,
  CreateRewardsPortParams,
  CreateRewardsPortResponse,
  GetAllCompletedProjectRewardableItemsPortParams,
  GetAllCompletedProjectRewardableItemsPortResponse,
  GetProjectRewardItemsPortParams,
  GetProjectRewardItemsPortResponse,
  GetProjectRewardPortParams,
  GetProjectRewardPortResponse,
  GetProjectRewardableItemsPortParams,
  GetProjectRewardableItemsPortResponse,
  GetProjectRewardsPortParams,
  GetProjectRewardsPortResponse,
} from "@/core/domain/reward/reward-contract.types";

export interface RewardStoragePort {
  routes: Record<string, string>;
  getProjectRewards(p: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
  getProjectReward(p: GetProjectRewardPortParams): GetProjectRewardPortResponse;
  getProjectRewardItems(p: GetProjectRewardItemsPortParams): GetProjectRewardItemsPortResponse;
  createRewards(p: CreateRewardsPortParams): CreateRewardsPortResponse;
  getProjectRewardableItems(p: GetProjectRewardableItemsPortParams): GetProjectRewardableItemsPortResponse;
  getAllCompletedProjectRewardableItems(
    p: GetAllCompletedProjectRewardableItemsPortParams
  ): GetAllCompletedProjectRewardableItemsPortResponse;
  addOtherWork(p: AddOtherWorkPortParams): AddOtherWorkPortResponse;
  addOtherPullRequest(p: AddOtherPullRequestPortParams): AddOtherPullRequestPortResponse;
  addOtherIssue(p: AddOtherIssuePortParams): AddOtherIssuePortResponse;
}
