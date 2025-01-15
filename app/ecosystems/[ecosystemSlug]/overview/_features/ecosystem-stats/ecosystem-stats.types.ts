type Count = {
  value: number;
  diff: number;
};

export interface EcosystemStatsProps {
  activeContributorsCount?: Count;
  activeProjectsCount?: Count;
  availableIssuesCount?: Count;
  mergedPullRequestsCount?: Count;
}
