import { RewardItemInterface } from "@/core/domain/reward/models/reward-item-model";
import { RewardListItemInterface } from "@/core/domain/reward/models/reward-list-item-model";
import { RewardListItemV2Interface } from "@/core/domain/reward/models/reward-list-item-v2-model";
import { RewardInterface } from "@/core/domain/reward/models/reward-model";
import { RewardableItemInterface } from "@/core/domain/reward/models/rewardable-item-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* ------------------------------ Get Rewards ------------------------------ */

export type GetRewardsResponse = components["schemas"]["RewardPageResponse"];

export type GetRewardsModel = Omit<GetRewardsResponse, "rewards"> & {
  rewards: RewardListItemV2Interface[];
};

export type GetRewardsQueryParams = operations["getRewards_1"]["parameters"]["query"]["queryParams"];

export type GetRewardsPortResponse = HttpStorageResponse<GetRewardsModel>;

export type GetRewardsPortParams = HttpClientParameters<{
  QueryParams: GetRewardsQueryParams;
}>;

/* ----------------------------- Get Rewards CSV ---------------------------- */

export type GetRewardsCsvPortResponse = HttpStorageResponse<Blob>;

/* ------------------------------ Get Reward by id ------------------------------ */

export type GetRewardByIdResponse = components["schemas"]["RewardPageItemResponse"];

type GetRewardByIdModel = RewardListItemV2Interface;

type GetRewardByIdPathParams = operations["getReward"]["parameters"]["path"];

export type GetRewardByIdPortResponse = HttpStorageResponse<GetRewardByIdModel>;

export type GetRewardByIdPortParams = HttpClientParameters<{
  PathParams: GetRewardByIdPathParams;
}>;

/* ------------------------------ Get Project Rewards ------------------------------ */

export type GetProjectRewardsResponse = components["schemas"]["RewardsPageResponse"];

export type GetProjectRewardsModel = Omit<GetProjectRewardsResponse, "rewards"> & {
  rewards: RewardListItemInterface[];
};

type GetProjectRewardsPathParams = operations["getProjectRewards"]["parameters"]["path"];

export type GetProjectRewardsQueryParams = operations["getProjectRewards"]["parameters"]["query"];

export type GetProjectRewardsPortResponse = HttpStorageResponse<GetProjectRewardsModel>;

export type GetProjectRewardsPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardsPathParams;
  QueryParams: GetProjectRewardsQueryParams;
}>;

/* ------------------------------ Get Project Reward ------------------------------ */

export type GetProjectRewardResponse = components["schemas"]["RewardDetailsResponse"];

type GetProjectRewardModel = RewardInterface;

type GetProjectRewardPathParams = operations["getProjectReward"]["parameters"]["path"];

export type GetProjectRewardPortResponse = HttpStorageResponse<GetProjectRewardModel>;

export type GetProjectRewardPortParams = HttpClientParameters<{
  PathParams: GetProjectRewardPathParams;
}>;

/* ------------------------------ Get Project Reward Items ------------------------------ */

export type GetProjectRewardItemsResponse = components["schemas"]["RewardItemsPageResponse"];

type GetProjectRewardItemsModel = Omit<GetProjectRewardItemsResponse, "rewardItems"> & {
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

/* ------------------------------ Cancel project Reward ------------------------------ */

type CancelRewardsPathParams = operations["cancelReward"]["parameters"]["path"];

export type CancelRewardsPortParams = HttpClientParameters<{
  PathParams: CancelRewardsPathParams;
}>;

export type CancelRewardsPortResponse = HttpStorageResponse<unknown>;

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
