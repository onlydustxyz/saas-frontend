"use client";

import { CreateProgramPanel } from "@/app/financials/[sponsorId]/programs/_features/create-program-panel/create-program-panel";
import { EditProgramPanel } from "@/app/financials/[sponsorId]/programs/_features/edit-program-panel/edit-program-panel";
import { ProgramsTable } from "@/app/financials/[sponsorId]/programs/_features/programs-table/programs-table";

import { SponsorReactQueryAdapter } from "@/core/application/react-query-adapter/sponsor";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { AllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel";
import { useAllocateProgramSidepanel } from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.hooks";
import { ProgramListSidepanel } from "@/shared/panels/program-list-sidepanel/program-list-sidepanel";
import { ProgramSidepanel } from "@/shared/panels/program-sidepanel/program-sidepanel";
import { Translate } from "@/shared/translation/components/translate/translate";

export default function FinancialsProgramsPage({ params: { sponsorId } }: { params: { sponsorId: string } }) {
  const { open: openAllocateProgramSidepanel } = useAllocateProgramSidepanel();

  function handleOpenAllocateProgram(programId: string, canGoBack?: boolean) {
    openAllocateProgramSidepanel({ programId, sponsorId, canGoBack });
  }

  const { data } = SponsorReactQueryAdapter.client.useGetSponsor({
    pathParams: {
      sponsorId,
    },
    options: {
      enabled: Boolean(sponsorId),
    },
  });

  return (
    <>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"financials:list.header.title"} />,
            href: NEXT_ROUTER.financials.root,
            level: "1",
          },
          {
            id: "details",
            label: data?.name,
            href: NEXT_ROUTER.financials.programs.root(sponsorId),
            level: "2",
          },
          {
            id: "programs",
            label: <Translate token={"financials:details.views.programs"} />,
            level: "5",
          },
        ]}
      />
      <ProgramsTable sponsorId={sponsorId} />

      <CreateProgramPanel />
      <EditProgramPanel />
      <ProgramSidepanel />
      <ProgramListSidepanel sponsorId={sponsorId} onProgramClick={handleOpenAllocateProgram} />
      <AllocateProgramSidepanel />
    </>
  );
}
