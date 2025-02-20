import { useParams } from "next/navigation";
import { toast } from "sonner";

import { GithubReactQueryAdapter } from "@/core/application/react-query-adapter/github";
import { IssueReactQueryAdapter } from "@/core/application/react-query-adapter/issue";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ContributionActivityStatus } from "@/core/domain/contribution/models/contribution.types";

import { Badge } from "@/design-system/atoms/badge";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { useActionPooling } from "@/shared/hooks/action-pooling/action-pooling.context";
import {
  UseContributionActionReturn,
  UseContributionActionsProps,
} from "@/shared/hooks/contributions/use-contribution-actions";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { useCanReward } from "../rewards/use-can-reward";

export const useContributionAsMaintainerActions = ({
  contribution,
}: UseContributionActionsProps): UseContributionActionReturn => {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();

  const { open: openRewardFlow, removeContributorId, selectedGithubUserIds } = useRewardFlow();
  const { startPooling, shouldRefetch } = useActionPooling();
  const { isProjectOrganisationMissingPermissions, canCurrentUserUpdatePermissions, setIsGithubPermissionModalOpen } =
    useGithubPermissionsContext();

  const canReward = useCanReward(projectSlug);

  const { mutate: updatePullRequest, isPending: isUpdatingPullRequest } =
    GithubReactQueryAdapter.client.useUpdatePullRequest({
      pathParams: {
        contributionUuid: contribution.id,
      },
      options: {
        onSuccess: () => {
          toast.success(<Translate token={"features:cardContributionKanban.toasts.updatePullRequest.success"} />);
        },
        onError: () => {
          toast.error(<Translate token={"features:cardContributionKanban.toasts.updatePullRequest.error"} />);
        },
      },
    });

  const {
    mutate: updateIssues,
    mutateAsync: updateIssuesAsync,
    isPending: isUpdatingIssue,
  } = IssueReactQueryAdapter.client.useUpdateIssue({
    pathParams: {
      contributionUuid: contribution.id,
    },
    options: {
      onSuccess: () => {
        toast.success(<Translate token={"features:cardContributionKanban.toasts.updateIssue.success"} />);
      },
      onError: () => {
        toast.error(<Translate token={"features:cardContributionKanban.toasts.updateIssue.error"} />);
      },
    },
  });

  const { mutate: unassignContribution, isPending: isUnassigningContribution } =
    ProjectReactQueryAdapter.client.useUnassignContributorFromProjectContribution({
      pathParams: {
        contributionUuid: contribution.id,
        projectId: contribution.project?.id ?? "",
        contributorId: contribution.contributors[0]?.githubUserId,
      },
      options: {
        onSuccess: () => {
          toast.success(<Translate token={"features:cardContributionKanban.toasts.unassign.success"} />);
          startPooling();
        },
        onError: () => {
          toast.error(<Translate token={"features:cardContributionKanban.toasts.unassign.error"} />);
        },
      },
    });


  function onUnassign() {
    if (isProjectOrganisationMissingPermissions(contribution.repo.id)) {
      setIsGithubPermissionModalOpen(true);
      return;
    }
    unassignContribution({});
  }

  async function onArchive() {
    if (contribution.isIssue()) {
      updateIssues({
        archived: true,
      });
    } else if (contribution.isPullRequest()) {
      updatePullRequest({
        archived: true,
      });
    }
  }

  function onReward() {
    selectedGithubUserIds.forEach(removeContributorId);

    openRewardFlow({
      contributions: [contribution.toItemDto()],
      githubUserIds: contribution.contributors.map(contributor => contributor.githubUserId),
      avatarUrls: contribution.contributors.map(contributor => contributor.avatarUrl),
      logins: contribution.contributors.map(contributor => contributor.login),
    });
  }

  async function onUnarchive() {
    if (contribution.isIssue()) {
      updateIssues({
        archived: false,
      });
    } else if (contribution.isPullRequest()) {
      updatePullRequest({
        archived: false,
      });
    }
  }

  async function onCloseIssue() {
    if (isProjectOrganisationMissingPermissions(contribution.repo.id)) {
      setIsGithubPermissionModalOpen(true);
      return;
    }

    await updateIssuesAsync({
      closed: true,
    });

    startPooling();
  }

  switch (contribution.activityStatus) {
    case ContributionActivityStatus.NOT_ASSIGNED:
      return {
        buttons: [
          {
            children: <Translate token={"features:cardContributionKanban.actions.asMaintainer.review"} />,
            classNames: {
              base: "pointer-events-none",
            },
          },
        ],
      };
    case ContributionActivityStatus.IN_PROGRESS:
      if (contribution.isPullRequest()) return { buttons: [] };

      if (
        isProjectOrganisationMissingPermissions(contribution.repo.id) &&
        !canCurrentUserUpdatePermissions(contribution.repo.id)
      ) {
        return {
          buttons: [],
          customContent: (
            <Tooltip content={<Translate token="features:cardContributionKanban.tooltip.insufficientPermissions" />}>
              <Badge
                size="xs"
                color="warning"
                shape="rounded"
                translate={{ token: "features:cardContributionKanban.actions.insufficientPermissions" }}
              />
            </Tooltip>
          ),
        };
      }

      return {
        buttons: [
          ...(contribution.contributors.length
            ? [
                {
                  children: <Translate token={"features:cardContributionKanban.actions.asMaintainer.unassign"} />,
                  onClick: onUnassign,
                  isLoading: isUnassigningContribution,
                  isDisabled: !!shouldRefetch,
                },
              ]
            : []),
          ...(contribution.isIssue()
            ? [
                {
                  children: <Translate token={"features:cardContributionKanban.actions.asMaintainer.close"} />,
                  onClick: onCloseIssue,
                  isLoading: isUpdatingIssue,
                  isDisabled: !!shouldRefetch,
                },
              ]
            : []),
        ],
      };
    case ContributionActivityStatus.TO_REVIEW:
      return {
        buttons: [],
      };
    case ContributionActivityStatus.DONE:
      return {
        buttons: [
          {
            children: <Translate token={"features:cardContributionKanban.actions.asMaintainer.archive"} />,
            onClick: onArchive,
            isDisabled: isUpdatingPullRequest || isUpdatingIssue,
          },
          {
            children: <Translate token={"features:cardContributionKanban.actions.asMaintainer.reward"} />,
            onClick: onReward,
            isDisabled: !canReward,
            tooltip: {
              enabled: !canReward,
              content: <Translate token={"common:tooltip.disabledReward"} />,
            },
          },
        ],
      };
    case ContributionActivityStatus.ARCHIVED:
      return {
        buttons: [
          {
            children: <Translate token={"features:cardContributionKanban.actions.asMaintainer.unarchive"} />,
            onClick: onUnarchive,
            isLoading: isUpdatingPullRequest || isUpdatingIssue,
          },
        ],
      };
    default:
      return { buttons: [] };
  }
};
