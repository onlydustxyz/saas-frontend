import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";

export interface ListViewProps {
  queryParams: Partial<GetContributionsQueryParams>;
  onOpenContribution(id: string): void;
}