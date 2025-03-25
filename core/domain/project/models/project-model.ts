import { GithubOrganization, GithubOrganizationInterface } from "@/core/domain/github/models/github-organization-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectResponse = components["schemas"]["ProjectResponse"];

export interface ProjectInterface extends ProjectResponse {
  organizations: GithubOrganizationInterface[];
  truncateDescription(max: number): string;
  findUserInProjectLead(id: string): ProjectResponse["leaders"][0] | undefined;
  addOrganizationToProject(organization: GithubOrganizationInterface): void;
  getProjectRepos(): GithubOrganizationInterface["repos"];
  isSomeOrganizationMissingPermissions(): boolean;
  isRepoOrganizationMissingPermissions(repoId: number): boolean;
  getOrganizationByRepoId(repoId: number): GithubOrganizationInterface | undefined;
  getGithubUpdatePermissionsUrlByRepo(repoId: number): string | undefined;
  isIndexingCompleted(): boolean;
}

export class Project implements ProjectInterface {
  id!: ProjectResponse["id"];
  slug!: ProjectResponse["slug"];
  name!: ProjectResponse["name"];
  createdAt!: ProjectResponse["createdAt"];
  shortDescription!: ProjectResponse["shortDescription"];
  longDescription!: ProjectResponse["longDescription"];
  logoUrl!: ProjectResponse["logoUrl"];
  moreInfos!: ProjectResponse["moreInfos"];
  hiring!: ProjectResponse["hiring"];
  visibility!: ProjectResponse["visibility"];
  contributorCount!: ProjectResponse["contributorCount"];
  topContributors!: ProjectResponse["topContributors"];
  organizations!: GithubOrganizationInterface[];
  leaders!: ProjectResponse["leaders"];
  ecosystems!: ProjectResponse["ecosystems"];
  categories!: ProjectResponse["categories"];
  categorySuggestions!: ProjectResponse["categorySuggestions"];
  programs!: ProjectResponse["programs"];
  languages!: ProjectResponse["languages"];
  hasRemainingBudget!: ProjectResponse["hasRemainingBudget"];
  rewardSettings!: ProjectResponse["rewardSettings"];
  indexingComplete!: ProjectResponse["indexingComplete"];
  indexedAt!: ProjectResponse["indexedAt"];
  me!: ProjectResponse["me"];
  tags!: ProjectResponse["tags"];
  goodFirstIssueCount!: ProjectResponse["goodFirstIssueCount"];

  constructor({ organizations, ...props }: ProjectResponse) {
    Object.assign(this, props);
    this.organizations = (organizations || []).map(organization => new GithubOrganization(organization));
  }

  truncateDescription(max: number) {
    return this.shortDescription.length > max ? `${this.shortDescription.slice(0, max)}...` : this.shortDescription;
  }

  findUserInProjectLead(id: string) {
    return this.leaders?.find(lead => lead.id === id);
  }

  addOrganizationToProject(organization: GithubOrganizationInterface) {
    this.organizations.push(organization);
  }

  getProjectRepos() {
    return this.organizations.flatMap(organization => organization.repos);
  }

  isSomeOrganizationMissingPermissions() {
    return this.organizations.some(organization => organization.isMissingPermissions());
  }

  isRepoOrganizationMissingPermissions(repoId: number) {
    return this.organizations.some(
      organization => organization.isContainsRepo([repoId]) && organization.isMissingPermissions()
    );
  }

  getOrganizationByRepoId(repoId: number) {
    return this.organizations.find(organization => organization.isContainsRepo([repoId]));
  }

  getGithubUpdatePermissionsUrlByRepo(repoId: number) {
    const organization = this.organizations.find(organization => organization.isContainsRepo([repoId]));

    return organization?.getGithubUpdatePermissionsUrl();
  }

  isIndexingCompleted() {
    return this.indexingComplete;
  }
}
