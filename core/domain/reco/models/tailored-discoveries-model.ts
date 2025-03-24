import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import {
  TailoredDiscoveriesIssue,
  TailoredDiscoveriesIssueInterface,
} from "../../issue/models/tailored-discovery-issue-model";
import {
  TailoredDiscoveriesProject,
  TailoredDiscoveriesProjectInterface,
} from "../../project/models/tailored-discoveries-project-model";

export type TailoredDiscoveriesResponse = components["schemas"]["TailoredDiscoveriesResponse"];

export interface TailoredDiscoveriesInterface extends TailoredDiscoveriesResponse {
  sections: TailoredDiscoveriesSectionInterface[];
}

export class TailoredDiscoveries implements TailoredDiscoveriesInterface {
  hasSufficientData!: TailoredDiscoveriesResponse["hasSufficientData"];
  sections!: TailoredDiscoveriesSectionInterface[];

  constructor(props: TailoredDiscoveriesResponse) {
    Object.assign(this, props);
    this.sections = this.sections.map(section => new TailoredDiscoveriesSection(section));
  }
}

export type TailoredDiscoveriesSectionResponse = components["schemas"]["TailoredDiscoveriesSectionResponse"];

export interface TailoredDiscoveriesSectionInterface extends TailoredDiscoveriesSectionResponse {
  projects: TailoredDiscoveriesProjectInterface[];
  issues: TailoredDiscoveriesIssueInterface[];
  getResourceType(): "project" | "issue";
  getProjects(): TailoredDiscoveriesProjectInterface[];
  getIssues(): TailoredDiscoveriesIssueInterface[];
}

class TailoredDiscoveriesSection implements TailoredDiscoveriesSectionInterface {
  title!: string;
  subtitle!: string;
  projects!: TailoredDiscoveriesProjectInterface[];
  issues!: TailoredDiscoveriesIssueInterface[];

  constructor(props: TailoredDiscoveriesSectionResponse) {
    Object.assign(this, props);
    this.projects = props.projects.map(project => new TailoredDiscoveriesProject(project));
    this.issues = props.issues.map(issue => new TailoredDiscoveriesIssue(issue));
  }

  private resourceTypeProject = "project" as const;
  private resourceTypeIssue = "issue" as const;

  getResourceType() {
    if (this.projects.length > 0) {
      return this.resourceTypeProject;
    }

    return this.resourceTypeIssue;
  }

  getProjects() {
    return this.getResourceType() === this.resourceTypeProject ? this.projects : [];
  }

  getIssues() {
    return this.getResourceType() === this.resourceTypeIssue ? this.issues : [];
  }
}
