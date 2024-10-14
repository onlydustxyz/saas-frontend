import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UserContributions } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-contributions/user-contributions";
import { UserProfileCard } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-profile-card/user-profile-card";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

import { OtherWorkSidepanel } from "../../_features/other-work-sidepanel/other-work-sidepanel";
import { useOtherWorkSidepanel } from "../../_features/other-work-sidepanel/other-work-sidepanel.hooks";

export function SingleContributionSelection() {
  const { name } = useSingleContributionSelection();
  const { Panel } = useSidePanel({ name });
  const { selectedGithubUserIds } = useRewardFlow();
  const { open } = useOtherWorkSidepanel();
  const [selectedGithubUserId] = selectedGithubUserIds;

  return (
    <>
      <Panel>
        <SidePanelHeader
          title={{
            translate: {
              token: "panels:singleContributionSelection.title",
            },
          }}
          canClose
        />

        <SidePanelBody>
          <UserProfileCard />

          <Paper size={"lg"} background={"transparent"} border={"primary"} classNames={{ base: "flex-1" }}>
            <UserContributions githubUserId={selectedGithubUserId} />
          </Paper>

          <Button variant={"secondary"} size={"sm"} classNames={{ base: "w-full" }} onClick={() => open()}>
            Open other work
          </Button>
        </SidePanelBody>

        <SidePanelFooter>
          <Button
            variant={"secondary"}
            size={"md"}
            translate={{
              token: "common:next",
            }}
            onClick={() => alert("Open next panel")}
          />
        </SidePanelFooter>
      </Panel>

      <OtherWorkSidepanel />
    </>
  );
}
