import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type GithubRepoResponse = components["schemas"]["GithubRepoResponse"];

export interface GithubRepoInterface extends GithubRepoResponse {
  isRepoIncluded(repoIds: number[]): boolean;
}

export class GithubRepo implements GithubRepoInterface {
  id!: GithubRepoInterface["id"];
  owner!: GithubRepoInterface["owner"];
  name!: GithubRepoInterface["name"];
  description!: GithubRepoInterface["description"];
  htmlUrl!: GithubRepoInterface["htmlUrl"];
  stars!: GithubRepoInterface["stars"];
  forkCount!: GithubRepoInterface["forkCount"];
  hasIssues!: GithubRepoInterface["hasIssues"];
  isIncludedInProject!: GithubRepoInterface["isIncludedInProject"];
  isAuthorizedInGithubApp!: GithubRepoInterface["isAuthorizedInGithubApp"];

  constructor(props: GithubRepoResponse) {
    Object.assign(this, props);
  }

  isRepoIncluded(repoIds: number[]): boolean {
    return repoIds.includes(this.id);
  }
}
