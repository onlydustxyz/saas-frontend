"use client";

import { createContext, useContext, useState } from "react";

import { ContributionItemDto } from "@/core/domain/contribution/dto/contribution-item-dto";
import { CreateRewardsBody } from "@/core/domain/reward/reward-contract.types";

import { BulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection";
import { useBulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection.hooks";
import { BulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation";
import { SingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { SingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation";
import {
  RewardFlowContextInterface,
  RewardFlowContextProps,
  RewardsState,
  SelectedRewardsBudget,
  startFlowProps,
} from "@/shared/panels/_flows/reward-flow/reward-flow.types";

export const RewardFlowContext = createContext<RewardFlowContextInterface>({
  projectId: "",
  open: () => {},
  selectedGithubUserIds: [],
  removeContribution: () => {},
  getSelectedContributions: () => [],
  addContributions: () => {},
  updateAmount: () => {},
  getAmount: () => ({ amount: "", budget: undefined }),
  getRewardBody: () => [],
});

export function RewardFlowProvider({ children, projectId }: RewardFlowContextProps) {
  const [selectedGithubUserIds, setSelectedGithubUserIds] = useState<number[]>([]);
  const [rewardsState, setRewardsState] = useState<RewardsState>({});
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: openBulkFlow } = useBulkContributionSelection();

  function addContributions(contributions: ContributionItemDto[], githubUserId: number) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributions: Array.from(new Set([...(prev[githubUserId]?.contributions || []), ...contributions])),
      },
    }));
  }

  function removeContribution(contribution: ContributionItemDto, githubUserId: number) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributions: prev[githubUserId].contributions.filter(c => !c.isEqualTo(contribution)),
      },
    }));
  }

  function updateAmount(githubUserId: number, amount: SelectedRewardsBudget) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        amount,
      },
    }));
  }

  function getSelectedContributions(githubUserId: number) {
    return rewardsState[githubUserId]?.contributions || [];
  }

  function getAmount(githubUserId: number) {
    return rewardsState[githubUserId]?.amount ?? { amount: "0" };
  }

  function onOpenFlow({ githubUserIds, contributions = [] }: startFlowProps) {
    setSelectedGithubUserIds(githubUserIds);
    setRewardsState(
      githubUserIds.reduce((acc, githubUserId) => {
        return {
          ...acc,
          [githubUserId]: {
            contributions,
            amount: undefined,
          },
        };
      }, {})
    );

    if (githubUserIds?.length > 1) {
      openBulkFlow();
    } else {
      openSingleFlow();
    }
  }

  function getRewardBody(): CreateRewardsBody {
    return Object.entries(rewardsState).map(([githubUserId, { contributions, amount }]) => {
      return {
        recipientId: Number(githubUserId),
        amount: Number(amount?.amount),
        currencyId: amount?.budget?.currency.id ?? "",
        items: contributions,
      };
    });
  }

  return (
    <RewardFlowContext.Provider
      value={{
        projectId,
        open: onOpenFlow,
        selectedGithubUserIds,
        getSelectedContributions,
        removeContribution,
        addContributions,
        updateAmount,
        getAmount,
        getRewardBody,
      }}
    >
      {children}
      <SingleContributionSelection />
      <SingleContributionValidation />
      <BulkContributionSelection />
      <BulkContributionValidation />
    </RewardFlowContext.Provider>
  );
}

export function useRewardFlow() {
  return useContext(RewardFlowContext);
}
