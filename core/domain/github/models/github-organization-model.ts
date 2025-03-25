import { GithubRepo, GithubRepoInterface } from "@/core/domain/github/models/github-repo-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type GithubOrganizationResponse = components["schemas"]["GithubOrganizationResponse"];

export interface GithubOrganizationInterface
  extends Omit<components["schemas"]["GithubOrganizationResponse"], "repos"> {
  repos: GithubRepoInterface[];
  isContainsRepo(repoIds: number[]): boolean;
  isInstalled(): boolean;
  isMissingPermissions(): boolean;
  isUserAdminOfOrganization(): boolean;
  addRepo(repo: GithubRepoInterface): void;
  searchRepo(search?: string | null): GithubRepoInterface[];
  getGithubManagementUrl(): string;
  getGithubInstallationUrl(): string;
  getGithubUpdatePermissionsUrl(): string | undefined;
  search(search?: string | null): GithubOrganizationInterface | undefined;
}

const baseUrl = "https://github.com/";

export class GithubOrganization implements GithubOrganizationInterface {
  githubUserId!: GithubOrganizationInterface["githubUserId"];
  login!: GithubOrganizationInterface["login"];
  avatarUrl!: GithubOrganizationInterface["avatarUrl"];
  name!: GithubOrganizationInterface["name"];
  htmlUrl!: GithubOrganizationInterface["htmlUrl"];
  isCurrentUserAdmin!: GithubOrganizationInterface["isCurrentUserAdmin"];
  isPersonal!: GithubOrganizationInterface["isPersonal"];
  installationId!: GithubOrganizationInterface["installationId"];
  installationStatus!: GithubOrganizationInterface["installationStatus"];
  repos!: GithubOrganizationInterface["repos"];
  githubAppInstallationPermissionsUpdateUrl!: GithubOrganizationInterface["githubAppInstallationPermissionsUpdateUrl"];

  constructor({ repos, ...props }: GithubOrganizationResponse) {
    Object.assign(this, props);
    this.repos = repos.map(repo => new GithubRepo(repo));
    this.name = this.name || this.login;
  }

  isContainsRepo(repoIds: number[]) {
    return this.repos.some(repo => repoIds.includes(repo.id));
  }

  searchRepo(search?: string | null) {
    if (!search) return this.repos;

    return this.repos.filter(repo => repo.name.toLowerCase().includes(search.toLowerCase()));
  }

  isInstalled() {
    return this.installationStatus !== "NOT_INSTALLED";
  }

  isMissingPermissions() {
    return this.installationStatus === "MISSING_PERMISSIONS";
  }

  addRepo(repo: GithubRepoInterface) {
    this.repos.push(repo);
  }

  getGithubManagementUrl() {
    if (this.isPersonal) {
      return `${baseUrl}settings/installations/${this.installationId}`;
    }

    return `${baseUrl}organizations/${this.login}/settings/installations/${this.installationId}`;
  }

  getGithubInstallationUrl() {
    return `${process.env.NEXT_PUBLIC_GITHUB_INSTALLATION_URL}/permissions?target_id=${this.githubUserId}&state=generic-state-`;
  }

  getGithubUpdatePermissionsUrl() {
    return this.githubAppInstallationPermissionsUpdateUrl;
  }

  search(search?: string | null) {
    if (!search) return this;

    if (this.name.toLowerCase().includes(search.toLowerCase())) {
      return this;
    }

    return undefined;
  }

  isUserAdminOfOrganization() {
    return this.isCurrentUserAdmin;
  }
}
