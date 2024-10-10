import { RewardItemInterface } from "@/core/domain/reward/models/reward-item-model";
import { RewardListItemInterface } from "@/core/domain/reward/models/reward-list-item-model";
import { RewardInterface } from "@/core/domain/reward/models/reward-model";
import { RewardableItemInterface } from "@/core/domain/reward/models/rewardable-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Project Rewards ------------------------------ */

export type GetProjectRewardsResponse = components["schemas"]["RewardsPageResponse"];

export type GetProjectRewardsModel = Omit<GetProjectRewardsResponse, "rewards"> & {
  rewards: RewardListItemInterface[];
};

type GetProjectRewardsPathParams = operations["getProjectRewards"]["parameters"]["path"];

type GetProjectRewardsQueryParams = operations["getProjectRewards"]["parameters"]["query"];

export type GetProjectRewardsPortResponse = HttpStorageResponse<GetProjectRewardsModel>;

export type GetProjectRewardsPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardsPathParams;
  QueryParams: GetProjectRewardsQueryParams;
}>;

/* ------------------------------ Get Project Reward ------------------------------ */

export type GetProjectRewardResponse = components["schemas"]["RewardDetailsResponse"];

export type GetProjectRewardModel = RewardInterface;

type GetProjectRewardPathParams = operations["getProjectReward"]["parameters"]["path"];

export type GetProjectRewardPortResponse = HttpStorageResponse<GetProjectRewardModel>;

export type GetProjectRewardPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardPathParams;
}>;

/* ------------------------------ Get Project Reward Items ------------------------------ */

export type GetProjectRewardItemsResponse = components["schemas"]["RewardItemsPageResponse"];

export type GetProjectRewardItemsModel = Omit<GetProjectRewardItemsResponse, "rewardItems"> & {
  rewardItems: RewardItemInterface[];
};

type GetProjectRewardItemsPathParams = operations["getProjectRewardItemsPage"]["parameters"]["path"];

type GetProjectRewardItemsQueryParams = operations["getProjectRewardItemsPage"]["parameters"]["query"];

export type GetProjectRewardItemsPortResponse = HttpStorageResponse<GetProjectRewardItemsModel>;

export type GetProjectRewardItemsPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardItemsPathParams;
  QueryParams: GetProjectRewardItemsQueryParams;
}>;

/* ------------------------------ Create Rewards ------------------------------ */

export type CreateRewardsResponse = components["schemas"]["CreateRewardResponse"];

export type CreateRewardsBody = components["schemas"]["RewardRequest"][];

type CreateRewardsPathParams = operations["createRewards"]["parameters"]["path"];

export type CreateRewardsPortParams = HttpClientParameters<{
  PathParams: CreateRewardsPathParams;
}>;

export type CreateRewardsPortResponse = HttpStorageResponse<CreateRewardsResponse, CreateRewardsBody>;

/* ------------------------------ Get Project Rewardable Items ------------------------------ */

export type GetProjectRewardableItemsResponse = components["schemas"]["RewardableItemsPageResponse"];

export type GetProjectRewardableItemsModel = Omit<GetProjectRewardableItemsResponse, "rewardableItems"> & {
  rewardableItems: RewardableItemInterface[];
};

type GetProjectRewardableItemsPathParams = operations["getProjectRewardableContributions"]["parameters"]["path"];

type GetProjectRewardableItemsQueryParams = operations["getProjectRewardableContributions"]["parameters"]["query"];

export type GetProjectRewardableItemsPortResponse = HttpStorageResponse<GetProjectRewardableItemsModel>;

export type GetProjectRewardableItemsPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardableItemsPathParams;
  QueryParams: GetProjectRewardableItemsQueryParams;
}>;

/* ------------------------------ Get All Completed Project Rewardable Items ------------------------------ */

export type GetAllCompletedProjectRewardableItemsResponse = components["schemas"]["AllRewardableItemsResponse"];

export type GetAllCompletedProjectRewardableItemsModel = Omit<
  GetAllCompletedProjectRewardableItemsResponse,
  "rewardableIssues" | "rewardablePullRequests" | "rewardableCodeReviews"
> & {
  rewardableIssues: RewardableItemInterface[];
  rewardablePullRequests: RewardableItemInterface[];
  rewardableCodeReviews: RewardableItemInterface[];
};

type GetAllCompletedProjectRewardableItemsPathParams =
  operations["getAllCompletedProjectRewardableContributions"]["parameters"]["path"];

type GetAllCompletedProjectRewardableItemsQueryParams =
  operations["getAllCompletedProjectRewardableContributions"]["parameters"]["query"];

export type GetAllCompletedProjectRewardableItemsPortResponse =
  HttpStorageResponse<GetAllCompletedProjectRewardableItemsModel>;

export type GetAllCompletedProjectRewardableItemsPortParams = HttpClientParameters<{
  PathParams: GetAllCompletedProjectRewardableItemsPathParams;
  QueryParams: GetAllCompletedProjectRewardableItemsQueryParams;
}>;

/* ------------------------------ Add Other Work ------------------------------ */

export type AddOtherWorkResponse = components["schemas"]["RewardableItemResponse"];

export type AddOtherWorkModel = RewardableItemInterface;

export type AddOtherWorkBody = components["schemas"]["AddOtherWorkRequest"];

type AddOtherWorkPathParams = operations["addRewardableOtherWork"]["parameters"]["path"];

export type AddOtherWorkPortParams = HttpClientParameters<{
  PathParams: AddOtherWorkPathParams;
}>;

export type AddOtherWorkPortResponse = HttpStorageResponse<AddOtherWorkModel, AddOtherWorkBody>;

/* ------------------------------ Add Other Pull Request ------------------------------ */

export type AddOtherPullRequestResponse = components["schemas"]["RewardableItemResponse"];

export type AddOtherPullRequestModel = RewardableItemInterface;

export type AddOtherPullRequestBody = components["schemas"]["AddOtherPullRequestRequest"];

type AddOtherPullRequestPathParams = operations["addRewardableOtherPullRequest"]["parameters"]["path"];

export type AddOtherPullRequestPortParams = HttpClientParameters<{
  PathParams: AddOtherPullRequestPathParams;
}>;

export type AddOtherPullRequestPortResponse = HttpStorageResponse<AddOtherPullRequestModel, AddOtherPullRequestBody>;

/* ------------------------------ Add Other Issue ------------------------------ */

export type AddOtherIssueResponse = components["schemas"]["RewardableItemResponse"];

export type AddOtherIssueModel = RewardableItemInterface;

export type AddOtherIssueBody = components["schemas"]["AddOtherIssueRequest"];

type AddOtherIssuePathParams = operations["addRewardableOtherIssue"]["parameters"]["path"];

export type AddOtherIssuePortParams = HttpClientParameters<{
  PathParams: AddOtherIssuePathParams;
}>;

export type AddOtherIssuePortResponse = HttpStorageResponse<AddOtherIssueModel, AddOtherIssueBody>;
