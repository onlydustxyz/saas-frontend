import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type IssueResponse = components["schemas"]["GithubIssueResponse"];

export interface IssueInterface extends IssueResponse {}

export class Issue implements IssueInterface {
  applicants!: IssueResponse["applicants"];
  assignees!: IssueResponse["assignees"];
  author!: IssueResponse["author"];
  body!: IssueResponse["body"];
  closedAt!: IssueResponse["closedAt"];
  commentCount!: IssueResponse["commentCount"];
  createdAt!: IssueResponse["createdAt"];
  githubAppInstallationPermissionsUpdateUrl!: IssueResponse["githubAppInstallationPermissionsUpdateUrl"];
  githubAppInstallationStatus!: IssueResponse["githubAppInstallationStatus"];
  htmlUrl!: IssueResponse["htmlUrl"];
  id!: IssueResponse["id"];
  labels!: IssueResponse["labels"];
  languages!: IssueResponse["languages"];
  number!: IssueResponse["number"];
  repo!: IssueResponse["repo"];
  status!: IssueResponse["status"];
  title!: IssueResponse["title"];

  constructor(props: IssueResponse) {
    Object.assign(this, props);
  }
}
