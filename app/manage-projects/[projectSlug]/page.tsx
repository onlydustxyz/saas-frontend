"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { FinancialSection } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/financial-section";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { ContributorSidepanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel";
import { ProjectUpdateSidepanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel";
import { FinancialDetailSidepanel } from "@/shared/panels/financial-detail-sidepanel/financial-detail-sidepanel";
import { useProjectUpdateSidePanel } from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.hooks";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

function UpdateProjectSandbox() {
  const { open } = useProjectUpdateSidePanel();
  const projectId1 = "7d04163c-4187-4313-8066-61504d34fc56";
  return (
    <Button variant={"secondary"} onClick={() => open({ projectId: projectId1 })}>
      Open Update project
    </Button>
  );
}

function MaintainerSinglePage({ params: { projectSlug } }: { params: { projectSlug: string } }) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectFinancialDetailsBySlug({
    pathParams: { projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });
  return (
    <PageWrapper
      navigation={{
        breadcrumbs: [
          {
            id: "root",
            label: <Translate token={"manageProjects:list.header.title"} />,
            href: NEXT_ROUTER.manageProjects.root,
          },
          {
            id: "details",
            label: data?.name ?? "",
          },
        ],
      }}
    >
      <PosthogCaptureOnMount
        eventName={"project_dashboard_viewed"}
        params={{
          project_id: data?.id,
        }}
        paramsReady={Boolean(data?.id)}
      />

      <AnimatedColumn className="flex h-full flex-1 flex-col gap-md overflow-auto">
        <ScrollView>
          <PageContent>
            <FinancialSection projectSlug={projectSlug} />
            <UpdateProjectSandbox />
          </PageContent>
        </ScrollView>
      </AnimatedColumn>

      <FinancialDetailSidepanel />
      <ContributorSidepanel />
      <ProjectUpdateSidepanel />
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(MaintainerSinglePage));
