import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";

import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";

import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { Table, TableLoading } from "@/design-system/molecules/table";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { TABLE_DEFAULT_COLUMN } from "@/shared/constants/table";
import { AccordionProjectContributorsProps } from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/accordion-project-contributors/accordion-project-contributors.types";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";

export function AccordionProjectContributors({
  contributionId = "",
  queryParams,
  columns,
  sorting,
  setSorting,
}: AccordionProjectContributorsProps) {
  const { open: openContributor } = useContributorSidePanel({
    type: "container",
  });
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    IssueReactQueryAdapter.client.useGetIssueApplicants({
      pathParams: { contributionUuid: contributionId },
      queryParams: { ...queryParams, isApplicantProjectMember: true, isIgnored: false },
      options: { enabled: !!contributionId },
    });

  const applicants = useMemo(() => data?.pages.flatMap(page => page.applicants) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0].totalItemNumber ?? 0, [data]);

  const table = useReactTable({
    data: applicants,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    sortDescFirst: false,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    defaultColumn: TABLE_DEFAULT_COLUMN,
    columnResizeMode: "onChange",
  });

  if (isLoading) {
    return <TableLoading />;
  }

  if (isError) {
    return (
      <div className={"py-24 text-center"}>
        <Typo
          translate={{
            token: "common:state.error.title",
          }}
        />
      </div>
    );
  }
  return (
    <Accordion
      id={"project-contributors"}
      defaultSelected={["project-contributors"]}
      titleProps={{
        children: (
          <div className={"flex items-center gap-md"}>
            <Typo translate={{ token: "modals:manageApplicants.projectContributors" }} size={"sm"} />
            <Badge size={"xxs"} color={"grey"}>
              {totalItemNumber}
            </Badge>
          </div>
        ),
      }}
    >
      <ScrollView direction={"x"}>
        <Table
          table={table}
          header={{
            headerGroups: table.getHeaderGroups(),
          }}
          rows={table.getRowModel().rows}
          onRowClick={row => {
            openContributor({
              githubId: row.original.contributor.githubUserId,
              applicationId: row.original.applicationId,
            });
          }}
        />
        {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
      </ScrollView>
    </Accordion>
  );
}
