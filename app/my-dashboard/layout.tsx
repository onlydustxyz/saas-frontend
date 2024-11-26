"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { PropsWithChildren, useCallback, useMemo } from "react";

import { RequestPayment } from "@/app/my-dashboard/_features/request-payment/request-payment";
import { TransactionsTrigger } from "@/app/my-dashboard/financial/_features/transactions-trigger/transactions-trigger";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { GithubPermissionsProvider } from "@/shared/features/github-permissions/github-permissions.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { RequestPaymentFlowProvider } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { ContributionsSidepanel } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "CONTRIBUTIONS" = "CONTRIBUTIONS",
  "PROJECTS" = "PROJECTS",
  "FINANCIAL" = "FINANCIAL",
}

function MyDashboardLayout({ children }: PropsWithChildren) {
  const isContributions = useMatchPath(NEXT_ROUTER.myDashboard.contributions.root);
  const isProjects = useMatchPath(NEXT_ROUTER.myDashboard.projects.root);
  const isFinancial = useMatchPath(NEXT_ROUTER.myDashboard.financial.root);

  const selectedId = useMemo(() => {
    if (isContributions) {
      return Views.CONTRIBUTIONS;
    }

    if (isProjects) {
      return Views.PROJECTS;
    }

    if (isFinancial) {
      return Views.FINANCIAL;
    }
  }, [isContributions, isProjects, isFinancial]);

  const renderActions = useCallback(() => {
    return (
      <div className="flex items-center gap-lg">
        {isFinancial ? <TransactionsTrigger /> : null}

        <RequestPayment />
      </div>
    );
  }, [isFinancial]);

  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"myDashboard:detail.header.title"} />,
          },
        ],
      }}
    >
      <GithubPermissionsProvider>
        <RequestPaymentFlowProvider>
          <PosthogCaptureOnMount eventName={"my_dashboard_viewed"} />

          <AnimatedColumn className="h-full">
            <ScrollView className="flex flex-col">
              <PageContent classNames={{ base: "tablet:overflow-hidden" }}>
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
                          id: Views.FINANCIAL,
                          children: <Translate token={"myDashboard:detail.views.financial"} />,
                          as: BaseLink,
                          htmlProps: {
                            href: NEXT_ROUTER.myDashboard.financial.root,
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
            </ScrollView>
          </AnimatedColumn>

          <ContributorSidepanel />
          <ContributionsSidepanel />
        </RequestPaymentFlowProvider>
      </GithubPermissionsProvider>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(MyDashboardLayout));