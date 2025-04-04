"use client";

import { PropsWithChildren, useCallback, useMemo } from "react";

import { DepositButton } from "@/app/(saas)/financials/[sponsorId]/financial/_features/deposit-button/deposit-button";
import { AllocateButton } from "@/app/(saas)/financials/[sponsorId]/programs/_features/allocate-button/allocate-button";
import { CreateButton } from "@/app/(saas)/financials/[sponsorId]/programs/_features/create-button/create-button";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "PROGRAMS" = "PROGRAMS",
  "FINANCIAL" = "FINANCIAL",
}

function FinancialDetailLayout({
  children,
  params: { sponsorId },
}: PropsWithChildren<{ params: { sponsorId: string } }>) {
  const isPrograms = useMatchPath(NEXT_ROUTER.financials.programs.root(sponsorId));
  const isFinancial = useMatchPath(NEXT_ROUTER.financials.financial.root(sponsorId));

  const selectedId = useMemo(() => {
    if (isPrograms) {
      return Views.PROGRAMS;
    }
    if (isFinancial) {
      return Views.FINANCIAL;
    }
  }, [isPrograms, isFinancial]);

  const renderActions = useCallback(() => {
    if (isPrograms) {
      return (
        <>
          <CreateButton sponsorId={sponsorId} />
          <AllocateButton sponsorId={sponsorId} />
        </>
      );
    }

    if (isFinancial) {
      return <DepositButton sponsorId={sponsorId} />;
    }

    return null;
  }, [isPrograms, isFinancial]);

  return (
    <PageContainer size="medium" className="flex-1">
      <PosthogCaptureOnMount
        eventName={"sponsor_viewed"}
        params={{
          sponsor_id: sponsorId,
        }}
        paramsReady={Boolean(sponsorId)}
      />

      <PageContent classNames={{ base: "tablet:overflow-hidden h-full" }}>
        <div className="flex h-full flex-col gap-lg">
          <header className="flex flex-col flex-wrap items-start justify-between gap-md tablet:flex-row tablet:items-center">
            <Tabs
              variant={"solid"}
              searchParams={"data-view"}
              tabs={[
                {
                  id: Views.PROGRAMS,
                  children: <Translate token={"financials:details.views.programs"} />,
                  as: BaseLink,
                  htmlProps: {
                    href: NEXT_ROUTER.financials.programs.root(sponsorId),
                  },
                },
                {
                  id: Views.FINANCIAL,
                  children: <Translate token={"financials:details.views.financial"} />,
                  as: BaseLink,
                  htmlProps: {
                    href: NEXT_ROUTER.financials.financial.root(sponsorId),
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
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(FinancialDetailLayout));
