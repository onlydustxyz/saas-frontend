import { ContributorsBulkSidepanelData } from "@/app/manage-projects/[projectSlug]/features/contributors-table/_features/contributors-bulk-sidepanel/contributors-bulk-sidepanel.types";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";

export function useContributorsBulkSidePanel() {
  return useSinglePanelContext<ContributorsBulkSidepanelData>("project-detail");
}
