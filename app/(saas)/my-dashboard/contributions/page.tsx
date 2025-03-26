"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { FilterData } from "@/app/(saas)/my-dashboard/contributions/_features/filter-data/filter-data";
import { useContributorContributionsFilterDataSidePanel } from "@/app/(saas)/my-dashboard/contributions/_features/filter-data/filter-data.hooks";
import { ContributionKanbanFilters } from "@/app/(saas)/my-dashboard/contributions/_features/filter-data/filter-data.types";
import { KanbanView } from "@/app/(saas)/my-dashboard/contributions/_features/kanban-view/kanban-view";

import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";
import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { TableSearch } from "@/design-system/molecules/table-search";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";

function MyDashboardContributionsPage() {
  const [filters, setFilters] = useState<ContributionKanbanFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const { open: openFilterPanel } = useContributorContributionsFilterDataSidePanel();
  const { open: openContribution } = useContributionsSidepanel();

  const queryParams: Partial<GetContributionsQueryParams> = {
    search: debouncedSearch,
    projectSlugs: projectSlug ? [projectSlug] : undefined,
    types: ["ISSUE", "PULL_REQUEST"],
    sort: "UPDATED_AT",
    sortDirection: "DESC",
    dataSource: "ONLYDUST",
    ...filters,
  };

  function onOpenContribution(id: string) {
    openContribution({ id, as: ContributionAs.CONTRIBUTOR });
  }

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"myDashboard:detail.header.title"} />,
            href: NEXT_ROUTER.myDashboard.root,
          },
          {
            id: "contributors",
            label: <Translate token={"myDashboard:detail.views.contributions"} />,
          },
        ]}
      />
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />

          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
        </nav>

        <div className={"h-full overflow-hidden"}>
          <KanbanView queryParams={queryParams} onOpenContribution={onOpenContribution} />
        </div>
      </div>

      <FilterData />
    </FilterDataProvider>
  );
}

export default withClientOnly(withAuthenticated(MyDashboardContributionsPage));
