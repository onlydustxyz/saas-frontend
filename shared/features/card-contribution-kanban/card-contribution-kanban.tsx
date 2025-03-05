import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { ButtonGroupPort } from "@/design-system/atoms/button/button.types";
import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { useContributionActions } from "@/shared/hooks/contributions/use-contribution-actions";

import { CardContributionKanbanProps } from "./card-contribution-kanban.types";

export function CardContributionKanban({
  contribution,
  classNames,
  showContributors = true,
  showProject = false,
  showLanguages = false,
  showRepo = false,
  as,
  ...actions
}: CardContributionKanbanProps) {
  const { buttons, customContent } = useContributionActions({ as, contribution });
  const rewardUsdAmount =
    as === ContributionAs.CONTRIBUTOR ? contribution.callerTotalRewardedUsdAmount : contribution.totalRewardedUsdAmount;

  return (
    <Card
      classNames={classNames}
      type={contribution.type}
      githubTitle={contribution.githubTitle}
      githubStatus={contribution.githubStatus}
      githubNumber={contribution.githubNumber}
      lastUpdatedAt={contribution.lastUpdatedAt}
      rewardUsdAmount={rewardUsdAmount}
      applicants={contribution.isNotAssigned() ? contribution.applicants : []}
      contributors={showContributors ? contribution.contributors : []}
      linkedIssues={contribution.linkedIssues}
      githubLabels={contribution.githubLabels}
      languages={showLanguages ? contribution.languages : []}
      repo={showRepo ? contribution.repo : undefined}
      project={showProject ? contribution.project : undefined}
      actions={buttons as ButtonGroupPort["buttons"]}
      onClick={() => actions?.onAction?.(contribution.id)}
      githubHtmlUrl={contribution.githubHtmlUrl}
      customContent={customContent}
    />
  );
}
