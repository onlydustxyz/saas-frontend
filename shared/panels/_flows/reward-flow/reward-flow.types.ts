import { PropsWithChildren } from "react";

export interface RewardFlowContextProps extends PropsWithChildren {
  projectId?: string;
}

export type SelectedRewardsState = Record<
  number,
  {
    contributionIds: string[];
    amount?: {
      amount: number;
      currencyId: string;
    };
  }
>;

export interface startFlowProps {
  githubUserIds: number[];
  issueIds: string[];
  contributionIds?: string[];
}

export interface RewardFlowContextInterface {
  projectId?: string;
  open: (props: startFlowProps) => void;
  selectedGithubUserIds?: number[];
  selectedIssueIds: string[];
  addContributionIds: (contributionId: string[], githubUserId: number) => void;
  addContributorId: (contributorId: number) => void;
  removeContributorId: (contributorId: number) => void;
  removeContributionId: (contributionId: string, githubUserId: number) => void;
  getSelectedContributionIds: (githubUserId: number) => string[];
}
