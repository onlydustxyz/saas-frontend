import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type LeaderboardResponse = components["schemas"]["LeaderboardRowResponse"];

export interface LeaderboardInterface extends LeaderboardResponse {}

export class Leaderboard implements LeaderboardInterface {
  id!: LeaderboardResponse["id"];
  githubUserId!: LeaderboardResponse["githubUserId"];
  login!: LeaderboardResponse["login"];
  avatarUrl!: LeaderboardResponse["avatarUrl"];
  isRegistered!: LeaderboardResponse["isRegistered"];
  rank!: LeaderboardResponse["rank"];
  totalWorkScore!: LeaderboardResponse["totalWorkScore"];
  totalFidelityBonus!: LeaderboardResponse["totalFidelityBonus"];
  totalWorkScoreAffectedByProjectCoefficient!: LeaderboardResponse["totalWorkScoreAffectedByProjectCoefficient"];
  finalScore!: LeaderboardResponse["finalScore"];
  contributions!: LeaderboardResponse["contributions"];
  previousDayRank!: LeaderboardResponse["previousDayRank"];
  previousDayFinalScore!: LeaderboardResponse["previousDayFinalScore"];

  constructor(props: LeaderboardResponse) {
    Object.assign(this, props);
  }
}
