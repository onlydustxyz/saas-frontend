import { ProjectContributorLabelsInterface } from "@/core/domain/project/models/project-contributor-labels-model";
import { ProjectFinancialInterface } from "@/core/domain/project/models/project-financial-model";
import { ProjectListItemInterface } from "@/core/domain/project/models/project-list-item-model";
import { ProjectInterface } from "@/core/domain/project/models/project-model";
import { ProjectTransactionInterface } from "@/core/domain/project/models/project-transaction-model";
import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

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

export type GetProjectTransactionsPortResponse = HttpStorageResponse<GetProjectTransactionsResponse>;

type GetProjectTransactionsQueryParams = operations["getProjectTransactions_1"]["parameters"]["query"];
type GetProjectTransactionsPathParams = operations["getProjectTransactions_1"]["parameters"]["path"];

export type GetProjectTransactionsPortParams = HttpClientParameters<{
  QueryParams: GetProjectTransactionsQueryParams;
  PathParams: GetProjectTransactionsPathParams;
}>;

/* ------------------------------ Get Project Transactions CSV ------------------------------ */

export type GetProjectTransactionsCsvResponse = HttpStorageResponse<Blob>;

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

/* ---------------------- Unassign Project Contribution --------------------- */

type UnassignProjectContributionPathParams = operations["unassignContribution"]["parameters"]["path"];

export type UnassignProjectContributionPortParams = HttpClientParameters<{
  PathParams: UnassignProjectContributionPathParams;
}>;

export type UnassignProjectContributionPortResponse = HttpStorageResponse;
