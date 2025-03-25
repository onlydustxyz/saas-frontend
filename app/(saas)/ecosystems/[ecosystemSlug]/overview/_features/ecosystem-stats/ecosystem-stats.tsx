import { CircleDot, Folder, GitPullRequest, User } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Stat } from "@/shared/components/stat";
import { useStatDiffFormatter } from "@/shared/hooks/stats/use-stat-diff-formatter";

import { EcosystemStatsProps } from "./ecosystem-stats.types";

export function EcosystemStats({
  activeContributorsCount,
  activeProjectsCount,
  availableIssuesCount,
  mergedPullRequestsCount,
}: EcosystemStatsProps) {
  const { t } = useTranslation();
  const { formatDiff, getBadgeShadcnColor } = useStatDiffFormatter();

  return (
    <div className="grid w-full grid-cols-2 gap-y-6 border-b border-border-primary py-4 tablet:grid-cols-4 tablet:gap-0">
      <div className="border-r border-border-primary px-4">
        <Stat
          label={t("ecosystems:details.stats.activeContributors")}
          value={Intl.NumberFormat().format(activeContributorsCount?.value ?? 0)}
          iconProps={{
            component: User,
            classNames: {
              base: "text-utility-secondary-yellow-500",
            },
          }}
          badgeProps={
            activeContributorsCount !== undefined
              ? {
                  children: <span className="text-sm text-inherit">{formatDiff(activeContributorsCount.diff)}</span>,
                  variant: getBadgeShadcnColor(activeContributorsCount.diff),
                  classNames: {
                    base: "h-fit min-w-fit",
                  },
                }
              : undefined
          }
        />
      </div>
      <div className="border-border-primary px-4 tablet:border-r">
        <Stat
          label={t("ecosystems:details.stats.activeProjects")}
          value={Intl.NumberFormat().format(activeProjectsCount?.value ?? 0)}
          iconProps={{
            component: Folder,
            classNames: {
              base: "text-utility-secondary-blue-500",
            },
          }}
          badgeProps={
            activeProjectsCount !== undefined
              ? {
                  children: <span className="text-sm text-inherit">{formatDiff(activeProjectsCount.diff)}</span>,
                  variant: getBadgeShadcnColor(activeProjectsCount.diff),
                  classNames: {
                    base: "h-fit min-w-fit",
                  },
                }
              : undefined
          }
        />
      </div>
      <div className="border-border-primary px-4 tablet:border-r">
        <Stat
          label={t("ecosystems:details.stats.availableIssues")}
          value={Intl.NumberFormat().format(availableIssuesCount?.value ?? 0)}
          iconProps={{
            component: CircleDot,
            classNames: {
              base: "text-utility-secondary-green-500",
            },
          }}
          badgeProps={
            availableIssuesCount !== undefined
              ? {
                  children: <span className="text-sm text-inherit">{formatDiff(availableIssuesCount.diff)}</span>,
                  variant: getBadgeShadcnColor(availableIssuesCount.diff),
                  classNames: {
                    base: "h-fit min-w-fit",
                  },
                }
              : undefined
          }
        />
      </div>
      <div className="border-border-primary px-4 tablet:border-r">
        <Stat
          label={t("ecosystems:details.stats.mergedPullRequests")}
          value={Intl.NumberFormat().format(mergedPullRequestsCount?.value ?? 0)}
          iconProps={{
            component: GitPullRequest,
            classNames: {
              base: "text-utility-brand-crystalizedviolet-500",
            },
          }}
          badgeProps={
            mergedPullRequestsCount !== undefined
              ? {
                  children: <span className="text-sm text-inherit">{formatDiff(mergedPullRequestsCount.diff)}</span>,
                  variant: getBadgeShadcnColor(mergedPullRequestsCount.diff),
                  classNames: {
                    base: "h-fit min-w-fit",
                  },
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
