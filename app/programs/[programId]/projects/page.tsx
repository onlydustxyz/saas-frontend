"use client";

import { ProjectsTable } from "@/app/programs/[programId]/projects/_features/projects-table/projects-table";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { ProjectSidepanel } from "@/shared/panels/project-sidepanel/project-sidepanel";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ProgramsProjectsPage({ params: { programId } }: { params: { programId: string } }) {
  const { data } = ProgramReactQueryAdapter.client.useGetProgramById({
    pathParams: {
      programId,
    },
    options: {
      enabled: Boolean(programId),
    },
  });
  return (
    <>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"programs:list.header.title"} />,
            href: NEXT_ROUTER.programs.root,
            level: "1",
          },
          {
            id: "details",
            label: data?.name,
            href: NEXT_ROUTER.programs.projects.root(programId),
            level: "2",
          },
          {
            id: "projects",
            label: <Translate token={"programs:details.views.projects"} />,
            level: "5",
          },
        ]}
      />
      <ProjectsTable programId={programId} />

      <ProjectSidepanel />
    </>
  );
}
