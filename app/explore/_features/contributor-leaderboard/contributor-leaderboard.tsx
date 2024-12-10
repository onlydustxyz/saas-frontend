"use client";

import { useCallback } from "react";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";

import { Badge } from "@/design-system/atoms/badge/variants/badge-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelSingle, AvatarLabelSingleLoading } from "@/design-system/molecules/avatar-label-single";

import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { ErrorState } from "@/shared/components/error-state/error-state";

export function ContributorLeaderboard() {
  // TODO @Mehdi check for the appropriate endpoints once ready
  const { data, isLoading, isError } = BiReactQueryAdapter.client.useGetBiContributors({
    queryParams: {
      sortDirection: "ASC",
      sort: "PR_COUNT",
      pageSize: 6,
    },
  });

  const renderContributors = useCallback(() => {
    if (isLoading) {
      return Array.from({ length: 6 }).map((_, index) => <AvatarLabelSingleLoading key={index} size="md" />);
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!data) {
      return (
        <EmptyState
          titleTranslate={{ token: "explore:contributorLeaderboard.emptyState.title" }}
          descriptionTranslate={{ token: "explore:contributorLeaderboard.emptyState.description" }}
        />
      );
    }

    return data.pages.flatMap(({ contributors }) =>
      contributors.map((contributor, index) => (
        <div key={contributor.contributor.id} className="flex items-center gap-md">
          <Typo size="sm" weight="medium" color="tertiary" classNames={{ base: "tabular-nums" }}>
            {index + 1}
          </Typo>
          <div className="flex flex-1 items-center justify-between gap-md">
            <AvatarLabelSingle
              size="md"
              avatar={{ src: contributor.contributor.avatarUrl, alt: contributor.contributor.login }}
              title={{ children: contributor.contributor.login }}
              description={{ children: contributor.contributor.bio || "" }}
            />
            <Badge
              classNames={{ base: "w-fit shrink-0" }}
              translate={{
                token: "common:count.prCount",
                count: contributor.prCount.value,
              }}
            />
          </div>
        </div>
      ))
    );
  }, [data, isError, isLoading]);

  return (
    <Paper background="primary-alt" px="xl" py="xl">
      <div className="flex flex-col gap-md">
        <Typo
          variant="heading"
          size="xs"
          weight="medium"
          translate={{ token: "explore:contributorLeaderboard.title" }}
        />
        <Typo color="secondary" size="xs" translate={{ token: "explore:contributorLeaderboard.description" }} />
      </div>
      <div className="mt-xl flex flex-col gap-lg">{renderContributors()}</div>
    </Paper>
  );
}
