import { ProjectContributorLabelsInterface } from "@/core/domain/project/models/project-contributor-labels-model";
import { ProjectFinancialInterface } from "@/core/domain/project/models/project-financial-model";
import { ProjectGoodFirstIssuesInterface } from "@/core/domain/project/models/project-good-first-issues-model";
import { ProjectListItemInterface } from "@/core/domain/project/models/project-list-item-model";
import { ProjectInterface } from "@/core/domain/project/models/project-model";
import { ProjectProgramListItemInterface } from "@/core/domain/project/models/project-program-list-item";
import { ProjectTransactionInterface } from "@/core/domain/project/models/project-transaction-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { GithubLabelWithCountInterface } from "../github/models/github-label-model";
import { ProjectAvailableIssuesInterface } from "./models/project-available-issues-model";
import { ProjectContributorsInterfaceV2 } from "./models/project-contributors-model-v2";
import { ProjectLinkV2 } from "./models/project-link-v2";
import { ProjectListItemInterfaceV2 } from "./models/project-list-item-model-v2";
import { ProjectInterfaceV2 } from "./models/project-model-v2";
import { ProjectRankedListItemInterface } from "./models/project-ranked-list-item-model";
import { ProjectRewardsInterfaceV2 } from "./models/project-rewards-model-v2";

type GetProjectResponse = components["schemas"]["ProjectResponse"];

/* ------------------------------ Get Project By Id ------------------------------ */
export type GetProjectByIdResponse = components["schemas"]["ProjectResponse"];

export type GetProjectByIdPortResponse = HttpStorageResponse<ProjectInterface>;

type GetProjectByIdQueryParams = operations["getProject"]["parameters"]["query"];
type GetProjectByIdPathParams = operations["getProject"]["parameters"]["path"];

export type GetProjectByIdPortParams = HttpClientParameters<{
  QueryParams: GetProjectByIdQueryParams;
  PathParams: GetProjectByIdPathParams;
}>;

/* ------------------------------ Get Project Stats ------------------------------ */
export type GetProjectStatsResponse = components["schemas"]["ProjectStatsResponse"];

export type GetProjectStatsPortResponse = HttpStorageResponse<GetProjectStatsResponse>;

type GetProjectStatsQueryParams = operations["getProjectStats"]["parameters"]["query"];
type GetProjectStatsPathParams = operations["getProjectStats"]["parameters"]["path"];

export type GetProjectStatsPortParams = HttpClientParameters<{
  QueryParams: GetProjectStatsQueryParams;
  PathParams: GetProjectStatsPathParams;
}>;

/* ------------------------------ Get Projects ------------------------------ */
export type GetProjectsResponse = components["schemas"]["ProjectPageResponse"];
export type GetProjectsModel = Omit<GetProjectsResponse, "projects"> & {
  projects: ProjectListItemInterface[];
};

type GetProjectsQueryParams = operations["getProjects"]["parameters"]["query"];

export type GetProjectsPortResponse = HttpStorageResponse<GetProjectsModel>;

export type GetProjectsPortParams = HttpClientParameters<{ QueryParams: GetProjectsQueryParams }>;

/* --------------------- Upload project logo --------------------- */

export type UploadProjectLogoResponse = components["schemas"]["UploadImageResponse"];

export type UploadProjectLogoPortParams = HttpClientParameters<object>;

export type UploadProjectLogoPortResponse = HttpStorageResponse<UploadProjectLogoResponse, File>;

/* --------------------- Create Project --------------------- */

export type CreateProjectBody = components["schemas"]["CreateProjectRequest"];

export type CreateProjectResponse = components["schemas"]["CreateProjectResponse"];

type CreateProjectPathParams = operations["createProject"]["parameters"]["path"];

export type CreateProjectPortParams = HttpClientParameters<{
  PathParams: CreateProjectPathParams;
}>;

export type CreateProjectPortResponse = HttpStorageResponse<CreateProjectResponse>;

/* --------------------- Edit Project --------------------- */

export type EditProjectBody = components["schemas"]["UpdateProjectRequest"];

