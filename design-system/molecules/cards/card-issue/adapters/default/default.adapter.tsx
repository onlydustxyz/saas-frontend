import { Book, Clock } from "lucide-react";
import { ElementType } from "react";

import { bootstrap } from "@/core/bootstrap";
import { AnyType } from "@/core/kernel/types";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Icon } from "@/design-system/atoms/icon";
import { Paper } from "@/design-system/atoms/paper";
import { Popover } from "@/design-system/atoms/popover";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";
import { ContributionBadge } from "@/design-system/molecules/contribution-badge";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { cn } from "@/shared/utils";

import { CardIssuePort } from "../../card-issue.types";
import { CardIssueDefaultVariants } from "./default.variants";

function GithubLabel({
  githubLabels,
  githubLabelsProps,
  selectedLabels,
}: Pick<CardIssuePort<AnyType>, "githubLabels" | "githubLabelsProps" | "selectedLabels">) {
  if (!githubLabels?.length) return <div />;

  const limitedLabels = githubLabels?.slice(0, 4);

  function renderLabel({ label, onClick }: NonNullable<CardIssuePort<AnyType>["githubLabels"]>[number]) {
    const isSelected = selectedLabels?.includes(label);
    return (
      <Badge
        key={label}
        size="xs"
        color={isSelected ? "brand" : "grey"}
        {...(githubLabelsProps ?? {})}
        onClick={onClick}
      >
        {label}
      </Badge>
    );
  }

  return (
    <div className="flex flex-row flex-wrap items-center gap-1">
      {limitedLabels?.map(({ label, description, onClick }) =>
        description ? (
          <Tooltip key={label} content={description}>
            {renderLabel({ label, description, onClick })}
          </Tooltip>
        ) : (
          renderLabel({ label, description, onClick })
        )
      )}

      {limitedLabels?.length < githubLabels?.length ? (
        <Popover>
          <Popover.Trigger>
            {() => (
              <div className="cursor-pointer">
                <Badge key={"more"} size="xs" color={"grey"} {...(githubLabelsProps ?? {})}>
                  +{githubLabels?.length - limitedLabels?.length}
                </Badge>
              </div>
            )}
          </Popover.Trigger>

          <Popover.Content>
            {() => (
              <div className="h-fit w-fit overflow-hidden">
                <ScrollView className={"max-h-[300px]"}>
                  <div className="flex w-fit flex-col gap-2">
                    {githubLabels?.map(({ label, description }) => renderLabel({ label, description }))}
                  </div>
                </ScrollView>
              </div>
            )}
          </Popover.Content>
        </Popover>
      ) : null}
    </div>
  );
}

export function CardIssueDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  contribution,
  repo,
  title,
  users,
  titleProps,
  createdAt,
  createdBy,
  contributionBadgeProps,
  usersAvatarsProps,
  githubLabels,
  githubLabelsProps,
  selectedLabels,
  onClick,
}: CardIssuePort<C>) {
  const slots = CardIssueDefaultVariants();
  const dateKernelPort = bootstrap.getDateKernelPort();
  const createdSince = createdAt ? dateKernelPort.formatDistanceToNow(new Date(createdAt)) : null;

  return (
    <Paper
      as={as}
      {...htmlProps}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      background="secondary"
      border="primary"
      onClick={onClick}
      size="lg"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between gap-1">
          <div className="flex flex-1 flex-row items-center gap-1 overflow-hidden">
            {contribution && (
              <ContributionBadge showNumberOnHover {...contribution} {...(contributionBadgeProps ?? {})} />
            )}
            {title && (
              <Typo
                size="md"
                weight="medium"
                classNames={{ base: "text-ellipsis flex-1 whitespace-nowrap overflow-hidden" }}
                {...(titleProps ?? {})}
              >
                {title}
              </Typo>
            )}
          </div>
          {users?.length ? (
            <AvatarGroup
              size="sm"
              quantity={3}
              {...(usersAvatarsProps ?? {})}
              avatars={users?.map(u => ({
                src: u.avatarUrl,
              }))}
            />
          ) : null}
        </div>

        <div className="flex flex-col justify-between gap-lg tablet:flex-row tablet:items-center tablet:gap-1">
          <GithubLabel
            githubLabels={githubLabels}
            githubLabelsProps={githubLabelsProps}
            selectedLabels={selectedLabels}
          />

          <div className="flex flex-row flex-wrap items-center justify-end gap-2">
            {!!createdSince && (
              <div className="flex flex-row items-center justify-start gap-1">
                <Icon component={Clock} />
                <Typo size="xs" weight="medium" color="secondary">
                  {createdSince}
                </Typo>
              </div>
            )}
            {!!createdBy && (
              <div className="flex flex-row items-center justify-start gap-1">
                <Avatar shape="squared" size="xs" src={createdBy.avatarUrl} />
                <Typo size="xs" weight="medium" color="secondary">
                  <Typo as="span" size="xs" weight="medium" color="tertiary">
                    By &nbsp;
                  </Typo>
                  {createdBy.login}
                </Typo>
              </div>
            )}
            {!!repo && (
              <div className="flex flex-row items-center justify-start gap-1">
                <Icon component={Book} />
                <Typo
                  size="xs"
                  weight="medium"
                  color="secondary"
                  as="a"
                  htmlProps={{ href: repo.url, target: "_blank" }}
                >
                  {repo.name}
                </Typo>
              </div>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
}
