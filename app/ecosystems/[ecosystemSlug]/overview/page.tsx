"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useMemo } from "react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";

import { Skeleton } from "@/design-system/atoms/skeleton";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { EcosystemStats } from "./_features/ecosystem-stats/ecosystem-stats";

function EcosystemOverviewPage({ params: { ecosystemSlug } }: { params: { ecosystemSlug: string } }) {
  const {
    data: ecosystem,
    isLoading,
    isError,
  } = EcosystemReactQueryAdapter.client.useGetEcosystemBySlug({
    pathParams: {
      slug: ecosystemSlug,
    },
    options: {
      enabled: Boolean(ecosystemSlug),
    },
  });

  const renderStats = useMemo(() => {
    if (isLoading)
      return (
        <div className="p-xl">
          <Skeleton className="h-20" />
        </div>
      );

    if (isError) return <ErrorState />;

    return (
      <EcosystemStats
        activeContributorsCount={ecosystem?.activeContributorCount}
        activeProjectsCount={ecosystem?.activeProjectCount}
        availableIssuesCount={ecosystem?.availableIssueCount}
        mergedPullRequestsCount={ecosystem?.mergedPrCount}
      />
    );
  }, [isLoading, isError]);

  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Ecosystems",
            href: NEXT_ROUTER.ecosystems.root,
          },
          {
            id: "slug",
            label: ecosystemSlug,
          },
          {
            id: "overview",
            label: <Translate token={"ecosystems:details.tabs.overview"} />,
          },
        ]}
      />

      {renderStats}
    </ScrollView>
  );
}

export default withClientOnly(withAuthenticationRequired(EcosystemOverviewPage));
