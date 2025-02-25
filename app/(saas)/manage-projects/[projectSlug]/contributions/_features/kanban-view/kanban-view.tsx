import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { KanbanViewProps } from "@/app/(saas)/manage-projects/[projectSlug]/contributions/_features/kanban-view/kanban-view.types";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";
import {
  ContributionActivityStatus,
  ContributionActivityStatusUnion,
  ContributionAs,
} from "@/core/domain/contribution/models/contribution.types";
import { GithubOrganizationResponse } from "@/core/domain/github/models/github-organization-model";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Menu } from "@/design-system/molecules/menu";
import { MenuItemPort } from "@/design-system/molecules/menu-item";

import { CardContributionKanban } from "@/shared/features/card-contribution-kanban/card-contribution-kanban";
import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { KanbanColumnProps } from "@/shared/features/kanban/kanban-column/kanban-column.types";
import { IssueCreationPanel } from "@/shared/panels/issue-creation-panel/issue-creation-panel";
import { Translate } from "@/shared/translation/components/translate/translate";
import { Button } from "@/shared/ui/button";

function Column({
  type,
  queryParams,
  onOpenContribution,
  ...kanbanProps
}: {
  type: ContributionActivityStatusUnion;
  queryParams: Partial<GetContributionsQueryParams>;
  onOpenContribution(id: string): void;
} & Partial<KanbanColumnProps>) {
  const { data, hasNextPage, fetchNextPage, isPending, isFetchingNextPage } =
    ContributionReactQueryAdapter.client.useGetContributions({
      queryParams: {
        ...queryParams,
        statuses: [type],
      },
      options: {
        enabled: !!queryParams?.projectSlugs?.length,
      },
    });

  const contributions = useMemo(() => data?.pages.flatMap(page => page.contributions) ?? [], [data]);

  const title = useMemo(() => {
    switch (type) {
      case ContributionActivityStatus.NOT_ASSIGNED:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.notAssigned"} />;
      case ContributionActivityStatus.IN_PROGRESS:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.inProgress"} />;
      case ContributionActivityStatus.TO_REVIEW:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.toReview"} />;
      case ContributionActivityStatus.DONE:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.done"} />;
      case ContributionActivityStatus.ARCHIVED:
        return <Translate token={"manageProjects:detail.activity.kanban.columns.archived"} />;
    }
  }, [type]);

  const count = useMemo(() => data?.pages?.[0]?.totalItemNumber ?? 0, [data]);

  return (
    <KanbanColumn
      {...kanbanProps}
      hasNextPage={hasNextPage}
      onNext={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      header={{
        title,
        badge: { count },
        ...(kanbanProps.header || {}),
      }}
    >
      {contributions?.map(contribution => (
        <CardContributionKanban
          contribution={contribution}
          key={contribution.id}
          onAction={onOpenContribution}
          as={ContributionAs.MAINTAINER}
        />
      ))}
      {isPending && (
        <>
          <Skeleton classNames={{ base: "h-[160px] w-full" }} />
          <Skeleton classNames={{ base: "h-[160px] w-full" }} />
          <Skeleton classNames={{ base: "h-[160px] w-full" }} />
          <Skeleton classNames={{ base: "h-[160px] w-full" }} />
        </>
      )}
    </KanbanColumn>
  );
}

export function KanbanView({ queryParams, onOpenContribution }: KanbanViewProps) {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug ?? "" },
    options: {
      enabled: !!projectSlug,
    },
  });

  const createMenuItems = (repos: GithubOrganizationResponse["repos"]): MenuItemPort<number>[] => {
    return repos.map(repo => ({
      id: repo.id,
      label: repo.name,
      isDisabled: !repo.hasIssues,
      onClick: () => {
        window.open(`${repo.htmlUrl}/issues/new`, "_blank");
      },
    }));
  };

  // params dans l'URL pour features flag

  return (
    <Kanban>
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.NOT_ASSIGNED}
        header={{
          endContent: (
            <IssueCreationPanel projectId={data?.id ?? ""}>
              <Button size="icon" variant={"outline"}>
                <Plus />
              </Button>
            </IssueCreationPanel>
          ),
        }}
        queryParams={queryParams}
      />
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.IN_PROGRESS}
        queryParams={queryParams}
      />
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.TO_REVIEW}
        queryParams={queryParams}
      />
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.DONE}
        queryParams={queryParams}
      />
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.ARCHIVED}
        queryParams={queryParams}
      />
    </Kanban>
  );
}
