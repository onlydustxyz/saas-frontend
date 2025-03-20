"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { PendingApplications } from "./_components/pending-applications";
import { SuccessfulApplications } from "./_components/successful-applications";

function MyApplicationsPage({ params }: { params: { hackathonSlug: string } }) {
  return (
    <PageContainer>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Open-Source Week",
            href: NEXT_ROUTER.osw.root,
          },
          {
            id: "slug",
            label: params.hackathonSlug,
          },
          {
            id: "my-applications",
            label: "My applications",
          },
        ]}
      />

      <div className="flex flex-col gap-10 py-6">
        <SuccessfulApplications hackathonSlug={params.hackathonSlug} />

        <PendingApplications hackathonSlug={params.hackathonSlug} />
      </div>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(MyApplicationsPage));
