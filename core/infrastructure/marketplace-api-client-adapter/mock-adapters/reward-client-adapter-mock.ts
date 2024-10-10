import { RewardStoragePort } from "@/core/domain/reward/outputs/reward-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class RewardClientAdapterMock implements RewardStoragePort {
  constructor() {}

  routes = {};

  getProjectRewards = mockHttpStorageResponse<RewardStoragePort["getProjectRewards"]>;

  getProjectReward = mockHttpStorageResponse<RewardStoragePort["getProjectReward"]>;

  getProjectRewardItems = mockHttpStorageResponse<RewardStoragePort["getProjectRewardItems"]>;

  createRewards = mockHttpStorageResponse<RewardStoragePort["createRewards"]>;

  getProjectRewardableItems = mockHttpStorageResponse<RewardStoragePort["getProjectRewardableItems"]>;

  getAllCompletedProjectRewardableItems = mockHttpStorageResponse<
    RewardStoragePort["getAllCompletedProjectRewardableItems"]
  >;

  addOtherWork = mockHttpStorageResponse<RewardStoragePort["addOtherWork"]>;

  addOtherPullRequest = mockHttpStorageResponse<RewardStoragePort["addOtherPullRequest"]>;

  addOtherIssue = mockHttpStorageResponse<RewardStoragePort["addOtherIssue"]>;
}
