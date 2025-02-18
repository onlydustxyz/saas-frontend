import { CircleCheck, CircleX, Eye, GitPullRequest, Medal, Undo2 } from "lucide-react";

import { bootstrap } from "@/core/bootstrap";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";

import { AcceptIgnoreApplication } from "@/shared/components/mutation/application/accept-ignore-application/accept-ignore-application";
import { ApplicationLimitBadge } from "@/shared/features/application-limit-badge/application-limit-badge";
import { useContributorSidePanel } from "@/shared/panels/contributor-sidepanel/contributor-sidepanel.hooks";
import { Translate } from "@/shared/translation/components/translate/translate";

import { ApplicationCardProps } from "./application-card.types";

export function ApplicationCard({ application, contributionId, isIgnored, repoId }: ApplicationCardProps) {
  const { applicationId = "", contributor, rewardCount, prCount } = application;
  const { open } = useContributorSidePanel();
  const dateKernelPort = bootstrap.getDateKernelPort();

  function openProfile() {
    open({
      githubId: contributor.githubUserId,
      canGoBack: true,
      applicationId,
    });
  }

  return (
    <Paper background="transparent" border="none" classNames={{ base: "flex gap-md justify-between" }}>
      <div className="flex gap-lg">
        <Avatar size="sm" shape="squared" src={contributor.avatarUrl} />

        <div className="flex flex-col gap-md">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-1">
              <Typo size="sm" weight="medium">
                {contributor.login}
              </Typo>
              <ApplicationLimitBadge count={11} />
            </div>

            <Typo size="xs" color="secondary">
              {application.contributor.rank.getTitle().wording} • {application.contributor.rank.getRank()}
              {" • "}
              <Translate token={"panels:contributor.rank"} count={application.contributor.globalRankPercentile} />
            </Typo>
          </div>

          <div className="flex flex-wrap gap-md">
            <Tooltip content={<Translate token="panels:contribution.applications.tooltips.rewards" />}>
              <Badge
                size="xs"
                icon={{
                  component: Medal,
                }}
              >
                {rewardCount.value}
              </Badge>
            </Tooltip>

            <Tooltip content={<Translate token="panels:contribution.applications.tooltips.mergedPullRequests" />}>
              <Badge
                size="xs"
                icon={{
                  component: GitPullRequest,
                }}
              >
                {prCount.value}
              </Badge>
            </Tooltip>

            {application.appliedAt ? (
              <Badge size="xs">{dateKernelPort.format(new Date(application.appliedAt), "dd.MM.yyyy")}</Badge>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex gap-md">
        <Button
          variant="secondary"
          size="xs"
          iconOnly
          startIcon={{
            component: Eye,
          }}
          onClick={openProfile}
        />
        <AcceptIgnoreApplication applicationId={applicationId} contributionId={contributionId} repoId={repoId}>
          {({ accept, ignore, unignore, isUpdating, isDisabled }) => (
            <>
              {!isIgnored ? (
                <Button
                  variant="secondary"
                  size="xs"
                  iconOnly
                  startIcon={{
                    component: CircleX,
                  }}
                  onClick={ignore}
                  isLoading={isUpdating}
                  isDisabled={isDisabled}
                />
              ) : (
                <Button
                  variant="secondary"
                  size="xs"
                  iconOnly
                  startIcon={{
                    component: Undo2,
                  }}
                  onClick={unignore}
                  isLoading={isUpdating}
                  isDisabled={isDisabled}
                />
              )}

              <Button
                variant="secondary"
                size="xs"
                iconOnly
                startIcon={{
                  component: CircleCheck,
                }}
                onClick={accept}
                isLoading={isUpdating}
                isDisabled={isDisabled}
              />
            </>
          )}
        </AcceptIgnoreApplication>
      </div>
    </Paper>
  );
}
