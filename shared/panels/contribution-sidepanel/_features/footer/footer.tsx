import { Github } from "lucide-react";
import { useMemo } from "react";

import { ContributionReactQueryAdapter } from "@/core/application/react-query-adapter/contribution";

import { ButtonPort } from "@/design-system/atoms/button/button.types";
import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { useContributionActions } from "@/shared/hooks/contributions/use-contribution-actions";
import { ManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal";
import { useManageApplicantsModal } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal.hooks";
import { FooterProps } from "@/shared/panels/contribution-sidepanel/_features/footer/footer.types";

export function Footer({ contribution }: FooterProps) {
  const { isOpen, setIsOpen } = useManageApplicantsModal();

  const actions = useContributionActions(contribution) as ButtonPort<"button">[];

  const { mutate: acceptApplicationMutate } = ContributionReactQueryAdapter.client.usePatchContribution({
    pathParams: { contributionId: contribution?.id ?? "" },
    options: {
      onSuccess: () => {
        setIsOpen(false);
      },
    },
  });

  function handleAssign(githubUserId: number) {
    acceptApplicationMutate({ assignees: [githubUserId] });
  }

  const renderContributionActions = useMemo(() => {
    if (!actions.length && !contribution?.isNotAssigned()) {
      return <div />;
    }

    if (contribution?.isNotAssigned()) {
      return (
        <Button
          size={"md"}
          variant={"secondary"}
          onClick={() => setIsOpen(true)}
          translate={{ token: "panels:contribution.footer.actions.manageInFullPage" }}
        />
      );
    }

    return (
      <div className="flex gap-sm">
        {actions.map((action, index) => (
          <Button key={index} size={"md"} variant={"secondary"} {...action} />
        ))}
      </div>
    );
  }, [actions, contribution]);

  return (
    <SidePanelFooter>
      <div className={"flex w-full flex-row items-center justify-between gap-lg"}>
        <Button
          size={"md"}
          variant={"secondary"}
          as={BaseLink}
          iconOnly
          htmlProps={{ href: contribution?.githubHtmlUrl ?? "", target: "_blank" }}
          startIcon={{
            component: Github,
          }}
        />

        {renderContributionActions}
      </div>
      <ManageApplicantsModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        projectId={"7d04163c-4187-4313-8066-61504d34fc56"}
        issueId={contribution?.githubId}
        onAssign={handleAssign}
      />
    </SidePanelFooter>
  );
}
