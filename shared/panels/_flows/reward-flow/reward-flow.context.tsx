"use client";

import { createContext, useContext, useState } from "react";

import { BulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { BulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection";
import { useBulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection.hooks";
import { SingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { SingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation";
import {
  RewardFlowContextInterface,
  RewardFlowContextProps,
  startFlowProps,
} from "@/shared/panels/_flows/reward-flow/reward-flow.types";

export const RewardFlowContext = createContext<RewardFlowContextInterface>({
  projectId: "",
  open: () => {},
  selectedGithubUserIds: [],
  setSelectedGithubUserIds: () => {},
  selectedIssueIds: [],
  selectedContributionIds: [],
  setSelectedContributionIds: () => {},
});

export function RewardFlowProvider({ children, projectId }: RewardFlowContextProps) {
  const [selectedGithubUserIds, setSelectedGithubUserIds] = useState<number[] | undefined>([]);
  const [selectedIssueIds, setSelectedIssueIds] = useState<string[]>([]);
  const [selectedContributionIds, setSelectedContributionIds] = useState<string[] | undefined>([]);
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: _openBulkContributionFlow } = useBulkContributionSelection();
  const { open: openBulkContributorFlow } = useBulkContributorSelection();

  function onOpenFlow({ githubUserIds, issueIds, contributionIds = [] }: startFlowProps) {
    setSelectedGithubUserIds(githubUserIds);
    setSelectedIssueIds(issueIds);
    setSelectedContributionIds(contributionIds);

    console.log("githubUserIds", githubUserIds);

    if (githubUserIds?.length > 1) {
      openBulkContributorFlow();
    } else {
      openBulkContributorFlow();
      // openSingleFlow();
    }
  }

  return (
    <RewardFlowContext.Provider
      value={{
        projectId,
        open: onOpenFlow,
        selectedGithubUserIds,
        setSelectedGithubUserIds,
        selectedIssueIds,
        selectedContributionIds,
        setSelectedContributionIds,
      }}
    >
      {children}
      <SingleContributionSelection />
      <SingleContributionValidation />
      <BulkContributionSelection />
      <BulkContributorSelection />
    </RewardFlowContext.Provider>
  );
}

export function useRewardFlow() {
  return useContext(RewardFlowContext);
}
