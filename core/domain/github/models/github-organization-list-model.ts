import { GithubOrganization, GithubOrganizationInterface } from "@/core/domain/github/models/github-organization-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type GithubOrganizationResponse = {
  organizations: components["schemas"]["GithubOrganizationResponse"][];
};

interface GithubOrganizationListInterface {
  organizations: GithubOrganizationInterface[];
  getInstalledOrganizations(): GithubOrganizationInterface[];
  getNotInstalledOrganizations(): GithubOrganizationInterface[];
  search(search?: string | null): GithubOrganizationInterface[];
  addOrganization(organization: GithubOrganizationInterface): GithubOrganizationListInterface;
  addOrganizations(organizations: GithubOrganizationInterface[]): GithubOrganizationListInterface;
}

export class GithubOrganizationList implements GithubOrganizationListInterface {
  organizations: GithubOrganizationInterface[];

  constructor({ organizations }: GithubOrganizationResponse) {
    this.organizations = organizations.map(organization => new GithubOrganization(organization));
  }

  search(search?: string | null) {
    if (!search) return this.organizations;

    return this.organizations.filter(org => org.name.toLowerCase().includes(search.toLowerCase()));
  }

  getInstalledOrganizations() {
    return this.organizations.filter(organization => organization.isInstalled());
  }

  getNotInstalledOrganizations() {
    return this.organizations.filter(organization => !organization.isInstalled());
  }

  addOrganization(organization: GithubOrganizationInterface) {
    if (!this.organizations.find(org => org.githubUserId === organization.githubUserId)) {
      this.organizations.push(organization);
    }

    return this;
  }

  addOrganizations(organizations: GithubOrganizationInterface[]) {
    organizations.forEach(organization => this.addOrganization(organization));
    return this;
  }
}
