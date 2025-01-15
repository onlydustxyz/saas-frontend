import { CircleDot, Folder, GitPullRequest, User } from "lucide-react";

import { Typo } from "@/design-system/atoms/typo";

import { Stat } from "@/shared/components/stat/stat";

import { EcosystemStatsProps } from "./ecosystem-stats.types";

export function EcosystemStats({
  activeContributorsCount,
  activeProjectsCount,
  availableIssuesCount,
  mergedPullRequestsCount,
}: EcosystemStatsProps) {
  function formatDiff(diff?: number) {
    if (diff === undefined) return null;
    const formatted = Intl.NumberFormat().format(Math.abs(diff));
    return diff === 0 ? formatted : `${diff < 0 ? "-" : "+"}${formatted}`;
  }

  function getBadgeColor(diff?: number) {
    if (diff === undefined || diff === 0) return "grey";
    return diff < 0 ? "error" : "success";
  }

  return (
    <div className="grid w-full grid-cols-2 gap-y-xl border-b-1 border-border-primary py-lg tablet:grid-cols-4 tablet:gap-0">
      <div className="border-r-1 border-border-primary px-lg">
        <Stat
          label={{ token: "ecosystems:details.stats.activeContributors" }}
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
                  children: <Typo size="xs">{formatDiff(activeContributorsCount.diff)}</Typo>,
                  color: getBadgeColor(activeContributorsCount.diff),
                  classNames: {
                    base: "h-fit min-w-fit",
                  },
                }
              : undefined
          }
        />
      </div>
      <div className="border-border-primary px-lg tablet:border-r-1">
        <Stat
          label={{ token: "ecosystems:details.stats.activeProjects" }}
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
                  children: <Typo size="xs">{formatDiff(activeProjectsCount.diff)}</Typo>,
                  color: getBadgeColor(activeProjectsCount.diff),
                  classNames: {
                    base: "h-fit min-w-fit",
                  },
                }
              : undefined
          }
        />
      </div>
      <div className="border-border-primary px-lg tablet:border-r-1">
        <Stat
          label={{ token: "ecosystems:details.stats.availableIssues" }}
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
                  children: <Typo size="xs">{formatDiff(availableIssuesCount.diff)}</Typo>,
                  color: getBadgeColor(availableIssuesCount.diff),
                  classNames: {
                    base: "h-fit min-w-fit",
                  },
                }
              : undefined
          }
        />
      </div>
      <div className="border-border-primary px-lg tablet:border-r-1">
        <Stat
          label={{ token: "ecosystems:details.stats.mergedPullRequests" }}
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
                  children: <Typo size="xs">{formatDiff(mergedPullRequestsCount.diff)}</Typo>,
                  color: getBadgeColor(mergedPullRequestsCount.diff),
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
