import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";

import { TimelineContributionNextUiAdapter } from "../adapters/next-ui/next-ui.adapter";
import { TimelineContributionPort } from "../timeline-contribution.types";

export function TimelineContribution(props: TimelineContributionPort) {
  return withComponentAdapter<TimelineContributionPort>(TimelineContributionNextUiAdapter)(props);
}