type EditProjectPathParams = operations["updateProject"]["parameters"]["path"];

export type EditProjectPortParams = HttpClientParameters<{
  PathParams: EditProjectPathParams;
}>;

export type EditProjectPortResponse = HttpStorageResponse;

/* ------------------------------ Get Project Financial Details By Slug ------------------------------ */
export type GetProjectFinancialDetailsBySlugResponse = components["schemas"]["ProjectFinancialResponse"];

export type GetProjectFinancialDetailsBySlugPortResponse = HttpStorageResponse<ProjectFinancialInterface>;

type GetProjectFinancialDetailsBySlugPathParams = operations["getProjectFinancialDetailsBySlug"]["parameters"]["path"];

export type GetProjectFinancialDetailsBySlugPortParams = HttpClientParameters<{
  PathParams: GetProjectFinancialDetailsBySlugPathParams;
}>;

/* ------------------------------ Get Project Financial Details By Id ------------------------------ */
export type GetProjectFinancialDetailsByIdResponse = components["schemas"]["ProjectFinancialResponse"];

export type GetProjectFinancialDetailsByIdPortResponse = HttpStorageResponse<ProjectFinancialInterface>;

type GetProjectFinancialDetailsByIdPathParams = operations["getProjectFinancialDetails"]["parameters"]["path"];

export type GetProjectFinancialDetailsByIdPortParams = HttpClientParameters<{
  PathParams: GetProjectFinancialDetailsByIdPathParams;
}>;

/* ------------------------------ Get Project Transactions ------------------------------ */

export type GetProjectTransactionsResponse = components["schemas"]["ProjectTransactionPageResponse"];

export type GetProjectTransactionsModel = Omit<GetProjectTransactionsResponse, "transactions"> & {
  transactions: ProjectTransactionInterface[];
};

type GetProjectTransactionsPathParams = operations["getProjectTransactions_1"]["parameters"]["path"];
type GetProjectTransactionsQueryParams = operations["getProjectTransactions_1"]["parameters"]["query"];

export type GetProjectTransactionsPortResponse = HttpStorageResponse<GetProjectTransactionsModel>;

export type GetProjectTransactionsPortParams = HttpClientParameters<{
  QueryParams: GetProjectTransactionsQueryParams;
  PathParams: GetProjectTransactionsPathParams;
}>;

/* ------------------------------ Get Project Transactions CSV ------------------------------ */

export type GetProjectTransactionsCsvPortResponse = HttpStorageResponse<Blob>;

/* --------------------------------- Get project by slug -------------------------------- */

type GetProjectBySlugPathParams = operations["getProjectBySlug"]["parameters"]["path"];
type GetProjectBySlugQueryParams = operations["getProjectBySlug"]["parameters"]["query"];

export type GetProjectBySlugResponse = GetProjectResponse;

export type GetProjectBySlugPortResponse = HttpStorageResponse<ProjectInterface>;

export type GetProjectBySlugPortParams = HttpClientParameters<{
  PathParams: GetProjectBySlugPathParams;
  QueryParams: GetProjectBySlugQueryParams;
}>;

/* ------------------------------ Get Project Contributor labels ------------------------------ */

export type GetProjectContributorLabelsResponse = components["schemas"]["ProjectContributorLabelListResponse"];
export type GetProjectContributorLabelsModel = Omit<GetProjectContributorLabelsResponse, "labels"> & {
  labels: ProjectContributorLabelsInterface[];
};

type GetProjectContributorLabelsPathParams = operations["getProjectContributorLabels"]["parameters"]["path"];
type GetProjectContributorLabelsQueryParams = operations["getProjectContributorLabels"]["parameters"]["query"];

export type GetProjectContributorLabelsPortParams = HttpClientParameters<{
  PathParams: GetProjectContributorLabelsPathParams;
  QueryParams: GetProjectContributorLabelsQueryParams;
}>;

export type GetProjectContributorLabelsPortResponse = HttpStorageResponse<GetProjectContributorLabelsModel>;

