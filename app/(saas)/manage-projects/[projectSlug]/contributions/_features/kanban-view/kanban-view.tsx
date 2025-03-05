import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { IssueApplicantsPanel } from "@/app/(saas)/manage-projects/[projectSlug]/contributions/_features/issue-applicants-panel/issue-applicants-panel";
import { KanbanViewProps } from "@/app/(saas)/manage-projects/[projectSlug]/contributions/_features/kanban-view/kanban-view.types";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GetContributionsQueryParams } from "@/core/domain/contribution/contribution-contract.types";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import {
  ContributionActivityStatus,
  ContributionActivityStatusUnion,
  ContributionAs,
} from "@/core/domain/contribution/models/contribution.types";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { CardContributionKanban } from "@/shared/features/card-contribution-kanban/card-contribution-kanban";
import { Kanban } from "@/shared/features/kanban/kanban";
import { KanbanColumn } from "@/shared/features/kanban/kanban-column/kanban-column";
import { KanbanColumnProps } from "@/shared/features/kanban/kanban-column/kanban-column.types";
import { IssueCreationPanel } from "@/shared/panels/issue-creation-panel/issue-creation-panel";
import { Translate } from "@/shared/translation/components/translate/translate";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

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

  const renderContribution = useCallback((contribution: ContributionActivityInterface) => {
    if (contribution.isNotAssigned()) {
      return (
        <IssueApplicantsPanel key={contribution.id} id={contribution.id}>
          <CardContributionKanban contribution={contribution} as={ContributionAs.MAINTAINER} />
        </IssueApplicantsPanel>
      );
    }

    return (
      <CardContributionKanban
        key={contribution.id}
        contribution={contribution}
        onAction={onOpenContribution}
        as={ContributionAs.MAINTAINER}
      />
    );
  }, []);
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
      {contributions?.map(renderContribution)}
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

  const CreateIssueButton = useMemo(() => {
    const repos = data?.getProjectRepos();

    if (!repos?.length) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button size="icon" variant={"outline"} disabled>
                <Plus />
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            You cannot access this feature because you do not have any repositories
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <IssueCreationPanel projectId={data?.id ?? ""}>
        <Button size="icon" variant={"outline"}>
          <Plus />
        </Button>
      </IssueCreationPanel>
    );
  }, [data]);

  return (
    <Kanban>
      <Column
        onOpenContribution={onOpenContribution}
        type={ContributionActivityStatus.NOT_ASSIGNED}
        header={{
          endContent: CreateIssueButton,
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
