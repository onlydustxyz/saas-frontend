import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { useIssueSandboxPanel } from "@/shared/panels/issue-sandbox-panel/issue-sandbox-panel.hooks";

import { IssueSandboxPanelData } from "./issue-sandbox-panel.types";

export function IssueSandboxPanel() {
  const { name } = useIssueSandboxPanel();
  const { Panel } = useSidePanel({ name });
  const { id } = useSinglePanelData<IssueSandboxPanelData>(name) ?? {
    id: "",
  };

  return (
    <Panel>
      <SidePanelHeader canGoBack={false} canClose={true} title={{ children: "Issues sandbox" }} />
      <SidePanelBody>{id}</SidePanelBody>
    </Panel>
  );
}