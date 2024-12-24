"use client";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ContributorsTable } from "./_components/contributors-table/contributors-table";

export default function ProjectContributorsPage({ params }: { params: { projectSlug: string } }) {
  return (
    <ScrollView>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: params.projectSlug,
          },
          {
            id: "contributors",
            label: <Translate token={"project:details.tabs.contributors"} />,
          },
        ]}
      />
      <ContributorsTable />
    </ScrollView>
  );
}
