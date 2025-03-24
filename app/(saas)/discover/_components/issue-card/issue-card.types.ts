import { ContributionGithubStatusUnion } from "@/core/domain/contribution/models/contribution.types";

export interface IssueCardProps {
  title: string;
  onClick?: () => void;
  languages: {
    name: string;
    logoUrl: string;
  }[];
  project: {
    logoUrl?: string;
    name: string;
    repo: string;
  };
  issue: {
    number: number;
    githubStatus: ContributionGithubStatusUnion;
  };
  createdAt: string;
  labels: string[];
}
