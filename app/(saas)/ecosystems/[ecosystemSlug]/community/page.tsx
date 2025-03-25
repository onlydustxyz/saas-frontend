"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";

import { CommunityTable } from "./_components/community-table/community-table";

function EcosystemCommunityPage({ params }: { params: { ecosystemSlug: string } }) {
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
            label: params.ecosystemSlug,
          },
          {
            id: "contributors",
            label: "Community",
          },
        ]}
      />
      <CommunityTable ecosystemSlug={params.ecosystemSlug} />
    </ScrollView>
  );
}

export default withClientOnly(EcosystemCommunityPage);
