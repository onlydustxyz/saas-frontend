import {
  EditProjectPortParams,
  EditProjectPortResponse,
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectBySlugPortParams,
  GetProjectBySlugPortResponse,
  GetProjectContributorLabelsPortParams,
  GetProjectContributorLabelsPortResponse,
  GetProjectFinancialDetailsByIdPortParams,
  GetProjectFinancialDetailsByIdPortResponse,
  GetProjectFinancialDetailsBySlugPortParams,
  GetProjectFinancialDetailsBySlugPortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
  GetProjectTransactionsCsvResponse,
  GetProjectTransactionsPortParams,
  GetProjectTransactionsPortResponse,
  GetProjectsPortParams,
  GetProjectsPortResponse,
  UnassignProjectContributionPortParams,
  UnassignProjectContributionPortResponse,
  UpdateProjectContributorLabelsPortParams,
  UpdateProjectContributorLabelsPortResponse,
  UploadProjectLogoPortParams,
  UploadProjectLogoPortResponse,
} from "@/core/domain/project/project-contract.types";

export interface ProjectStoragePort {
  routes: Record<string, string>;
  getProjectById(p: GetProjectByIdPortParams): GetProjectByIdPortResponse;
  getProjectStats(p: GetProjectStatsPortParams): GetProjectStatsPortResponse;
  getProjects(p: GetProjectsPortParams): GetProjectsPortResponse;
  editProject(p: EditProjectPortParams): EditProjectPortResponse;
  uploadProjectLogo(p: UploadProjectLogoPortParams): UploadProjectLogoPortResponse;
  getProjectFinancialDetailsBySlug(
    p: GetProjectFinancialDetailsBySlugPortParams
  ): GetProjectFinancialDetailsBySlugPortResponse;
  getProjectFinancialDetailsById(
    p: GetProjectFinancialDetailsByIdPortParams
  ): GetProjectFinancialDetailsByIdPortResponse;
  getProjectTransactions(p: GetProjectTransactionsPortParams): GetProjectTransactionsPortResponse;
  getProjectTransactionsCsv(p: GetProjectTransactionsPortParams): GetProjectTransactionsCsvResponse;
  getProjectBySlug(params: GetProjectBySlugPortParams): GetProjectBySlugPortResponse;
  getProjectContributorLabels(p: GetProjectContributorLabelsPortParams): GetProjectContributorLabelsPortResponse;
  updateProjectContributorLabels(
    p: UpdateProjectContributorLabelsPortParams
  ): UpdateProjectContributorLabelsPortResponse;
  unassignProjectContribution(p: UnassignProjectContributionPortParams): UnassignProjectContributionPortResponse;
}