/* --------------------- Update Project Contributor labels --------------------- */

export type UpdateProjectContributorLabelsBody = components["schemas"]["ContributorsLabelsRequest"];

type UpdateProjectContributorLabelsPathParams = operations["updateContributorsLabels"]["parameters"]["path"];

export type UpdateProjectContributorLabelsPortParams = HttpClientParameters<{
  PathParams: UpdateProjectContributorLabelsPathParams;
}>;

export type UpdateProjectContributorLabelsPortResponse = HttpStorageResponse;

/* ---------------------------- Unassign contribution --------------------------- */

type UnassignContributorFromProjectContributionPathParams = operations["unassignContributionV2"]["parameters"]["path"];

export type UnassignContributorFromProjectContributionPortParams = HttpClientParameters<{
  PathParams: UnassignContributorFromProjectContributionPathParams;
}>;

export type UnassignContributorFromProjectContributionPortResponse = HttpStorageResponse;

/* ------------------------------ Get Project Programs ------------------------------ */

export type GetProjectProgramsResponse = components["schemas"]["ProjectProgramPageResponse"];
export type GetProjectProgramsModel = Omit<GetProjectProgramsResponse, "programs"> & {
  programs: ProjectProgramListItemInterface[];
};

type GetProjectProgramsPathParams = operations["getProjectPrograms"]["parameters"]["path"];
type GetProjectProgramsQueryParams = operations["getProjectPrograms"]["parameters"]["query"];

export type GetProjectProgramsPortParams = HttpClientParameters<{
  PathParams: GetProjectProgramsPathParams;
  QueryParams: GetProjectProgramsQueryParams;
}>;

export type GetProjectProgramsPortResponse = HttpStorageResponse<GetProjectProgramsModel>;

/* ---------------------------- Ungrant project --------------------------- */

export type UngrantFundsFromProjectBody = components["schemas"]["UngrantRequest"];

type UngrantFundsFromProjectPathParams = operations["ungrantFundsFromProject"]["parameters"]["path"];

export type UngrantFundsFromProjectPortParams = HttpClientParameters<{
  PathParams: UngrantFundsFromProjectPathParams;
}>;

export type UngrantFundsFromProjectPortResponse = HttpStorageResponse;

/* ------------------------------ Get Projects V2 ------------------------------ */

export type GetProjectsV2Response = components["schemas"]["ProjectPageResponseV2"];

export type GetProjectsV2Model = Omit<GetProjectsV2Response, "projects"> & {
  projects: ProjectListItemInterfaceV2[];
};

export type GetProjectsV2QueryParams = operations["getProjectsV2"]["parameters"]["query"];

export type GetProjectsV2PortResponse = HttpStorageResponse<GetProjectsV2Model>;

export type GetProjectsV2PortParams = HttpClientParameters<{ QueryParams: GetProjectsV2QueryParams }>;

/* ------------------------------ Get Project By Slug or ID V2 ------------------------------ */

export type GetProjectBySlugOrIdV2Response = components["schemas"]["ProjectResponseV2"];

export type GetProjectBySlugOrIdV2PortResponse = HttpStorageResponse<ProjectInterfaceV2>;

type GetProjectBySlugOrIdV2PathParams = operations["getProjectV2"]["parameters"]["path"];
type GetProjectBySlugOrIdV2QueryParams = operations["getProjectV2"]["parameters"]["query"];

export type GetProjectBySlugOrIdV2PortParams = HttpClientParameters<{
  QueryParams: GetProjectBySlugOrIdV2QueryParams;
  PathParams: GetProjectBySlugOrIdV2PathParams;
}>;

/* ------------------------------ Get Project Available Issuers ------------------------------ */

export type GetProjectAvailableIssuesResponse = components["schemas"]["GithubIssuePageWithLabelsResponse"];

export type GetProjectAvailableIssuesModel = Omit<GetProjectAvailableIssuesResponse, "issues" | "labels"> & {
  issues: ProjectAvailableIssuesInterface[];
  labels: GithubLabelWithCountInterface[];
};

