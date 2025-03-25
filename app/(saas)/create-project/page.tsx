"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { withAuthenticated } from "@/shared/providers/auth-provider";

import { ProjectCreation } from "./ProjectCreation/ProjectCreation";

function CreateProjectPage() {
  return (
    <PageContainer size="medium">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Create Project",
          },
        ]}
      />

      <PageContent classNames={{ base: "h-full" }}>
        <ProjectCreation />
      </PageContent>
    </PageContainer>
  );
}

export default withClientOnly(withAuthenticated(CreateProjectPage));
