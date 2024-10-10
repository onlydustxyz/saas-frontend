import { RewardItem } from "@/core/domain/reward/models/reward-item-model";
import { RewardListItem } from "@/core/domain/reward/models/reward-list-item-model";
import { Reward } from "@/core/domain/reward/models/reward-model";
import { RewardableItem } from "@/core/domain/reward/models/rewardable-item-model";
import { RewardStoragePort } from "@/core/domain/reward/outputs/reward-storage-port";
import {
  AddOtherIssueBody,
  AddOtherIssueResponse,
  AddOtherPullRequestBody,
  AddOtherPullRequestResponse,
  AddOtherWorkBody,
  AddOtherWorkResponse,
  CreateRewardsBody,
  CreateRewardsResponse,
  GetAllCompletedProjectRewardableItemsResponse,
  GetProjectRewardItemsResponse,
  GetProjectRewardResponse,
  GetProjectRewardableItemsResponse,
  GetProjectRewardsResponse,
} from "@/core/domain/reward/reward-contract.types";
import { MarketplaceApiVersion } from "@/core/infrastructure/marketplace-api-client-adapter/config/api-version";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class RewardClientAdapter implements RewardStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getProjectRewards: "projects/:projectId/rewards",
    getProjectReward: "projects/:projectId/rewards/:rewardId",
    getProjectRewardItems: "projects/:projectId/rewards/:rewardId/reward-items",
    createRewards: "projects/:projectId/rewards",
    getProjectRewardableItems: "projects/:projectId/rewardable-items",
    getAllCompletedProjectRewardableItems: "projects/:projectId/rewardable-items/all-completed",
    addOtherWork: "projects/:projectId/rewardable-items/other-works",
    addOtherPullRequest: "projects/:projectId/rewardable-items/other-pull-requests",
    addOtherIssue: "projects/:projectId/rewardable-items/other-issues",
  } as const;

  getProjectRewards = ({ queryParams, pathParams }: FirstParameter<RewardStoragePort["getProjectRewards"]>) => {
    const path = this.routes["getProjectRewards"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectRewardsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        rewards: data.rewards.map(reward => new RewardListItem(reward)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getProjectReward = ({ pathParams }: FirstParameter<RewardStoragePort["getProjectReward"]>) => {
    const path = this.routes["getProjectReward"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectRewardResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new Reward(data);
    };

    return {
      request,
      tag,
    };
  };

  getProjectRewardItems = ({ queryParams, pathParams }: FirstParameter<RewardStoragePort["getProjectRewardItems"]>) => {
    const path = this.routes["getProjectRewardItems"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectRewardItemsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        rewardItems: data.rewardItems.map(rewardItem => new RewardItem(rewardItem)),
      };
    };

    return {
      request,
      tag,
    };
  };

  createRewards = ({ pathParams }: FirstParameter<RewardStoragePort["createRewards"]>) => {
    const path = this.routes["createRewards"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: CreateRewardsBody) =>
      this.client.request<CreateRewardsResponse>({
        path,
        version: MarketplaceApiVersion.v2,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  getProjectRewardableItems = ({
    queryParams,
    pathParams,
  }: FirstParameter<RewardStoragePort["getProjectRewardableItems"]>) => {
    const path = this.routes["getProjectRewardableItems"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetProjectRewardableItemsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        rewardableItems: data.rewardableItems.map(rewardableItem => new RewardableItem(rewardableItem)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getAllCompletedProjectRewardableItems = ({
    queryParams,
    pathParams,
  }: FirstParameter<RewardStoragePort["getAllCompletedProjectRewardableItems"]>) => {
    const path = this.routes["getAllCompletedProjectRewardableItems"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetAllCompletedProjectRewardableItemsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return {
        ...data,
        rewardableIssues: data.rewardableIssues.map(rewardableIssue => new RewardableItem(rewardableIssue)),
        rewardablePullRequests: data.rewardablePullRequests.map(
          rewardablePullRequest => new RewardableItem(rewardablePullRequest)
        ),
        rewardableCodeReviews: data.rewardableCodeReviews.map(
          rewardableCodeReview => new RewardableItem(rewardableCodeReview)
        ),
      };
    };

    return {
      request,
      tag,
    };
  };

  addOtherWork = ({ pathParams }: FirstParameter<RewardStoragePort["addOtherWork"]>) => {
    const path = this.routes["addOtherWork"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: AddOtherWorkBody) =>
      this.client.request<AddOtherWorkResponse>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  addOtherPullRequest = ({ pathParams }: FirstParameter<RewardStoragePort["addOtherPullRequest"]>) => {
    const path = this.routes["addOtherPullRequest"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: AddOtherPullRequestBody) =>
      this.client.request<AddOtherPullRequestResponse>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  addOtherIssue = ({ pathParams }: FirstParameter<RewardStoragePort["addOtherIssue"]>) => {
    const path = this.routes["addOtherIssue"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: AddOtherIssueBody) =>
      this.client.request<AddOtherIssueResponse>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };
}
