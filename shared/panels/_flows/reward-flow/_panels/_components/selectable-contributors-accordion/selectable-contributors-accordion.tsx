import { useMemo, useState } from "react";

import { UserReactQueryAdapter } from "@/core/application/react-query-adapter/user";

import { Accordion } from "@/design-system/molecules/accordion";
import { TableSearch } from "@/design-system/molecules/table-search";

import { ContributorProfileCheckbox } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox";
import { ContributorProfileCheckboxLoading } from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox.loading";
import { useRewardFlow } from "@/shared/panels/_flows/reward-flow/reward-flow.context";
import { TypographyMuted } from "@/shared/ui/typography";

export function SelectableContributorsAccordion() {
  const { selectedGithubUserIds, addContributorId, removeContributorId } = useRewardFlow();
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const { data, isLoading } = UserReactQueryAdapter.client.useSearchUser({
    queryParams: {
      login: debouncedSearch,
    },
    options: {
      enabled: Boolean(selectedGithubUserIds),
    },
  });

  const contributors = useMemo(() => {
    // Combine internal and external contributors into a single array, using empty arrays if undefined
    const allContributors = [...(data?.internalContributors ?? []), ...(data?.externalContributors ?? [])];

    // Create a Map using githubUserId as key to deduplicate contributors
    // Map.values() returns unique contributors since duplicate IDs were overwritten
    // Convert back to array using spread operator
    return [...new Map(allContributors.map(contributor => [contributor.githubUserId, contributor])).values()];
  }, [data]);

  function handleSelectedContributors({
    checked,
    contributorId,
    avatarUrl,
    login,
  }: {
    checked: boolean;
    contributorId: number;
    avatarUrl?: string;
    login?: string;
  }) {
    if (checked) {
      addContributorId({ contributorId, avatarUrl, login });
    } else {
      removeContributorId(contributorId);
    }
  }

  const renderContributors = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => <ContributorProfileCheckboxLoading key={index} />);
    }

    if (!contributors.length) {
      return (
        <TypographyMuted className="py-10 text-center">
          We couldn&apos;t find the contributor you&apos;re looking for.
          <br />
          To reward them, you can invite them to join OnlyDust.
        </TypographyMuted>
      );
    }

    return (
      <>
        {contributors.map(contributor => (
          <ContributorProfileCheckbox
            key={contributor.githubUserId}
            avatarUrl={contributor.avatarUrl}
            login={contributor.login}
            value={selectedGithubUserIds?.includes(contributor.githubUserId)}
            onChange={checked =>
              handleSelectedContributors({
                checked,
                contributorId: contributor.githubUserId,
                avatarUrl: contributor.avatarUrl,
                login: contributor.login,
              })
            }
          />
        ))}
      </>
    );
  }, [contributors, isLoading, selectedGithubUserIds]);

  return (
    <>
      <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />

      <Accordion
        classNames={{ base: "flex flex-col gap-3" }}
        id={"contributors"}
        titleProps={{
          translate: { token: "panels:bulkContributorsSelection.contributorsAccordion.title" },
          size: "xs",
          weight: "medium",
        }}
        defaultSelected={["contributors"]}
      >
        <div className="flex flex-col gap-2">{renderContributors}</div>
      </Accordion>
    </>
  );
}