type GetProjectAvailableIssuesPathParams = operations["getProjectAvailableIssues"]["parameters"]["path"];
export type GetProjectAvailableIssuesQueryParams = operations["getProjectAvailableIssues"]["parameters"]["query"];

export type GetProjectAvailableIssuesPortResponse = HttpStorageResponse<GetProjectAvailableIssuesModel>;

export type GetProjectAvailableIssuesPortParams = HttpClientParameters<{
  QueryParams: GetProjectAvailableIssuesQueryParams;
  PathParams: GetProjectAvailableIssuesPathParams;
}>;

/* ------------------------------ Get Project Good First Issues ------------------------------ */

export type GetProjectGoodFirstIssuesResponse = components["schemas"]["GithubIssuePageResponse"];

export type GetProjectGoodFirstIssuesModel = Omit<GetProjectGoodFirstIssuesResponse, "issues"> & {
  issues: ProjectGoodFirstIssuesInterface[];
};

type GetProjectGoodFirstIssuesPathParams = operations["getProjectGoodFirstIssues"]["parameters"]["path"];
type GetProjectGoodFirstIssuesQueryParams = operations["getProjectGoodFirstIssues"]["parameters"]["query"];

export type GetProjectGoodFirstIssuesPortResponse = HttpStorageResponse<GetProjectGoodFirstIssuesModel>;

export type GetProjectGoodFirstIssuesPortParams = HttpClientParameters<{
  QueryParams: GetProjectGoodFirstIssuesQueryParams;
  PathParams: GetProjectGoodFirstIssuesPathParams;
}>;

/* ------------------------------ Get Project contributors V2 ------------------------------ */

export type GetProjectContributorsV2Response = components["schemas"]["ContributorsPageResponseV2"];

export type GetProjectContributorsV2Model = Omit<GetProjectContributorsV2Response, "contributors"> & {
  contributors: ProjectContributorsInterfaceV2[];
};

type GetProjectContributorsV2PathParams = operations["getProjectContributorsV2"]["parameters"]["path"];
export type GetProjectContributorsV2QueryParams = operations["getProjectContributorsV2"]["parameters"]["query"];

export type GetProjectContributorsV2PortResponse = HttpStorageResponse<GetProjectContributorsV2Model>;

export type GetProjectContributorsV2PortParams = HttpClientParameters<{
  QueryParams: GetProjectContributorsV2QueryParams;
  PathParams: GetProjectContributorsV2PathParams;
}>;

/* ------------------------------ Get Project rewards V2 ------------------------------ */

export type GetProjectRewardsV2Response = components["schemas"]["RewardsPageResponseV2"];

export type GetProjectRewardsV2Model = Omit<GetProjectRewardsV2Response, "rewards"> & {
  rewards: ProjectRewardsInterfaceV2[];
};

type GetProjectRewardsV2PathParams = operations["getProjectRewardsV2"]["parameters"]["path"];
type GetProjectRewardsV2QueryParams = operations["getProjectRewardsV2"]["parameters"]["query"];

export type GetProjectRewardsV2PortResponse = HttpStorageResponse<GetProjectRewardsV2Model>;

export type GetProjectRewardsV2PortParams = HttpClientParameters<{
  QueryParams: GetProjectRewardsV2QueryParams;
  PathParams: GetProjectRewardsV2PathParams;
}>;

/* ------------------------------ Get Similar Projects ------------------------------ */

export type GetSimilarProjectsResponse = components["schemas"]["ProjectPageResponseV2"];

export type GetSimilarProjectsModel = Omit<GetSimilarProjectsResponse, "projects"> & {
  projects: ProjectLinkV2[];
};

type GetSimilarProjectsPathParams = operations["getSimilarProjects"]["parameters"]["path"];
type GetSimilarProjectsQueryParams = operations["getSimilarProjects"]["parameters"]["query"];

export type GetSimilarProjectsPortResponse = HttpStorageResponse<GetSimilarProjectsModel>;

