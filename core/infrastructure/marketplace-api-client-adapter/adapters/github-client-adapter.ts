import { GetMyOrganizationsResponse, UpdatePullRequestBody } from "@/core/domain/github/github-contract.types";
import { GithubOrganizationList } from "@/core/domain/github/models/github-organization-list-model";
import { GithubStoragePort } from "@/core/domain/github/outputs/github-storage-port";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { FirstParameter } from "@/core/kernel/types";

export class GithubClientAdapter implements GithubStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    getMyOrganizations: "me/organizations",
    updatePullRequest: "pull-requests/:contributionUuid",
  } as const;

  getMyOrganizations = ({ queryParams, pathParams }: FirstParameter<GithubStoragePort["getMyOrganizations"]>) => {
    const path = this.routes["getMyOrganizations"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams, pathParams });
    const request = async () => {
      const data = await this.client.request<GetMyOrganizationsResponse>({
        path,
        method,
        tag,
        queryParams,
        pathParams,
      });

      return new GithubOrganizationList({ organizations: data });
    };

    return {
      request,
      tag,
    };
  };

  updatePullRequest = ({ pathParams }: FirstParameter<GithubStoragePort["updatePullRequest"]>) => {
    const path = this.routes["updatePullRequest"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: UpdatePullRequestBody) =>
      this.client.request<never>({
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
