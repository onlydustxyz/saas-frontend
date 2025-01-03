"use client";

import { ContributorsTable } from "@/app/manage-projects/[projectSlug]/contributors/_features/contributors-table/contributors-table";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ManageProgramsContributorsPage({
  params: { projectSlug },
}: {
  params: { projectSlug: string };
}) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectBySlug({
    pathParams: { slug: projectSlug },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  return (
    <>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"manageProjects:list.header.title"} />,
            href: NEXT_ROUTER.manageProjects.root,
            level: "1",
          },
          {
            id: "details",
            label: data?.name ?? "",
            href: NEXT_ROUTER.manageProjects.default.root(projectSlug),
            level: "3",
          },
          {
            id: "contributors",
            label: <Translate token={"manageProjects:detail.views.contributors"} />,
            level: "5",
          },
        ]}
      />
      <ContributorsTable projectSlug={projectSlug} />
    </>
  );
}
