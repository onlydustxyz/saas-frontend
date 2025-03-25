"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { RewardReactQueryAdapter } from "@/core/application/react-query-adapter/reward";
import { ContributionItemDtoInterface } from "@/core/domain/contribution/dto/contribution-item-dto";
import { RewardableItemInterface } from "@/core/domain/reward/models/rewardable-item-model";

import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { BulkContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-selection/bulk-contribution-selection";
import { BulkContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contribution-validation/bulk-contribution-validation";
import { BulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection";
import { useBulkContributorSelection } from "@/shared/panels/_flows/reward-flow/_panels/bulk-contributor-selection/bulk-contributor-selection.hooks";
import { SingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection";
import { useSingleContributionSelection } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-selection/single-contribution-selection.hooks";
import { SingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation";
import {
  AddContributorIdArgs,
  RewardFlowContextInterface,
  RewardFlowContextProps,
  RewardsState,
  SelectedRewardsBudget,
  StartFlowProps,
} from "@/shared/panels/_flows/reward-flow/reward-flow.types";
import { Translate } from "@/shared/translation/components/translate/translate";

const RewardFlowContext = createContext<RewardFlowContextInterface>({
  projectId: "",
  open: () => {},
  removeContribution: () => {},
  getOtherWorks: () => [],
  getSelectedContributions: () => [],
  addOtherWorks: () => {},
  addContributions: () => {},
  updateAmount: () => {},
  getAmount: () => ({ amount: "", budget: undefined }),
  removeAmount: () => {},
  amountPerCurrency: {},
  onCreateRewards: () => null,
  isCreatingRewards: false,
  addContributorId: () => {},
  removeContributorId: () => {},
  selectedGithubUserIds: [],
  removeAllContributions: () => {},
  getAvatarUrl: () => "",
  getLogin: () => "",
});

export function RewardFlowProvider({ children, projectId = "" }: RewardFlowContextProps) {
  const [rewardsState, setRewardsState] = useState<RewardsState>({});
  const { open: openSingleFlow } = useSingleContributionSelection();
  const { open: openBulkContributorFlow } = useBulkContributorSelection();
  const { close, openedPanels } = useSidePanelsContext();

  /***************** LOCAL FUNCTIONS *****************/
  const { mutate, isPending } = RewardReactQueryAdapter.client.useCreateRewards({
    pathParams: {
      projectId,
    },
    options: {
      onSuccess: () => {
        toast.success(<Translate token={"panels:singleContributionValidation.toast.success"} />);
        close();
      },
      onError: () => {
        toast.error(<Translate token={"panels:singleContributionValidation.toast.error"} />);
      },
    },
  });

  function addContributors(
    prev: RewardsState,
    {
      githubUserIds,
      contributions,
      avatarUrls,
      logins,
    }: {
      githubUserIds: number[];
      contributions?: ContributionItemDtoInterface[];
      avatarUrls?: Array<string | undefined>;
      logins?: string[];
    }
  ) {
    return {
      ...githubUserIds.reduce((acc, githubUserId, index) => {
        if (!acc[githubUserId]) {
          acc[githubUserId] = {
            // TODO: this could be an issue if we have multiple contributions for different users
            contributions: contributions ?? [],
            amount: undefined,
            otherWorks: [],
            login: logins?.[index] ?? "",
            avatarUrl: avatarUrls?.[index] ?? "",
          };
        }
        return acc;
      }, prev),
    };
  }

  /***************** ADD AND REMOVE CONTRIBUTORS *****************/

  function addContributorId({ contributorId, avatarUrl, login = "" }: AddContributorIdArgs) {
    setRewardsState(prev =>
      addContributors(prev, { githubUserIds: [contributorId], avatarUrls: [avatarUrl], logins: [login] })
    );
  }

  function removeContributorId(contributorId: number) {
    setRewardsState(prev => {
      const newState = { ...prev };
      delete newState[contributorId];
      return newState;
    });
  }

  /***************** AMOUNT MANAGEMENT *****************/
  function updateAmount(githubUserId: number, amount: SelectedRewardsBudget) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        amount,
      },
    }));
  }

  function getAmount(githubUserId: number) {
    return rewardsState[githubUserId]?.amount ?? { amount: "0" };
  }

  function removeAmount(githubUserId: number) {
    setRewardsState(prev => {
      const newState = { ...prev };
      newState[githubUserId].amount = undefined;
      return newState;
    });
  }

  function getAmountPerCurrency() {
    return Object.values(rewardsState).reduce(
      (acc, { amount }) => {
        const currencyId = amount?.budget?.currency.id;

        if (currencyId) {
          acc[currencyId] = acc[currencyId] ?? { amount: 0 };
          acc[currencyId].amount += Number(amount.amount);
          acc[currencyId].budget = amount.budget;
        }

        return acc;
      },
      {} as Record<string, SelectedRewardsBudget>
    );
  }

  /***************** CONTRIBUTIONS MANAGEMENT *****************/

  function getSelectedContributions(githubUserId: number) {
    return rewardsState[githubUserId]?.contributions || [];
  }

  function addContributions(contributions: ContributionItemDtoInterface[], githubUserId: number) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributions: Array.from(new Set([...(prev[githubUserId]?.contributions || []), ...contributions])),
      },
    }));
  }

  function removeContribution(contribution: ContributionItemDtoInterface, githubUserId: number) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributions: prev[githubUserId]?.contributions.filter(c => !c.isEqualTo(contribution)),
      },
    }));
  }

  function removeAllContributions(githubUserId: number) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        contributions: [],
      },
    }));
  }

  /***************** OTHER WORKS MANAGEMENT *****************/
  function getOtherWorks(githubUserId: number) {
    return rewardsState[githubUserId]?.otherWorks || [];
  }

  function addOtherWorks(otherWorks: RewardableItemInterface[], githubUserId: number) {
    setRewardsState(prev => ({
      ...prev,
      [githubUserId]: {
        ...prev[githubUserId],
        otherWorks: Array.from(new Set([...(prev[githubUserId]?.otherWorks || []), ...otherWorks])),
        contributions: Array.from(
          new Set([...(prev[githubUserId]?.contributions || []), ...otherWorks.map(c => c.toItemDto())])
        ),
      },
    }));
  }

  /***************** FLOW MANAGEMENT *****************/

  function onOpenFlow({ githubUserIds, contributions = [], avatarUrls, logins }: StartFlowProps) {
    setRewardsState(prev => addContributors(prev, { githubUserIds, contributions, avatarUrls, logins }));

    if (githubUserIds.length === 1) {
      openSingleFlow();
    } else {
      openBulkContributorFlow();
    }
  }

  /***************** REWARDS MANAGEMENT *****************/
  function onCreateRewards() {
    mutate(
      Object.entries(rewardsState).map(([githubUserId, { contributions, amount }]) => {
        return {
          recipientId: Number(githubUserId),
          amount: Number(amount?.amount),
          currencyId: amount?.budget?.currency.id ?? "",
          items: contributions,
        };
      })
    );
  }

  /***************** CONTRIBUTOR MANAGEMENT *****************/

  function getAvatarUrl(githubUserId: number) {
    return rewardsState[githubUserId]?.avatarUrl ?? "";
  }

  function getLogin(githubUserId: number) {
    return rewardsState[githubUserId]?.login ?? "";
  }

  useEffect(() => {
    if (openedPanels.length === 0) {
      setRewardsState({});
    }
  }, [openedPanels]);

  const selectedGithubUserIds = Object.keys(rewardsState).map(Number) ?? [];

  const amountPerCurrency = useMemo(() => {
    return getAmountPerCurrency();
  }, [rewardsState]);

  return (
    <RewardFlowContext.Provider
      value={{
        projectId,
        open: onOpenFlow,
        getOtherWorks,
        getSelectedContributions,
        removeContribution,
        addOtherWorks,
        addContributions,
        updateAmount,
        getAmount,
        removeAmount,
        amountPerCurrency,
        addContributorId,
        removeContributorId,
        selectedGithubUserIds,
        removeAllContributions,
        onCreateRewards,
        isCreatingRewards: isPending,
        getAvatarUrl,
        getLogin,
      }}
    >
      {children}
      <SingleContributionSelection />
      <SingleContributionValidation />
      <BulkContributionSelection />
      <BulkContributorSelection />
      <BulkContributionValidation />
    </RewardFlowContext.Provider>
  );
}

export function useRewardFlow() {
  return useContext(RewardFlowContext);
}
