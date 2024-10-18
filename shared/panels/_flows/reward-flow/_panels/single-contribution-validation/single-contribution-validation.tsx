import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";
import { DetailedTotalMoneyTotalPerCurrency } from "@/core/kernel/money/money.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { UserProfileCard } from "@/shared/panels/_flows/reward-flow/_panels/_components/user-profile-card/user-profile-card";
import { AmountSelectorSummary } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/_components/amount-selector-summary/amount-selector-summary";
import { useSingleContributionValidation } from "@/shared/panels/_flows/reward-flow/_panels/single-contribution-validation/single-contribution-validation.hooks";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

function Content() {
  const { isOpen } = useSingleContributionValidation();
  const {
    getSelectedContributions,
    selectedGithubUserIds,
    updateAmount,
    getAmount,
    onCreateRewards,
    isCreatingRewards,
  } = useRewardFlow();

  const [selectedGithubUserId] = selectedGithubUserIds ?? [];
  const selectedContributions = getSelectedContributions(selectedGithubUserId);
  const { amount, budget } = getAmount(selectedGithubUserId);
  const amountNumber = Number(amount);
  const isRewardingDisabled = amountNumber <= 0 || (budget && amountNumber > budget.amount);
  const contributionStoragePort = bootstrap.getContributionStoragePortForClient();

  // TODO replace with /contributions with contribution ids once implemented
  const { data: contributions, isLoading } = useQueries({
    queries: selectedContributions.map(c => {
      const { tag, request } = contributionStoragePort.getContributionsById({
        pathParams: {
          contributionGithubId: c.githubId,
        },
      });

      return {
        queryKey: tag,
        queryFn: request,
        enabled: Boolean(selectedContributions) && isOpen,
      };
    }),
    combine: results => {
      return {
        data: results.map(result => result.data).filter(Boolean),
        isLoading: results.some(result => result.isLoading),
      };
    },
  });

  const nonNullContributions = useMemo(
    () => contributions?.filter(Boolean) ?? [],
    [contributions]
  ) as ContributionActivityInterface[];

  function handleAmountChange(amount: string) {
    updateAmount(selectedGithubUserId, { budget, amount });
  }

  function handleBudgetChange(budget?: DetailedTotalMoneyTotalPerCurrency) {
    updateAmount(selectedGithubUserId, { budget, amount });
  }

  function handleCreateRewards() {
    if (amountNumber > 0 && selectedGithubUserIds) {
      onCreateRewards();
    }
  }

  function getTimelineContributionProps() {
    if (!isLoading && Boolean(contributions)) {
      return {
        titleProps: {
          children: (
            <>
              <Translate token={"common:contributions"} /> ({selectedContributions?.length})
            </>
          ),
        },
        contributions: nonNullContributions.map(c => ({
          githubTitle: c.githubTitle,
          contributionBadgeProps: {
            type: c.type,
            githubStatus: c.githubStatus,
            number: c.githubNumber,
          },
        })),
      };
    }
  }

  return (
    <>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:singleContributionValidation.title",
          },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <UserProfileCard
          timelineContributionProps={getTimelineContributionProps()}
          githubUserId={selectedGithubUserId}
        />

        <AmountSelectorSummary
          amount={amount}
          budget={budget}
          onAmountChange={handleAmountChange}
          onBudgetChange={handleBudgetChange}
        />
      </SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"secondary"}
          size={"md"}
          translate={{
            token: "common:reward",
          }}
          isDisabled={isRewardingDisabled}
          isLoading={isCreatingRewards}
          onClick={() => handleCreateRewards()}
        />
      </SidePanelFooter>
    </>
  );
}

export function SingleContributionValidation() {
  const { name } = useSingleContributionValidation();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
