import {
  GetBiContributorActivityByIdPortParams,
  GetBiContributorActivityByIdPortResponse,
  GetBiContributorByIdPortParams,
  GetBiContributorByIdPortResponse,
  GetBiContributorsCsvPortResponse,
  GetBiContributorsPortParams,
  GetBiContributorsPortResponse,
  GetBiContributorsStatsPortParams,
  GetBiContributorsStatsPortResponse,
  GetBiProjectAcquisitionPortParams,
  GetBiProjectAcquisitionPortResponse,
  GetBiProjectVisitorsPortParams,
  GetBiProjectVisitorsPortResponse,
  GetBiProjectsCsvPortResponse,
  GetBiProjectsPortParams,
  GetBiProjectsPortResponse,
  GetBiProjectsStatsPortParams,
  GetBiProjectsStatsPortResponse,
  GetBiStatsFinancialsPortParams,
  GetBiStatsFinancialsPortResponse,
  GetBiWorldMapPortParams,
  GetBiWorldMapPortResponse,
} from "@/core/domain/bi/bi-contract.types";

export interface BiFacadePort {
  getBiContributorsStats(p: GetBiContributorsStatsPortParams): GetBiContributorsStatsPortResponse;
  getBiProjectsStats(p: GetBiProjectsStatsPortParams): GetBiProjectsStatsPortResponse;
  getBiWorldMap(p: GetBiWorldMapPortParams): GetBiWorldMapPortResponse;
  getBiProjects(p: GetBiProjectsPortParams): GetBiProjectsPortResponse;
  getBiProjectsCsv(p: GetBiProjectsPortParams): GetBiProjectsCsvPortResponse;
  getBiContributors(p: GetBiContributorsPortParams): GetBiContributorsPortResponse;
  getBiContributorsCsv(p: GetBiContributorsPortParams): GetBiContributorsCsvPortResponse;
  getBiStatsFinancials(p: GetBiStatsFinancialsPortParams): GetBiStatsFinancialsPortResponse;
  getBiContributorById(p: GetBiContributorByIdPortParams): GetBiContributorByIdPortResponse;
  getBiContributorActivityById(p: GetBiContributorActivityByIdPortParams): GetBiContributorActivityByIdPortResponse;
  getBiProjectVisitors(p: GetBiProjectVisitorsPortParams): GetBiProjectVisitorsPortResponse;
  getBiProjectAcquisition(p: GetBiProjectAcquisitionPortParams): GetBiProjectAcquisitionPortResponse;
}
