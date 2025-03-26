import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class ProjectClientAdapterMock implements ProjectStoragePort {
  constructor() {}

  routes = {};

  getProjectById = mockHttpStorageResponse<ProjectStoragePort["getProjectById"]>;

  getProjectStats = mockHttpStorageResponse<ProjectStoragePort["getProjectStats"]>;

  createProject = mockHttpStorageResponse<ProjectStoragePort["createProject"]>;

  editProject = mockHttpStorageResponse<ProjectStoragePort["editProject"]>;

  getProjectFinancialDetailsBySlug = mockHttpStorageResponse<ProjectStoragePort["getProjectFinancialDetailsBySlug"]>;

  getProjectFinancialDetailsById = mockHttpStorageResponse<ProjectStoragePort["getProjectFinancialDetailsById"]>;

  getProjectTransactions = mockHttpStorageResponse<ProjectStoragePort["getProjectTransactions"]>;

  getProjectTransactionsCsv = mockHttpStorageResponse<ProjectStoragePort["getProjectTransactionsCsv"]>;

  getProjectBySlug = mockHttpStorageResponse<ProjectStoragePort["getProjectBySlug"]>;

  uploadProjectLogo = mockHttpStorageResponse<ProjectStoragePort["uploadProjectLogo"]>;

  getProjectContributorLabels = mockHttpStorageResponse<ProjectStoragePort["getProjectContributorLabels"]>;

  updateProjectContributorLabels = mockHttpStorageResponse<ProjectStoragePort["updateProjectContributorLabels"]>;

  unassignContributorFromProjectContribution = mockHttpStorageResponse<
    ProjectStoragePort["unassignContributorFromProjectContribution"]
  >;

  getProjectPrograms = mockHttpStorageResponse<ProjectStoragePort["getProjectPrograms"]>;

  ungrantProject = mockHttpStorageResponse<ProjectStoragePort["ungrantProject"]>;

  getProjectsV2 = mockHttpStorageResponse<ProjectStoragePort["getProjectsV2"]>;

  getProjectBySlugOrIdV2 = mockHttpStorageResponse<ProjectStoragePort["getProjectBySlugOrIdV2"]>;

  getProjectAvailableIssues = mockHttpStorageResponse<ProjectStoragePort["getProjectAvailableIssues"]>;

  getProjectGoodFirstIssues = mockHttpStorageResponse<ProjectStoragePort["getProjectGoodFirstIssues"]>;

  getProjectContributorsV2 = mockHttpStorageResponse<ProjectStoragePort["getProjectContributorsV2"]>;

  getProjectRewardsV2 = mockHttpStorageResponse<ProjectStoragePort["getProjectRewardsV2"]>;

  getSimilarProjects = mockHttpStorageResponse<ProjectStoragePort["getSimilarProjects"]>;

  getProjectActivity = mockHttpStorageResponse<ProjectStoragePort["getProjectActivity"]>;

  getProjectAcquisitionTip = mockHttpStorageResponse<ProjectStoragePort["getProjectAcquisitionTip"]>;

  getSimilarProjectsLeaderboard = mockHttpStorageResponse<ProjectStoragePort["getSimilarProjectsLeaderboard"]>;

  projectIssueComposerCompose = mockHttpStorageResponse<ProjectStoragePort["projectIssueComposerCompose"]>;

  projectIssueComposerSubmit = mockHttpStorageResponse<ProjectStoragePort["projectIssueComposerSubmit"]>;

  projectIssueComposerUpdate = mockHttpStorageResponse<ProjectStoragePort["projectIssueComposerUpdate"]>;
}
