import {
  CreateRewardsPortParams,
  CreateRewardsPortResponse,
  GetProjectRewardItemsPortParams,
  GetProjectRewardItemsPortResponse,
  GetProjectRewardPortParams,
  GetProjectRewardPortResponse,
  GetProjectRewardsPortParams,
  GetProjectRewardsPortResponse,
} from "@/core/domain/reward/reward-contract.types";

export interface RewardFacadePort {
  getProjectRewards(p: GetProjectRewardsPortParams): GetProjectRewardsPortResponse;
  getProjectReward(p: GetProjectRewardPortParams): GetProjectRewardPortResponse;
  getProjectRewardItems(p: GetProjectRewardItemsPortParams): GetProjectRewardItemsPortResponse;
  createRewards(p: CreateRewardsPortParams): CreateRewardsPortResponse;
}
