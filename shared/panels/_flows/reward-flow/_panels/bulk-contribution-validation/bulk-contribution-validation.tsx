import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { SingleUserSummary } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/_features/single-user-summary/single-user-summary";
import { useBulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";

function Content() {
  const { isOpen } = useBulkContributionValidation();
  const { selectedGithubUserIds, onCreateRewards, isCreatingRewards } = useRewardFlow();

  function handleCreateRewards() {
    onCreateRewards();
  }

  return (
    <>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:bulkContributionValidation.title",
          },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <ScrollView>
          {isOpen && (
            <div className={"flex w-full flex-col gap-lg"}>
              {selectedGithubUserIds.map(githubUserId => (
                <SingleUserSummary githubUserId={githubUserId} key={githubUserId} />
              ))}
            </div>
          )}
        </ScrollView>
      </SidePanelBody>
      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          translate={{
            token: "common:reward",
          }}
          isLoading={isCreatingRewards}
          onClick={() => handleCreateRewards()}
        />
      </SidePanelFooter>
    </>
  );
}

export function BulkContributionValidation() {
  const { name } = useBulkContributionValidation();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
