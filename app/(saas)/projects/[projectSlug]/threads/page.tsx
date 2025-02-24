"use client";

import { ReactNode } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ThreadsList } from "./_features/threads-list/threads-list";

function ProjectThreadsPage({ params }: { params: { projectSlug: string } }) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: params.projectSlug,
    },
    options: {
      enabled: Boolean(params.projectSlug),
    },
  });

  return (
    <ScrollView>
      <PosthogCaptureOnMount
        eventName={"project_viewed"}
        params={{
          id_project: data?.id,
          project_id: data?.id,
          type: "full",
          tab: "threads",
        }}
        paramsReady={Boolean(data)}
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
            label: data?.name,
          },
          {
            id: "threads",
            label: <Translate token={"project:details.tabs.threads"} />,
          },
        ]}
      />
      <ThreadsList params={{ projectSlug: params.projectSlug }} />
    </ScrollView>
  );
}

export default withClientOnly(ProjectThreadsPage);
