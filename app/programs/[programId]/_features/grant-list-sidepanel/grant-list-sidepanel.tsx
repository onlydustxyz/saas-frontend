import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { AllProjects } from "@/app/programs/[programId]/_features/grant-list-sidepanel/all-projects";
import { AllProjectsBadge } from "@/app/programs/[programId]/_features/grant-list-sidepanel/all-projects-badge";
import { AlreadyGrantedBadge } from "@/app/programs/[programId]/_features/grant-list-sidepanel/already-granted-badge";
import { AlreadyGrantedProjects } from "@/app/programs/[programId]/_features/grant-list-sidepanel/already-granted-projects";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Icon } from "@/design-system/atoms/icon";
import { Input } from "@/design-system/atoms/input";
import { AccordionWithBadge } from "@/design-system/molecules/accordion/variants/accordion-with-badge";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { Translate } from "@/shared/translation/components/translate/translate";

export function GrantListSidepanel() {
  const { programId } = useParams();
  const [T] = useTranslation();
  const { Panel, open, close, isOpen } = useSidePanel({ name: "grant-list" });

  function togglePanel() {
    (isOpen ? close : open)();
  }

  return (
    <>
      <Button variant={"secondary-light"} size={"l"} onClick={togglePanel}>
        <Translate token={"programs:details.projects.grantProject"} />
      </Button>

      <Panel>
        <SidePanelHeader canClose={true} title={{ token: "programs:grantList.title" }} />

        {/* TODO @hayden handle search */}
        <Input placeholder={T("programs:grantList.search")} startContent={<Icon name={"ri-search-line"} />} />

        <ScrollView>
          <AccordionWithBadge
            items={[
              {
                id: "alreadyGranted",
                titleProps: { translate: { token: "programs:grantList.alreadyGranted" } },
                content: <AlreadyGrantedProjects programId={typeof programId === "string" ? programId : ""} />,
                badgeProps: {
                  children: <AlreadyGrantedBadge programId={typeof programId === "string" ? programId : ""} />,
                  fitContent: true,
                },
              },
              {
                id: "allProjects",
                titleProps: { translate: { token: "programs:grantList.allProjects" } },
                content: <AllProjects />,
                badgeProps: { children: <AllProjectsBadge />, fitContent: true },
              },
            ]}
          />
        </ScrollView>
      </Panel>
    </>
  );
}
