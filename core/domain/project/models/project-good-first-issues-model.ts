import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectGoodFirstIssuesResponse = components["schemas"]["GithubIssuePageItemResponse"];

export interface ProjectGoodFirstIssuesInterface extends ProjectGoodFirstIssuesResponse {}

export class ProjectGoodFirstIssues implements ProjectGoodFirstIssuesInterface {
  id!: ProjectGoodFirstIssuesResponse["id"];
  title!: ProjectGoodFirstIssuesResponse["title"];
  number!: ProjectGoodFirstIssuesResponse["number"];
  status!: ProjectGoodFirstIssuesResponse["status"];
  htmlUrl!: ProjectGoodFirstIssuesResponse["htmlUrl"];
  repo!: ProjectGoodFirstIssuesResponse["repo"];
  author!: ProjectGoodFirstIssuesResponse["author"];
  createdAt!: ProjectGoodFirstIssuesResponse["createdAt"];
  closedAt!: ProjectGoodFirstIssuesResponse["closedAt"];
  labels!: ProjectGoodFirstIssuesResponse["labels"];
  applicants!: ProjectGoodFirstIssuesResponse["applicants"];
  assignees!: ProjectGoodFirstIssuesResponse["assignees"];
  commentCount!: ProjectGoodFirstIssuesResponse["commentCount"];

  constructor(props: ProjectGoodFirstIssuesResponse) {
    Object.assign(this, props);
  }
}
