import {
  CreateProjectPortParams,
  CreateProjectPortResponse,
  EditProjectPortParams,
  EditProjectPortResponse,
  GetProjectAcquisitionTipPortParams,
  GetProjectAcquisitionTipPortResponse,
  GetProjectActivityPortParams,
  GetProjectActivityPortResponse,
  GetProjectAvailableIssuesPortParams,
  GetProjectAvailableIssuesPortResponse,
  GetProjectByIdPortParams,
  GetProjectByIdPortResponse,
  GetProjectBySlugOrIdV2PortParams,
  GetProjectBySlugOrIdV2PortResponse,
  GetProjectBySlugPortParams,
  GetProjectBySlugPortResponse,
  GetProjectContributorLabelsPortParams,
  GetProjectContributorLabelsPortResponse,
  GetProjectContributorsV2PortParams,
  GetProjectContributorsV2PortResponse,
  GetProjectFinancialDetailsByIdPortParams,
  GetProjectFinancialDetailsByIdPortResponse,
  GetProjectFinancialDetailsBySlugPortParams,
  GetProjectFinancialDetailsBySlugPortResponse,
  GetProjectGoodFirstIssuesPortParams,
  GetProjectGoodFirstIssuesPortResponse,
  GetProjectProgramsPortParams,
  GetProjectProgramsPortResponse,
  GetProjectRewardsV2PortParams,
  GetProjectRewardsV2PortResponse,
  GetProjectStatsPortParams,
  GetProjectStatsPortResponse,
  GetProjectTransactionsCsvPortResponse,
  GetProjectTransactionsPortParams,
  GetProjectTransactionsPortResponse,
  GetProjectsV2PortParams,
  GetProjectsV2PortResponse,
  GetSimilarProjectsLeaderboardPortParams,
  GetSimilarProjectsLeaderboardPortResponse,
  GetSimilarProjectsPortParams,
  GetSimilarProjectsPortResponse,
  ProjectIssueComposerComposePortParams,
  ProjectIssueComposerComposePortResponse,
  ProjectIssueComposerSubmitPortParams,
  ProjectIssueComposerSubmitPortResponse,
  ProjectIssueComposerUpdatePortParams,
  ProjectIssueComposerUpdatePortResponse,
  UnassignContributorFromProjectContributionPortParams,
  UnassignContributorFromProjectContributionPortResponse,
  UngrantFundsFromProjectPortParams,
  UngrantFundsFromProjectPortResponse,
  UpdateProjectContributorLabelsPortParams,
  UpdateProjectContributorLabelsPortResponse,
  UploadProjectLogoPortParams,
  UploadProjectLogoPortResponse,
} from "@/core/domain/project/project-contract.types";

export interface ProjectStoragePort {
  routes: Record<string, string>;
  getProjectById(p: GetProjectByIdPortParams): GetProjectByIdPortResponse;
  getProjectStats(p: GetProjectStatsPortParams): GetProjectStatsPortResponse;
  createProject(p: CreateProjectPortParams): CreateProjectPortResponse;
  editProject(p: EditProjectPortParams): EditProjectPortResponse;
  uploadProjectLogo(p: UploadProjectLogoPortParams): UploadProjectLogoPortResponse;
  getProjectFinancialDetailsBySlug(
    p: GetProjectFinancialDetailsBySlugPortParams
  ): GetProjectFinancialDetailsBySlugPortResponse;
  getProjectFinancialDetailsById(
    p: GetProjectFinancialDetailsByIdPortParams
  ): GetProjectFinancialDetailsByIdPortResponse;
  getProjectTransactions(p: GetProjectTransactionsPortParams): GetProjectTransactionsPortResponse;
  getProjectTransactionsCsv(p: GetProjectTransactionsPortParams): GetProjectTransactionsCsvPortResponse;
  getProjectBySlug(params: GetProjectBySlugPortParams): GetProjectBySlugPortResponse;
  getProjectContributorLabels(p: GetProjectContributorLabelsPortParams): GetProjectContributorLabelsPortResponse;
  updateProjectContributorLabels(
    p: UpdateProjectContributorLabelsPortParams
  ): UpdateProjectContributorLabelsPortResponse;
  unassignContributorFromProjectContribution(
    p: UnassignContributorFromProjectContributionPortParams
  ): UnassignContributorFromProjectContributionPortResponse;
  getProjectPrograms(p: GetProjectProgramsPortParams): GetProjectProgramsPortResponse;
  ungrantProject(p: UngrantFundsFromProjectPortParams): UngrantFundsFromProjectPortResponse;
  getProjectsV2(p: GetProjectsV2PortParams): GetProjectsV2PortResponse;
  getProjectBySlugOrIdV2(p: GetProjectBySlugOrIdV2PortParams): GetProjectBySlugOrIdV2PortResponse;
  getProjectAvailableIssues(p: GetProjectAvailableIssuesPortParams): GetProjectAvailableIssuesPortResponse;
  getProjectGoodFirstIssues(p: GetProjectGoodFirstIssuesPortParams): GetProjectGoodFirstIssuesPortResponse;
  getProjectContributorsV2(p: GetProjectContributorsV2PortParams): GetProjectContributorsV2PortResponse;
  getProjectRewardsV2(p: GetProjectRewardsV2PortParams): GetProjectRewardsV2PortResponse;
  getSimilarProjects(p: GetSimilarProjectsPortParams): GetSimilarProjectsPortResponse;
  getProjectActivity(p: GetProjectActivityPortParams): GetProjectActivityPortResponse;
  getProjectAcquisitionTip(p: GetProjectAcquisitionTipPortParams): GetProjectAcquisitionTipPortResponse;
  getSimilarProjectsLeaderboard(p: GetSimilarProjectsLeaderboardPortParams): GetSimilarProjectsLeaderboardPortResponse;
  projectIssueComposerCompose(p: ProjectIssueComposerComposePortParams): ProjectIssueComposerComposePortResponse;
  projectIssueComposerSubmit(p: ProjectIssueComposerSubmitPortParams): ProjectIssueComposerSubmitPortResponse;
  projectIssueComposerUpdate(p: ProjectIssueComposerUpdatePortParams): ProjectIssueComposerUpdatePortResponse;
}
