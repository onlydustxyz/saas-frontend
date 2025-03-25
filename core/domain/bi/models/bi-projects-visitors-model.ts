import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BiProjectVisitorsResponse = components["schemas"]["BiVisitorsStatsListItemResponse"];

export interface BiProjectVisitorsInterface extends BiProjectVisitorsResponse {}

export class BiProjectVisitors implements BiProjectVisitorsInterface {
  timestamp!: BiProjectVisitorsResponse["timestamp"];
  visitorCount!: BiProjectVisitorsResponse["visitorCount"];

  constructor(props: BiProjectVisitorsResponse) {
    Object.assign(this, props);
  }
}
