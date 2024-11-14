import { useState } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";
import { ContributionAs } from "@/core/domain/contribution/models/contribution.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { CheckboxButton } from "@/design-system/molecules/checkbox-button";
import { toast } from "@/design-system/molecules/toaster";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { useGithubPermissionsContext } from "@/shared/features/github-permissions/github-permissions.context";
import { useSidePanelsContext } from "@/shared/features/side-panels/side-panels.context";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { useContributionActions } from "@/shared/hooks/contributions/use-contribution-actions";
import { UseContributionPanelFooter } from "@/shared/panels/contribution-sidepanel/_features/footer/footer.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export const useContributionPanelFooterAsMaintainer = ({
  as,
  contribution,
  setIsManageApplicantsModalOpen,
}: UseContributionPanelFooter) => {
  const { buttons, endContent } = useContributionActions({ as, contribution });
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

  if (!buttons.length && !endContent && !contribution?.isNotAssigned()) {
    return <div />;
  }

  if (contribution?.isNotAssigned()) {
    return (
      <Button
        size={"md"}
        variant={"secondary"}
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
      {endContent}
    </div>
  );
};

export const useContributionPanelFooterAsContributor = ({ contribution }: UseContributionPanelFooter) => {
  const [shouldDeleteComment, setShouldDeleteComment] = useState(false);
  const { close } = useSidePanelsContext();

  const { githubUserId } = useAuthUser();

  const applicationId =
    contribution.applicants.find(applicant => applicant.githubUserId === githubUserId)?.applicationId ?? "";

  // TODO handle Github permissions
  const { mutate, isPending } = ApplicationReactQueryAdapter.client.useDeleteApplication({
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
    mutate({ deleteGithubComment: shouldDeleteComment });
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
          variant={"secondary"}
          onClick={onCancelApplication}
          isLoading={isPending}
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
    return contributor;
  }

  return <div />;
};
