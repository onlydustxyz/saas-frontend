"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Columns4, Table } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { FilterData } from "@/app/manage-projects/[projectSlug]/contributions/_components/filter-data/filter-data";
import { useContributionsFilterDataSidePanel } from "@/app/manage-projects/[projectSlug]/contributions/_components/filter-data/filter-data.hooks";
import { ContributionKanbanFilters } from "@/app/manage-projects/[projectSlug]/contributions/_components/filter-data/filter-data.types";
import { KanbanView } from "@/app/manage-projects/[projectSlug]/contributions/_features/kanban-view/kanban-view";
import { ListView } from "@/app/manage-projects/[projectSlug]/contributions/_features/list-view/list-view";

import { bootstrap } from "@/core/bootstrap";
import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";
import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { Icon } from "@/design-system/atoms/icon";
import { TableSearch } from "@/design-system/molecules/table-search";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { useActionPooling } from "@/shared/hooks/action-pooling/action-pooling.context";
import { useContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.hooks";

enum View {
  LIST = "list",
  KANBAN = "kanban",
}

export default function ManageProgramsContributionsPage({
  params: { projectSlug },
}: {
  params: { projectSlug: string };
}) {
  const [toggleViews, setToggleViews] = useState<View>(View.KANBAN);
  const [filters, setFilters] = useState<ContributionKanbanFilters>({});
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  const { open: openFilterPanel } = useContributionsFilterDataSidePanel();
  const { open: openContribution } = useContributionsSidepanel();

  const queryParams: Partial<GetContributionsQueryParams> = {
    search: debouncedSearch,
    projectSlugs: projectSlug ? [projectSlug] : undefined,
    types: ["ISSUE", "PULL_REQUEST"],
    showLinkedIssues: false,
    sort: "UPDATED_AT",
    sortDirection: "DESC",
    ...filters,
  };

  function handleToggleViews(view: string) {
    setToggleViews(view as View);
  }

  function onOpenContribution(id: string) {
    openContribution({ id, as: ContributionAs.MAINTAINER });
  }

  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();
  const issueStoragePort = bootstrap.getIssueStoragePortForClient();
  const queryClient = useQueryClient();
  const { shouldRefetch } = useActionPooling();

  async function invalidate() {
    await queryClient.invalidateQueries({
      queryKey: contributionStoragePort.getContributionsById({}).tag,
      exact: false,
    });

    await queryClient.invalidateQueries({
      queryKey: contributionStoragePort.getContributions({}).tag,
      exact: false,
    });

    await queryClient.invalidateQueries({
      queryKey: issueStoragePort.getIssueApplicants({}).tag,
      exact: false,
    });
  }

  useEffect(() => {
    if (shouldRefetch) {
      invalidate();
    }
  }, [shouldRefetch]);

  const renderView = useMemo(() => {
    if (toggleViews === View.LIST) {
      return <ListView queryParams={queryParams} onOpenContribution={onOpenContribution} />;
    }

    return <KanbanView queryParams={queryParams} onOpenContribution={onOpenContribution} />;
  }, [toggleViews, queryParams]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <div className={"flex h-full flex-col gap-lg overflow-hidden"}>
        <nav className={"flex gap-md"}>
          <FilterButton onClick={openFilterPanel} />

          <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />

          <Tabs
            onTabClick={handleToggleViews}
            variant="solid"
            tabs={[
              {
                id: View.LIST,
                children: <Icon component={Table} />,
              },
              {
                id: View.KANBAN,
                children: <Icon component={Columns4} />,
              },
            ]}
            selectedId={toggleViews}
          />
        </nav>

        <div className={"h-full overflow-hidden"}>{renderView}</div>
      </div>

      <FilterData />
    </FilterDataProvider>
  );
}
