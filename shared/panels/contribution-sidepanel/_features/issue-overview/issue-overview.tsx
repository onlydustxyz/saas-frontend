import { CardContributionKanban as Card } from "@/design-system/molecules/cards/card-contribution-kanban";

import { IssueOverviewProps } from "./issue-overview.types";

export function IssueOverview({ contribution }: IssueOverviewProps) {
  return (
    <Card
      type={contribution.type}
      githubTitle={contribution.githubTitle}
      githubStatus={contribution.githubStatus}
      githubNumber={contribution.githubNumber}
      lastUpdatedAt={contribution.lastUpdatedAt}
      githubLabels={contribution.githubLabels}
      languages={contribution.languages}
      repo={contribution.repo}
      linkedIssues={contribution.linkedIssues}
      rewardUsdAmount={contribution.totalRewardedUsdAmount}
      githubHtmlUrl={contribution.githubHtmlUrl}
    />
  );
}
