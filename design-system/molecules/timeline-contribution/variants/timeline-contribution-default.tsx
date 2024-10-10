import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TimelineContributionDefaultAdapter } from "../adapters/default/default.adapter";
import { TimelineContributionPort } from "../timeline-contribution.types";

export function TimelineContribution(props: TimelineContributionPort) {
  return withComponentAdapter<TimelineContributionPort>(TimelineContributionDefaultAdapter)(props);
}
