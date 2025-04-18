"use client";

import { ContributorsTable } from "@/app/(saas)/manage-projects/[projectSlug]/contributors/_features/contributors-table/contributors-table";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { withAuthenticated } from "@/shared/providers/auth-provider";
import { Translate } from "@/shared/translation/components/translate/translate";

function ManageProgramsContributorsPage({ params: { projectSlug } }: { params: { projectSlug: string } }) {
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
          },
          {
            id: "details",
            label: data?.name ?? "",
            href: NEXT_ROUTER.manageProjects.default.root(projectSlug),
          },
          {
            id: "contributors",
            label: <Translate token={"manageProjects:detail.views.contributors"} />,
          },
        ]}
      />
      <ContributorsTable projectSlug={projectSlug} />
    </>
  );
}

export default withClientOnly(withAuthenticated(ManageProgramsContributorsPage));
