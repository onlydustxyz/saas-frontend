"use client";

import { BudgetAvailableCards } from "@/app/manage-projects/[projectSlug]/financial/_features/budget-available-cards/budget-available-cards";
import { RewardsTable } from "@/app/manage-projects/[projectSlug]/financial/_features/rewards-table/rewards-table";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { ProjectTransactionsSidepanel } from "@/shared/panels/project-transactions-sidepanel/project-transactions-sidepanel";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function ManageProgramsFinancialPage({ params: { projectSlug } }: { params: { projectSlug: string } }) {
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
            level: "2",
          },
          {
            id: "financial",
            label: <Translate token={"manageProjects:detail.views.financial"} />,
            level: "5",
          },
        ]}
      />
      <div className="flex h-full flex-col gap-lg overflow-hidden">
        <BudgetAvailableCards />
        <RewardsTable />
      </div>

      <ProjectTransactionsSidepanel projectSlug={projectSlug} />
    </>
  );
}
