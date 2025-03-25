import { CircleDollarSign, Coins, GitFork, GitMerge, HandCoins, Loader2, Star, User } from "lucide-react";
import type { ElementType } from "react";
import type { ComponentProps } from "react";
import { useCallback, useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";
import { ProjectTag } from "@/core/domain/project/project.types";

import { Categories } from "@/shared/features/projects/categories/categories";
import { Languages } from "@/shared/features/projects/languages/languages";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";

interface CardProjectProps<T extends ElementType = "div"> extends Omit<ComponentProps<"div">, "as"> {
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string | null;
  contributorCount?: number;
  starCount?: number;
  forkCount?: number;
  availableIssueCount?: number;
  goodFirstIssueCount?: number;
  categories?: Array<{ id: string; name: string }>;
  languages?: Array<{
    id: string;
    name: string;
    percentage: number;
    logoUrl: string;
    color?: string;
    transparentLogoUrl?: string;
  }>;
  ecosystems?: Array<{ id: string; name: string; slug: string; logoUrl: string }>;
  tags?: Array<ProjectTag | string>;
  odHackStats?: {
    issueCount?: number;
    availableIssueCount?: number;
  };
  contributorsStats?: {
    totalRewardedUsdAmount?: number;
    mergedPrCount?: number;
  };
  as?: T;
  htmlProps?: ComponentProps<T>;
  className?: string;
}

export function CardProject<T extends ElementType = "div">({
  name,
  description,
  logoUrl,
  contributorCount,
  starCount,
  forkCount,
  availableIssueCount,
  goodFirstIssueCount,
  categories,
  languages,
  ecosystems,
  tags,
  odHackStats,
  contributorsStats,
  as,
  htmlProps,
  className,
  ...props
}: CardProjectProps<T>) {
  const Component = as || "div";
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  // Check if project is likely to reward contributions
  const isLikelyToReward = useMemo(() => {
    if (!tags?.length) return false;
    return tags.includes(ProjectTag.LIKELY_TO_REWARD);
  }, [tags]);

  // Check if project has retroactive grants
  const hasRetroactiveGrant = useMemo(() => {
    return Boolean(ecosystems?.find(ecosystem => ecosystem.slug === "stellar" || ecosystem.slug === "starknet"));
  }, [ecosystems]);

  // Render the tags/badges
  const renderRewardBadge = useCallback(() => {
    if (!isLikelyToReward) return null;

    return (
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary" className="flex h-6 w-6 items-center justify-center rounded-full p-0">
            <HandCoins className="h-3.5 w-3.5" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          <p className="text-sm">
            <strong>Likely to reward:</strong> Projects with a high chance of rewarding valuable contributions.
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }, [isLikelyToReward]);

  const renderRetroactiveBadge = useCallback(() => {
    if (!hasRetroactiveGrant) return null;

    return (
      <Tooltip>
        <TooltipTrigger>
          <Badge variant="secondary" className="flex h-6 w-6 items-center justify-center rounded-full p-0">
            <Coins className="h-3.5 w-3.5" />
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="end" className="max-w-xs">
          <p className="text-sm">
            <strong>Retroactive Grants:</strong> If a project is eligible for grants, OnlyDust will reward valuable
            contributions monthly.{" "}
            <a href="https://blog.onlydust.com/docs/faq-2/" target="_blank" rel="noreferrer" className="underline">
              More info here
            </a>
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }, [hasRetroactiveGrant]);

  // Stats
  const renderContributorsStats = useCallback(() => {
    if (!contributorsStats) return null;

    const { amount } = moneyKernelPort.format({
      amount: contributorsStats.totalRewardedUsdAmount ?? 0,
      currency: moneyKernelPort.getCurrency("USD"),
      options: {
        notation: "compact",
        compactDisplay: "short",
        maximumSignificantDigits: 2,
      },
    });

    return (
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex flex-col rounded-md bg-muted/50 p-2">
          <span className="text-xs text-muted-foreground">Rewards</span>
          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{amount}</span>
          </div>
        </div>
        <div className="flex flex-col rounded-md bg-muted/50 p-2">
          <span className="text-xs text-muted-foreground">Merged PRs</span>
          <div className="flex items-center gap-2">
            <GitMerge className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium">{contributorsStats.mergedPrCount || 0}</span>
          </div>
        </div>
      </div>
    );
  }, [contributorsStats, moneyKernelPort]);

  // Render issue buttons
  const renderIssueButtons = useMemo(() => {
    const buttons = [];

    if (availableIssueCount !== undefined) {
      buttons.push(
        <div key="available" className="flex flex-col rounded-md bg-muted/50 p-2">
          <span className="text-xs text-muted-foreground">Available Issues</span>
          <div className="flex items-center gap-2">
            <div className="relative flex h-4 w-4 items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-emerald-500"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <span className="text-sm font-medium">{availableIssueCount}</span>
          </div>
        </div>
      );
    }

    if (goodFirstIssueCount !== undefined) {
      buttons.push(
        <div key="good-first" className="flex flex-col rounded-md bg-muted/50 p-2">
          <span className="text-xs text-muted-foreground">Good First Issues</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-medium">{goodFirstIssueCount}</span>
          </div>
        </div>
      );
    }

    if (odHackStats?.availableIssueCount !== undefined) {
      buttons.push(
        <div key="odhack" className="flex flex-col rounded-md bg-muted/50 p-2">
          <span className="text-xs text-muted-foreground">ODHack Issues</span>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium">
              {odHackStats.availableIssueCount}/{odHackStats.issueCount || odHackStats.availableIssueCount}
            </span>
          </div>
        </div>
      );
    }

    if (buttons.length === 0) return null;

    return <div className="mb-4 grid grid-cols-2 gap-2">{buttons}</div>;
  }, [availableIssueCount, goodFirstIssueCount, odHackStats]);

  return (
    <Component {...htmlProps} className={className} {...props}>
      <Card className="h-full overflow-hidden transition-all hover:opacity-70 hover:shadow-sm">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-start gap-3">
            {logoUrl && (
              <div className="relative h-14 w-14 overflow-hidden rounded-md border bg-muted">
                <img src={logoUrl} alt={name} className="h-full w-full object-cover" />
                {ecosystems && ecosystems.length > 0 && (
                  <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-background text-xs font-medium shadow-sm ring-1 ring-muted">
                            {ecosystems.length === 1 ? (
                              <img src={ecosystems[0].logoUrl} alt={ecosystems[0].name} className="h-full w-full" />
                            ) : (
                              ecosystems.length
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="start">
                          <div className="flex flex-col gap-2">
                            {ecosystems.map(ecosystem => (
                              <div key={ecosystem.id} className="flex items-center gap-2">
                                <div className="h-4 w-4 overflow-hidden rounded-sm">
                                  <img src={ecosystem.logoUrl} alt={ecosystem.name} className="h-full w-full" />
                                </div>
                                <span className="text-sm">{ecosystem.name}</span>
                              </div>
                            ))}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-bold leading-tight">{name}</h2>
                <div className="flex gap-1">
                  {renderRewardBadge()}
                  {renderRetroactiveBadge()}
                </div>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{starCount || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  <span>{forkCount || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{contributorCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          {renderIssueButtons}
          {renderContributorsStats()}

          {description && <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{description}</p>}

          {categories && categories.length > 0 && (
            <div className="mb-2">
              <Categories categories={categories} />
            </div>
          )}

          {languages && languages.length > 0 && (
            <div className="mb-2">
              <Languages languages={languages} />
            </div>
          )}
        </CardContent>
      </Card>
    </Component>
  );
}
