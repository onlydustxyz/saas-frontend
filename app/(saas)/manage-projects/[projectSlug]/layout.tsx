"use client";

import { ChevronDownIcon } from "lucide-react";
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";

import NotFound from "@/app/not-found";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { RepoIndexingAlert } from "@/shared/features/alerts/repo-indexing-alert/repo-indexing-alert";
import { GithubMissingPermissionsAlert } from "@/shared/features/github-permissions/_components/github-missing-permissions-alert/github-missing-permissions-alert";
import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { ActionPoolingProvider } from "@/shared/hooks/action-pooling/action-pooling.context";
import { useCanReward } from "@/shared/hooks/rewards/use-can-reward";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { RewardFlowProvider, useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { UngrantFlowProvider, useUngrantFlow } from "@/shared/panels/_flows/ungrant-flow/ungrant-flow.context";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { IssueCreationPanel } from "@/shared/panels/issue-creation-panel/issue-creation-panel";
import { useProjectTransactionsSidepanel } from "@/shared/panels/project-transactions-sidepanel/project-transactions-sidepanel.hooks";
import { ProjectUpdateSidepanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel";
import { RewardDetailSidepanel } from "@/shared/panels/reward-detail-sidepanel/reward-detail-sidepanel";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";
import { Button as ShadcnButton } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { HoverBorderGradient } from "@/shared/ui/hover-border-gradient";
import { Tooltip as ShadcnTooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

import { CreateNews } from "../_features/create-news/create-news";
import { PageHeader } from "./_features/page-header/page-header";

enum Views {
  "DASHBOARD" = "DASHBOARD",
  "CONTRIBUTIONS" = "CONTRIBUTIONS",
  "CONTRIBUTORS" = "CONTRIBUTORS",
  "FINANCIAL" = "FINANCIAL",
}

function Safe({ children, projectSlug }: PropsWithChildren<{ projectSlug: string }>) {
  const isContributors = useMatchPath(NEXT_ROUTER.manageProjects.contributors.root(projectSlug));
  const isContributions = useMatchPath(NEXT_ROUTER.manageProjects.contributions.root(projectSlug));
  const isFinancial = useMatchPath(NEXT_ROUTER.manageProjects.financial.root(projectSlug));
  const isDashboard = useMatchPath(NEXT_ROUTER.manageProjects.dashboard.root(projectSlug));
  const selectedId = useMemo(() => {
    if (isDashboard) {
      return Views.DASHBOARD;
    }

    if (isContributors) {
      return Views.CONTRIBUTORS;
    }

    if (isContributions) {
      return Views.CONTRIBUTIONS;
    }

    if (isFinancial) {
      return Views.FINANCIAL;
    }

    return Views.DASHBOARD;
  }, [isContributions, isContributors, isFinancial, isDashboard]);

  const [openAlert, setOpenAlert] = useState(false);
  const hasAlreadyClosedAlert = useRef(false);

  const { open: openProjectTransactions } = useProjectTransactionsSidepanel();
  const { open: openRewardFlow } = useRewardFlow();
  const { open: openUngrantFlow } = useUngrantFlow();
  const canReward = useCanReward(projectSlug);

  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  useEffect(() => {
    if (data?.isSomeOrganizationMissingPermissions() && !hasAlreadyClosedAlert.current) {
      setOpenAlert(true);
    }
  }, [data]);

  function handleCloseAlert() {
    setOpenAlert(false);
    hasAlreadyClosedAlert.current = true;
  }

  function renderUngrantButton() {
    return (
      <Button
        variant={"secondary"}
        size={"sm"}
        translate={{ token: "manageProjects:detail.activity.actions.returnFunds" }}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
        onClick={openUngrantFlow}
      />
    );
  }

  const renderActions = useMemo(() => {
    if (!isFinancial) return null;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <ShadcnButton variant="outline">
            Financial
            <ChevronDownIcon className="ml-auto" />
          </ShadcnButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={openUngrantFlow}>Return funds</DropdownMenuItem>
            <DropdownMenuItem onClick={openProjectTransactions}>See transactions</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }, [isFinancial]);

  const CreateIssueButton = useMemo(() => {
    const repos = data?.getProjectRepos();

    if (!repos?.length) {
      return (
        <ShadcnTooltip>
          <TooltipTrigger asChild>
            <div>
              <ShadcnButton variant={"outline"}>Create issue</ShadcnButton>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            You cannot access this feature because you do not have any repositories
          </TooltipContent>
        </ShadcnTooltip>
      );
    }

    return (
      <IssueCreationPanel projectId={data?.id ?? ""}>
        <HoverBorderGradient>
          <ShadcnButton variant={"outline"}>Create issue</ShadcnButton>
        </HoverBorderGradient>
      </IssueCreationPanel>
    );
  }, [data]);

  return (
    <>
      {openAlert ? <GithubMissingPermissionsAlert onClose={handleCloseAlert} /> : null}

      <RepoIndexingAlert indexingComplete={data?.isIndexingCompleted() ?? true} />

      <PageContent>
        <div className="flex h-full flex-col gap-lg">
          <header className="flex flex-col justify-between gap-8">
            <PageHeader projectSlug={projectSlug} />
            <div className="flex flex-col flex-wrap items-start justify-between gap-md border-b border-border tablet:flex-row tablet:items-center">
              <Tabs
                variant={"underline"}
                searchParams={"data-view"}
                tabs={[
                  {
                    id: Views.DASHBOARD,
                    children: "Analytics",
                    as: BaseLink,
                    htmlProps: {
                      href: NEXT_ROUTER.manageProjects.dashboard.root(projectSlug),
                    },
                  },
                  {
                    id: Views.CONTRIBUTIONS,
                    children: <Translate token={"manageProjects:detail.views.contributions"} />,
                    as: BaseLink,
                    htmlProps: {
                      href: NEXT_ROUTER.manageProjects.contributions.root(projectSlug),
                    },
                  },
                  {
                    id: Views.CONTRIBUTORS,
                    children: <Translate token={"manageProjects:detail.views.contributors"} />,
                    as: BaseLink,
                    htmlProps: {
                      href: NEXT_ROUTER.manageProjects.contributors.root(projectSlug),
                    },
                  },
                  {
                    id: Views.FINANCIAL,
                    children: <Translate token={"manageProjects:detail.views.financial"} />,
                    as: BaseLink,
                    htmlProps: {
                      href: NEXT_ROUTER.manageProjects.financial.root(projectSlug),
                    },
                  },
                ]}
                selectedId={selectedId}
                classNames={{
                  base: "border-none flex-1",
                }}
              />
              <div className="mb-2 flex items-center gap-2">
                {!!data && (
                  <CreateNews project={data}>
                    <ShadcnButton variant="outline">Create news</ShadcnButton>
                  </CreateNews>
                )}
                {CreateIssueButton}
                <Tooltip enabled={!canReward} content={<Translate token="common:tooltip.disabledReward" />}>
                  <ShadcnButton disabled={!canReward} onClick={() => openRewardFlow({ githubUserIds: [] })}>
                    Reward a contributor
                  </ShadcnButton>
                </Tooltip>
                {renderActions}
              </div>
            </div>
          </header>

          {children}
        </div>
      </PageContent>

      <FinancialDetailSidepanel footer={renderUngrantButton()} />
    </>
  );
}

function ManageProjectsLayout({
  children,
  params: { projectSlug },
}: PropsWithChildren<{ params: { projectSlug: string } }>) {
  const { data, isLoading } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const projectId = useMemo(() => data?.id, [data]);

  if (isLoading) {
    return <div />;
  }

  if (!isLoading && !data?.me?.isProjectLead) {
    return <NotFound />;
  }

  return (
    <PageContainer size="large" className="flex-1">
      <PosthogCaptureOnMount
        eventName={"project_dashboard_viewed"}
        params={{
          project_id: projectId,
        }}
        paramsReady={Boolean(projectId)}
      />

      <ActionPoolingProvider interval={2000} limit={4}>
        <GithubPermissionsProvider projectSlug={projectSlug}>
          <RewardFlowProvider projectId={projectId}>
            <UngrantFlowProvider projectId={projectId}>
              <Safe projectSlug={projectSlug}>{children}</Safe>
              <ContributionsSidepanel />
            </UngrantFlowProvider>
          </RewardFlowProvider>
        </GithubPermissionsProvider>
      </ActionPoolingProvider>

      <RewardDetailSidepanel />
      <ContributorSidepanel />
      <ProjectUpdateSidepanel />
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(ManageProjectsLayout));
