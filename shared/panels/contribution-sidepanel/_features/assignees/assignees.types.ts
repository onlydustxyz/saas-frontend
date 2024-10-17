import { ContributionActivityInterface } from "@/core/domain/contribution/models/contribution-activity-model";

export interface AssigneesProps {
  contributors:
    | ContributionActivityInterface["applicants"]
    | ContributionActivityInterface["contributors"]
    | ContributionActivityInterface["assignees"];
  showRemove?: boolean;
  type?: "applicants" | "contributors" | "assignees";
  projectId?: string;
  contributionId: string;
  contributionGithubId: number;
}
