"use client";

import { Orbit } from "lucide-react";

import { EcosystemsList } from "@/app/(saas)/ecosystems/_features/ecosystems-list/ecosystems-list";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ListBanner } from "@/shared/features/list-banner/list-banner";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";

function EcosystemsPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-4xl pt-10">
        <NavigationBreadcrumb
          breadcrumb={[
            {
              id: "root",
              label: "Ecosystems",
            },
          ]}
        />

        <ListBanner
          title={{ children: "Explore Ecosystems" }}
          subtitle={{
            children:
              "Explore a wide range of projects shaping the future of digital communities and driving transformative change.",
          }}
          logo={<Orbit className="size-16" />}
        />

        <EcosystemsList />
      </div>
    </PageContainer>
  );
}

export default withClientOnly(EcosystemsPage);
