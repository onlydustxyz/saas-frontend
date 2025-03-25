import { setDay, setWeek, setYear } from "date-fns";

import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BiContributorActivityResponse = components["schemas"]["ContributorActivityGraphResponse"];
type BiContributorActivityResponseDayaInterface = BiContributorActivityResponse["days"][0];

interface BiContributorActivityDayInterface extends BiContributorActivityResponseDayaInterface {
  date: Date;
  count: number;
  hasReward: boolean;
}

export interface BiContributorActivityInterface extends Omit<BiContributorActivityResponse, "days"> {
  days: BiContributorActivityDayInterface[];
  totalCount: number;
}

export class BiContributorActivity implements BiContributorActivityInterface {
  days!: BiContributorActivityDayInterface[];
  totalCount!: number;

  constructor(props: BiContributorActivityResponse) {
    Object.assign(this, props);

    this.days = props.days.map(day => ({
      ...day,
      date: setYear(setWeek(setDay(new Date(), day.day), day.week), day.year),
      count: (day.rewardCount || 0) + (day.codeReviewCount || 0) + (day.issueCount || 0) + (day.pullRequestCount || 0),
      hasReward: day.rewardCount > 0,
    }));

    this.totalCount = this.days.reduce((acc, day) => acc + day.count, 0);
  }
}
