import { GetIssueApplicantsQueryParams } from "@/core/domain/issue/issue-contract.types";

import { useFilterColumns } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-columns/filter-columns.hooks";

export interface AccordionIgnoredContributorsProps {
  issueId?: number;
  queryParams: Partial<GetIssueApplicantsQueryParams>;
  columns: ReturnType<typeof useFilterColumns>["columns"];
}
