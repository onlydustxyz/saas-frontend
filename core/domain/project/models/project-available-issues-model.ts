import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectAvailableIssuesResponse = components["schemas"]["GithubIssuePageItemResponse"];

export interface ProjectAvailableIssuesInterface extends ProjectAvailableIssuesResponse {}

export class ProjectAvailableIssues implements ProjectAvailableIssuesInterface {
  id!: ProjectAvailableIssuesResponse["id"];
  title!: ProjectAvailableIssuesResponse["title"];
  number!: ProjectAvailableIssuesResponse["number"];
  status!: ProjectAvailableIssuesResponse["status"];
  htmlUrl!: ProjectAvailableIssuesResponse["htmlUrl"];
  repo!: ProjectAvailableIssuesResponse["repo"];
  author!: ProjectAvailableIssuesResponse["author"];
  createdAt!: ProjectAvailableIssuesResponse["createdAt"];
  closedAt!: ProjectAvailableIssuesResponse["closedAt"];
  labels!: ProjectAvailableIssuesResponse["labels"];
  applicants!: ProjectAvailableIssuesResponse["applicants"];
  assignees!: ProjectAvailableIssuesResponse["assignees"];
  commentCount!: ProjectAvailableIssuesResponse["commentCount"];

  constructor(props: ProjectAvailableIssuesResponse) {
    Object.assign(this, props);
  }
}
