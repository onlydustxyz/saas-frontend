import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributorStatsResponse = components["schemas"]["ContributorStatsResponse"];

export interface ContributorStatsInterface extends ContributorStatsResponse {}

export class ContributorStats implements ContributorStatsInterface {
  longestStreak!: ContributorStatsResponse["longestStreak"];
  longestGap!: ContributorStatsResponse["longestGap"];
  busiestWeek!: ContributorStatsResponse["busiestWeek"];
  weekendActivity!: ContributorStatsResponse["weekendActivity"];
  activeDayCount!: ContributorStatsResponse["activeDayCount"];
  totalDayCount!: ContributorStatsResponse["totalDayCount"];

  constructor(props: ContributorStatsResponse) {
    Object.assign(this, props);
  }
}
