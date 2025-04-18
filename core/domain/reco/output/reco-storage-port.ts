import {
  GetMatchingQuestionsPortParams,
  GetMatchingQuestionsPortResponse,
  GetRecommendedProjectsPortParams,
  GetRecommendedProjectsPortResponse,
  GetTailoredDiscoveriesPortParams,
  GetTailoredDiscoveriesPortResponse,
  SaveMatchingQuestionsPortParams,
  SaveMatchingQuestionsPortResponse,
} from "../reco-contract.types";

export interface RecoStoragePort {
  getMatchingQuestions(p: GetMatchingQuestionsPortParams): GetMatchingQuestionsPortResponse;
  saveMatchingQuestions(p: SaveMatchingQuestionsPortParams): SaveMatchingQuestionsPortResponse;
  getRecommendedProjects(p: GetRecommendedProjectsPortParams): GetRecommendedProjectsPortResponse;
  getTailoredDiscoveries(p: GetTailoredDiscoveriesPortParams): GetTailoredDiscoveriesPortResponse;
}
