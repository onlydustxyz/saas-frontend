"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";

import { ViewDesktop } from "./_components/view-desktop";
import { ViewMobile } from "./_components/view-mobile";

export default function ProjectDetailPage({ params }: { params: { projectSlug: string } }) {
  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
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

      <ViewMobile projectSlug={params.projectSlug} />

      <ViewDesktop projectSlug={params.projectSlug} />
    </div>
  );
}
