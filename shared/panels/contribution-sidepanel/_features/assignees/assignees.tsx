import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { ContributorProfileCompact } from "@/shared/features/contributors/contributor-profile-compact/contributor-profile-compact";
import { TranslateProps } from "@/shared/translation/components/translate/translate.types";

import { AssigneesProps } from "./assignees.types";

export function Assignees({
  contributors,
  projectId = "",
  contributionId,
  contributionGithubId,
  showRemove,
  type,
}: AssigneesProps) {
  const { mutate, isPending } = ProjectReactQueryAdapter.client.useUnassignProjectContribution({
    pathParams: {
      projectId: "",
      contributionId,
    },
    invalidateTagParams: {
      contribution: {
        pathParams: {
          contributionGithubId: 0,
        },
      },
    },
  });

  function removeContributorButton(githubUserId: number) {
    // if (!showRemove) {
    //   return null;
    // }

    function onClick() {
      mutate({
        assignees: contributors
          .filter(contributor => contributor.githubUserId !== githubUserId)
          .map(contributor => contributor.githubUserId),
      });
    }

    return (
      <Button
        variant={"secondary"}
        classNames={{ base: "w-full" }}
        translate={{ token: "panels:contribution.contributors.removeButton" }}
        onClick={onClick}
        isDisabled={isPending}
      />
    );
  }

  const title: TranslateProps | undefined = useMemo(() => {
    if (type === "assignees") {
      return { token: "panels:contribution.contributors.assignees" };
    }

    if (type === "contributors") {
      return { token: "panels:contribution.contributors.contributors" };
    }

    if (type === "applicants") {
      return { token: "panels:contribution.contributors.applicants" };
    }
  }, [type]);

  if (!contributors?.length) {
    return null;
  }

  return (
    <div className={"flex flex-col gap-lg"}>
      {contributors?.map(contributor => (
        <ContributorProfileCompact
          key={contributor.githubUserId}
          headerProps={{
            headerLabel: { translate: title },
            badgeProps: { children: "2 days ago", color: "success" },
          }}
          user={contributor}
          footerContent={removeContributorButton(contributor.githubUserId)}
        />
      ))}
    </div>
  );
}
