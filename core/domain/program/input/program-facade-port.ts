import {
  GetProgramByIdPortParams,
  GetProgramByIdPortResponse,
  GetProgramProjectsPortParams,
  GetProgramProjectsPortResponse,
  GetProgramTransactionsCsvPortResponse,
  GetProgramTransactionsPortParams,
  GetProgramTransactionsPortResponse,
  GetProgramTransactionsStatsPortParams,
  GetProgramTransactionsStatsPortResponse,
  GetProgramsPortParams,
  GetProgramsPortResponse,
  GrantBudgetToProjectPortParams,
  GrantBudgetToProjectPortResponse,
} from "../program-contract.types";

export interface ProgramFacadePort {
  getPrograms(p: GetProgramsPortParams): GetProgramsPortResponse;
  getProgramById(p: GetProgramByIdPortParams): GetProgramByIdPortResponse;
  getProgramTransactions(p: GetProgramTransactionsPortParams): GetProgramTransactionsPortResponse;
  getProgramTransactionsCsv(p: GetProgramTransactionsPortParams): GetProgramTransactionsCsvPortResponse;
  getProgramTransactionsStats(p: GetProgramTransactionsStatsPortParams): GetProgramTransactionsStatsPortResponse;
  getProgramProjects(p: GetProgramProjectsPortParams): GetProgramProjectsPortResponse;
  grantBudgetToProject(p: GrantBudgetToProjectPortParams): GrantBudgetToProjectPortResponse;
}
