"use client";

import { PropsWithChildren, useCallback, useMemo } from "react";

import { RequestPayment } from "@/app/(saas)/my-dashboard/_features/request-payment/request-payment";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { RequestPaymentFlowProvider } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { useMyRewardsTransactionsSidepanel } from "@/shared/panels/my-rewards-transactions-sidepanel/my-rewards-transactions-sidepanel.hooks";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "CONTRIBUTIONS" = "CONTRIBUTIONS",
  "PROJECTS" = "PROJECTS",
  "REWARDS" = "REWARDS",
}

function Safe({ children }: PropsWithChildren) {
  const isContributions = useMatchPath(NEXT_ROUTER.myDashboard.contributions.root);
  const isProjects = useMatchPath(NEXT_ROUTER.myDashboard.projects.root);
  const isRewards = useMatchPath(NEXT_ROUTER.myDashboard.rewards.root);

  const selectedId = useMemo(() => {
    if (isContributions) {
      return Views.CONTRIBUTIONS;
    }

    if (isProjects) {
      return Views.PROJECTS;
    }

    if (isRewards) {
      return Views.REWARDS;
    }
  }, [isContributions, isProjects, isRewards]);

  const { open: openMyRewardsTransactions } = useMyRewardsTransactionsSidepanel();

  const renderActions = useCallback(() => {
    return (
      <div className="flex items-center gap-lg">
        {isRewards ? (
          <Button
            variant="secondary"
            size="sm"
            translate={{ token: "myDashboard:detail.actions.seeTransactions" }}
            onClick={openMyRewardsTransactions}
            classNames={{
              base: "max-w-full overflow-hidden",
              label: "whitespace-nowrap text-ellipsis overflow-hidden",
            }}
          />
        ) : null}

        <RequestPayment />
      </div>
    );
  }, [isRewards]);

  return (
    <PageContent>
      <div className="flex h-full flex-col gap-lg">
        <header className="flex flex-col flex-wrap items-start justify-between gap-md tablet:flex-row tablet:items-center">
          <Tabs
            variant={"solid"}
            searchParams={"data-view"}
            tabs={[
              {
                id: Views.CONTRIBUTIONS,
                children: <Translate token={"myDashboard:detail.views.contributions"} />,
                as: BaseLink,
                htmlProps: {
                  href: NEXT_ROUTER.myDashboard.contributions.root,
                },
              },
              {
                id: Views.PROJECTS,
                children: <Translate token={"myDashboard:detail.views.projects"} />,
                as: BaseLink,
                htmlProps: {
                  href: NEXT_ROUTER.myDashboard.projects.root,
                },
              },
              {
                id: Views.REWARDS,
                children: <Translate token={"myDashboard:detail.views.rewards"} />,
                as: BaseLink,
                htmlProps: {
                  href: NEXT_ROUTER.myDashboard.rewards.root,
                },
              },
            ]}
            selectedId={selectedId}
          />

          <div className="flex items-center gap-lg">{renderActions()}</div>
        </header>

        {children}
      </div>
    </PageContent>
  );
}

function MyDashboardLayout({ children }: PropsWithChildren) {
  return (
    <PageContainer size="large" className="flex-1">
      <GithubPermissionsProvider>
        <RequestPaymentFlowProvider>
          <PosthogCaptureOnMount eventName={"my_dashboard_viewed"} />

          <Safe>{children}</Safe>

          <ContributorSidepanel />
          <ContributionsSidepanel />
        </RequestPaymentFlowProvider>
      </GithubPermissionsProvider>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(MyDashboardLayout));
