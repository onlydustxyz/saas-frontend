import { CircleDollarSign, Clock } from "lucide-react";
import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Badge } from "@/design-system/atoms/badge";
import { ButtonGroup } from "@/design-system/atoms/button/variants/button-group";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { CardContributionKanbanNextUiVariants } from "@/design-system/molecules/cards/card-contribution-kanban/adapters/next-ui/next-ui.variants";
import { CardContributionKanbanPort } from "@/design-system/molecules/cards/card-contribution-kanban/card-contribution-kanban.types";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";
import { ContributionInline } from "@/design-system/molecules/contribution-inline";
import { TimelineContribution } from "@/design-system/molecules/timeline-contribution";

import { LabelPopover } from "@/shared/components/label-popover/label-popover";
import { UserGroup } from "@/shared/features/user/user-group/user-group";
import { cn } from "@/shared/helpers/cn";

export function CardContributionKanbanNextUiAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  type,
  githubStatus,
  githubTitle,
  githubNumber,
  lastUpdatedAt,
  rewardUsdAmount,
  applicants,
  contributors,
  linkedIssues,
  githubLabels,
  actions,
  onClick,
}: CardContributionKanbanPort<C>) {
  const Component = as || "div";
  const slots = CardContributionKanbanNextUiVariants();

  const dateKernelPort = bootstrap.getDateKernelPort();
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  function renderRewardAmount() {
    if (!rewardUsdAmount) return null;

    const { amount: rewardAmount, code: rewardCode } = moneyKernelPort.format({
      amount: rewardUsdAmount,
      currency: moneyKernelPort.getCurrency("USD"),
    });

    return (
      <Badge
        color={"grey"}
        size={"xxs"}
        icon={{ component: CircleDollarSign, classNames: { base: "text-components-badge-success-fg" } }}
      >
        {rewardAmount} {rewardCode}
      </Badge>
    );
  }

  function renderUsers() {
    if (applicants?.length) {
      return (
        <div className="flex">
          <UserGroup
            avatarProps={{ size: "xs" }}
            users={applicants}
            maxUsers={2}
            label={{
              size: "xs",
              weight: "regular",
              color: "tertiary",
              translate: {
                token: "cards:cardContributionKanban.applicants",
                count: applicants.length,
              },
            }}
          />
        </div>
      );
    }

    if (contributors?.length) {
      return (
        <div className="flex">
          <UserGroup
            avatarProps={{ size: "xs" }}
            users={contributors}
            maxUsers={2}
            label={{
              size: "xs",
              weight: "regular",
              color: "tertiary",
              translate: {
                token: "cards:cardContributionKanban.contributors",
                count: contributors.length,
              },
            }}
          />
        </div>
      );
    }

    return null;
  }

  function renderLinkedIssues() {
    if (linkedIssues) {
      const linkedIssuesCount = linkedIssues?.length ?? 0;

      if (linkedIssuesCount === 1) {
        const [linkedIssue] = linkedIssues;
        return (
          <ContributionInline
            contributionBadgeProps={{
              type: linkedIssue.type,
              githubStatus: linkedIssue.githubStatus,
              number: linkedIssue.githubNumber,
            }}
            githubTitle={linkedIssue.githubTitle}
            truncate
          />
        );
      }

      return (
        <TimelineContribution
          titleProps={{
            translate: {
              token: "cards:cardContributionKanban.linkedIssues",
              values: { count: linkedIssuesCount },
            },
          }}
          contributions={linkedIssues.map(issue => {
            return {
              githubTitle: issue.githubTitle,
              contributionBadgeProps: {
                type: issue.type,
                githubStatus: issue.githubStatus,
                number: issue.githubNumber,
              },
            };
          })}
        />
      );
    }

    return null;
  }

  function renderGithubLabels() {
    if (githubLabels?.length) {
      return (
        <LabelPopover
          labels={githubLabels.map(({ name }) => name)}
          badgeProps={{
            color: "grey",
            size: "xs",
          }}
        />
      );
    }

    return <div />;
  }

  function renderLastUpdatedAt() {
    if (lastUpdatedAt) {
      return (
        <Typo size={"xs"} classNames={{ base: "flex gap-sm" }} color={"tertiary"}>
          <Icon component={Clock} />
          {dateKernelPort.formatDistanceToNow(new Date(lastUpdatedAt))}
        </Typo>
      );
    }

    return null;
  }

  return (
    <Paper
      as={Component}
      {...htmlProps}
      classNames={{
        base: cn(slots.base(), classNames?.base, { "cursor-pointer": Boolean(onClick) }),
      }}
      size={"lg"}
      background={"secondary"}
      border={"primary"}
      onClick={onClick}
    >
      <header className={"flex items-start justify-between gap-lg"}>
        <Typo size={"xs"} weight={"medium"}>
          {githubTitle}
        </Typo>

        <div>
          <ContributionBadge type={type} githubStatus={githubStatus} number={githubNumber} />
        </div>
      </header>

      <div className={"grid gap-xl"}>
        <div className={"flex items-center gap-md empty:hidden"}>
          {renderLastUpdatedAt()}

          {renderRewardAmount()}
        </div>

        {renderUsers()}

        {renderLinkedIssues()}

        <footer className={"flex justify-between gap-lg overflow-hidden"}>
          {renderGithubLabels()}

          {actions ? <ButtonGroup buttons={actions} size={"xs"} /> : null}
        </footer>
      </div>
    </Paper>
  );
}
