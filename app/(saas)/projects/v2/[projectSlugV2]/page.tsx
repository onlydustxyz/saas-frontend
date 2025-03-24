"use client";

import { ViewDesktop } from "@/app/(saas)/projects/v2/[projectSlugV2]/_components/view-desktop";
import { ViewMobile } from "@/app/(saas)/projects/v2/[projectSlugV2]/_components/view-mobile";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";

export default function ProjectDetailPage({ params }: { params: { projectSlugV2: string } }) {
  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlugV2,
    },
    options: {
      enabled: Boolean(params.projectSlugV2),
    },
  });

  return (
    <div className="py-6">
      <PosthogCaptureOnMount
        eventName={"project_viewed"}
        params={{
          id_project: project?.id,
          project_id: project?.id,
          type: "full",
          issues: project?.availableIssueCount,
        }}
        paramsReady={Boolean(project)}
      />

      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Projects",
            href: NEXT_ROUTER.projects.root,
          },
          {
            id: "name",
            label: project?.name,
          },
          {
            id: "overview",
            label: "Overview",
          },
        ]}
      />

      <ViewMobile projectSlug={params.projectSlugV2} />

      <ViewDesktop projectSlug={params.projectSlugV2} />
    </div>
  );
}
