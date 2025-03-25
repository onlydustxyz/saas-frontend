import { useState } from "react";
import { toast } from "sonner";

import { usePublicRepoScope } from "@/core/application/auth0-client-adapter/hooks/use-public-repo-scope";
import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useContributionActions } from "@/shared/hooks/contributions/use-contribution-actions";
import { UseContributionPanelFooter } from "@/shared/panels/contribution-sidepanel/_features/footer/footer.types";
import { Translate } from "@/shared/translation/components/translate/translate";

const useContributionPanelFooterAsMaintainer = ({
  as,
  contribution,
  setIsManageApplicantsModalOpen,
}: UseContributionPanelFooter) => {
  const { buttons, customContent } = useContributionActions({ as, contribution });
  const {
    isProjectOrganisationMissingPermissions: _isProjectOrganisationMissingPermissions,
    canCurrentUserUpdatePermissions: _canCurrentUserUpdatePermissions,
    setIsGithubPermissionModalOpen,
  } = useGithubPermissionsContext();

  const isProjectOrganisationMissingPermissions = _isProjectOrganisationMissingPermissions(contribution.repo.id);
  const canCurrentUserUpdatePermissions = _canCurrentUserUpdatePermissions(contribution.repo.id);

  function handleManageApplicants() {
    if (isProjectOrganisationMissingPermissions) {
      setIsGithubPermissionModalOpen(true);
      return;
    }

    setIsManageApplicantsModalOpen?.(true);
  }

  if (!buttons.length && !customContent && !contribution?.isNotAssigned()) {
    return <div />;
  }

  if (contribution?.isNotAssigned()) {
    return (
      <Button
        size={"md"}
        variant={"primary"}
        onClick={handleManageApplicants}
        translate={{ token: "panels:contribution.footer.actions.manageInFullPage" }}
      />
    );
  }

  if (
    contribution?.isInProgress() &&
    contribution.type !== "PULL_REQUEST" &&
    isProjectOrganisationMissingPermissions &&
    canCurrentUserUpdatePermissions
  ) {
    return (
      <Button
        size={"md"}
        variant={"secondary"}
        onClick={() => setIsGithubPermissionModalOpen(true)}
        translate={{ token: "features:cardContributionKanban.actions.asMaintainer.unassign" }}
      />
    );
  }

  return (
    <div className="flex gap-sm">
      {buttons.map((action, index) => {
        if (action.tooltip) {
          return (
            <Tooltip key={index} {...action.tooltip}>
              <Button size={"md"} variant={"secondary"} {...action} />
            </Tooltip>
          );
        }

        return <Button key={index} size={"md"} variant={"secondary"} {...action} />;
      })}

      {customContent}
    </div>
  );
};

const useContributionPanelFooterAsContributor = ({ contribution }: UseContributionPanelFooter) => {
  const [shouldDeleteComment, setShouldDeleteComment] = useState(false);
  const { close } = useSidePanelsContext();
  const { handleVerifyPermissions, isAuthorized } = usePublicRepoScope();
  const { setIsGithubPublicScopePermissionModalOpen } = useGithubPermissionsContext();

  const { githubUserId } = useAuthUser();

  const applicationId =
    contribution.applicants.find(applicant => applicant.githubUserId === githubUserId)?.applicationId ?? "";

  const { mutate: deleteApplication, isPending: isDeleteApplicationPending } =
    ApplicationReactQueryAdapter.client.useDeleteApplication({
      pathParams: { applicationId },
      options: {
        onSuccess: () => {
          close();
          toast.success(<Translate token={"panels:contribution.footer.tooltip.cancelApplication.success"} />);
        },
        onError: () => {
          toast.error(<Translate token={"panels:contribution.footer.tooltip.cancelApplication.error"} />);
        },
      },
    });

  if (contribution.isArchived()) {
    return <div />;
  }

  function onCancelApplication() {
    if (isDeleteApplicationPending) return;

    if (!isAuthorized) {
      setIsGithubPublicScopePermissionModalOpen(true);
      return;
    }

    handleVerifyPermissions(() => {
      deleteApplication({ deleteGithubComment: shouldDeleteComment });
    });
  }

  if (contribution?.isNotAssigned()) {
    return (
      <div className="flex gap-sm">
        <CheckboxButton
          size={"md"}
          variant={"secondary"}
          value={shouldDeleteComment}
          onChange={value => setShouldDeleteComment(value)}
        >
          <Translate token={"panels:contribution.footer.actions.asContributor.deleteComment"} />
        </CheckboxButton>
        <Button
          size={"md"}
          variant={"primary"}
          onClick={onCancelApplication}
          isLoading={isDeleteApplicationPending}
          translate={{ token: "panels:contribution.footer.actions.asContributor.cancelApplication" }}
        />
      </div>
    );
  }

  if (contribution?.isToReview() || contribution?.isDone()) {
    return (
      <Button
        size={"md"}
        variant={"secondary"}
        as={BaseLink}
        htmlProps={{ href: contribution?.githubHtmlUrl ?? "", target: "_blank" }}
        translate={{ token: "panels:contribution.footer.actions.asContributor.seePrOnGithub" }}
      />
    );
  }
};

export const useContributionPanelFooter = (props: UseContributionPanelFooter) => {
  const maintainer = useContributionPanelFooterAsMaintainer(props);
  const contributor = useContributionPanelFooterAsContributor(props);

  if (props.as === ContributionAs.MAINTAINER) {
    return maintainer;
  }

  if (props.as === ContributionAs.CONTRIBUTOR) {
    return contributor ?? <div />;
  }

  return <div />;
};