export type GetSimilarProjectsPortParams = HttpClientParameters<{
  QueryParams: GetSimilarProjectsQueryParams;
  PathParams: GetSimilarProjectsPathParams;
}>;

/* ------------------------------ Get Project Activity ------------------------------ */

export type GetProjectActivityResponse = components["schemas"]["ContributorActivityGraphResponse"];

type GetProjectActivityPathParams = operations["getProjectActivityGraph"]["parameters"]["path"];
type GetProjectActivityQueryParams = operations["getProjectActivityGraph"]["parameters"]["query"];

export type GetProjectActivityPortResponse = HttpStorageResponse<GetProjectActivityResponse>;

export type GetProjectActivityPortParams = HttpClientParameters<{
  QueryParams: GetProjectActivityQueryParams;
  PathParams: GetProjectActivityPathParams;
}>;

/* ------------------------------ Get Project Acquisition tip ------------------------------ */

export type GetProjectAcquisitionTipResponse = components["schemas"]["ProjectAcquisitionTipResponse"];

type GetProjectAcquisitionTipPathParams = operations["getAcquisitionTip"]["parameters"]["path"];

export type GetProjectAcquisitionTipPortResponse = HttpStorageResponse<GetProjectAcquisitionTipResponse>;

export type GetProjectAcquisitionTipPortParams = HttpClientParameters<{
  PathParams: GetProjectAcquisitionTipPathParams;
}>;

/* ------------------------------ Get Similar Projects leaderboard ------------------------------ */

export type GetSimilarProjectsLeaderboardResponse = components["schemas"]["RankedProjectListResponse"];

export type GetSimilarProjectsLeaderboardModel = Omit<GetSimilarProjectsLeaderboardResponse, "projects"> & {
  projects: ProjectRankedListItemInterface[];
};

type GetSimilarProjectsLeaderboardPathParams = operations["getSimilarProjectsV2"]["parameters"]["path"];

export type GetSimilarProjectsLeaderboardPortResponse = HttpStorageResponse<GetSimilarProjectsLeaderboardModel>;

export type GetSimilarProjectsLeaderboardPortParams = HttpClientParameters<{
  PathParams: GetSimilarProjectsLeaderboardPathParams;
}>;

/* ------------------------- ISSUE COMPOSER COMPOSE ------------------------- */

export type ProjectIssueComposerComposeResponse = components["schemas"]["IssueComposeResponse"];
export type ProjectIssueComposerComposeBody = components["schemas"]["IssueComposeRequest"];

type ProjectIssueComposerComposePathParams = operations["composeIssue"]["parameters"]["path"];

export type ProjectIssueComposerComposePortParams = HttpClientParameters<{
  PathParams: ProjectIssueComposerComposePathParams;
}>;

export type ProjectIssueComposerComposePortResponse = HttpStorageResponse<ProjectIssueComposerComposeResponse>;

/* ------------------------- ISSUE COMPOSER SUBMIT ------------------------- */

export type ProjectIssueComposerSubmitBody = components["schemas"]["SubmitIssueRequest"];

type ProjectIssueComposerSubmitPathParams = operations["submitIssue"]["parameters"]["path"];

export type ProjectIssueComposerSubmitPortParams = HttpClientParameters<{
  PathParams: ProjectIssueComposerSubmitPathParams;
}>;

export type ProjectIssueComposerSubmitPortResponse = HttpStorageResponse;

/* ------------------------- ISSUE COMPOSER COMPOSE ------------------------- */

export type ProjectIssueComposerUpdateResponse = components["schemas"]["IssueComposeResponse"];
export type ProjectIssueComposerUpdateBody = components["schemas"]["IssueComposeAdditionalInfoRequest"];

type ProjectIssueComposerUpdatePathParams = operations["continueComposeIssue"]["parameters"]["path"];

export type ProjectIssueComposerUpdatePortParams = HttpClientParameters<{
  PathParams: ProjectIssueComposerUpdatePathParams;
}>;

export type ProjectIssueComposerUpdatePortResponse = HttpStorageResponse<ProjectIssueComposerUpdateResponse>;
