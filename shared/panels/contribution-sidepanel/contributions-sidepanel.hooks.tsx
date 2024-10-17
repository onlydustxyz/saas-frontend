import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

import { useSinglePanelContext } from "@/shared/features/side-panels/side-panel/side-panel";
import { AssignContributors } from "@/shared/panels/contribution-sidepanel/_features/assign-contributors/assign-contributors";
import { Assignees } from "@/shared/panels/contribution-sidepanel/_features/assignees/assignees";
import { IssueOverview } from "@/shared/panels/contribution-sidepanel/_features/issue-overview/issue-overview";
import { LinkedIssues } from "@/shared/panels/contribution-sidepanel/_features/linked-issues/linked-issues";
import { Timeline } from "@/shared/panels/contribution-sidepanel/_features/timeline/timeline";
import { ContributionsPanelData } from "@/shared/panels/contribution-sidepanel/contributions-sidepanel.types";

import { useRewardFlow } from "../_flows/reward-flow/reward-flow.context";
import { Helper } from "./_features/helper/helper";
import { RewardedCardWrapper } from "./_features/rewarded-card-wrapper/rewarded-card-wrapper";

export function useContributionsSidepanel() {
  return useSinglePanelContext<ContributionsPanelData>("contribution-details");
}

interface UseContributionBlocks {
  contribution: ContributionActivityInterface | undefined;
  helperState: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
  };
}

export function useContributionBlocks({ contribution, helperState }: UseContributionBlocks) {
  const { projectId } = useRewardFlow();

  if (!contribution) {
    return null;
  }

  if (contribution.isNotAssigned()) {
    return (
      <>
        <Helper
          type={contribution.activityStatus}
          open={helperState.isOpen}
          onClose={() => helperState.setIsOpen(false)}
        />
        <IssueOverview contribution={contribution} />
        <AssignContributors issueId={contribution.githubId} contributionId={contribution.id} />
      </>
    );
  }

  if (contribution.isInProgress()) {
    return (
      <>
        <IssueOverview contribution={contribution} />
        <Assignees
          showRemove={true}
          contributors={contribution.assignees}
          projectId={projectId}
          contributionId={contribution.id}
          contributionGithubId={contribution.githubId}
          type={"assignees"}
        />
        <Timeline id={contribution.id} />
      </>
    );
  }

  if (contribution.isToReview()) {
    return (
      <>
        <Helper
          type={contribution.activityStatus}
          open={helperState.isOpen}
          onClose={() => helperState.setIsOpen(false)}
        />
        <IssueOverview contribution={contribution} />
        <LinkedIssues issues={contribution.linkedIssues} id={contribution.id} />
        <Assignees
          projectId={projectId}
          contributionId={contribution.id}
          contributionGithubId={contribution.githubId}
          contributors={contribution.contributors}
          type={"contributors"}
        />
        <Timeline id={contribution.id} />
      </>
    );
  }

  if (contribution.isArchived() || contribution.isDone()) {
    return (
      <>
        <IssueOverview contribution={contribution} showLinkedIssues={true} />
        <RewardedCardWrapper contribution={contribution} />
        <Assignees
          projectId={projectId}
          contributionId={contribution.id}
          contributionGithubId={contribution.githubId}
          contributors={contribution.contributors}
          type={"contributors"}
        />
        <Timeline id={contribution.id} />
      </>
    );
  }
}
