import { useMemo } from "react";

import { useGrantFromPanel } from "@/app/(saas)/programs/[programId]/_features/grant-form-sidepanel/grant-form-sidepanel.hooks";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { FirstParameter } from "@/core/kernel/types";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { CardProject } from "@/design-system/molecules/cards/card-project";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { ShowMore } from "@/shared/components/show-more/show-more";

export function AllProjects({
  programId,
  queryParams,
}: {
  programId: string;
  queryParams: FirstParameter<typeof ProjectReactQueryAdapter.client.useGetProjectsV2>["queryParams"];
}) {
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectReactQueryAdapter.client.useGetProjectsV2({
      queryParams,
    });
  const allProjects = useMemo(() => data?.pages.flatMap(page => page.projects) ?? [], [data]);

  const { open: openGrantForm } = useGrantFromPanel();

  function handleOpenProjectGrant(projectId: string) {
    openGrantForm({ programId, projectId });
  }

  if (isLoading) {
    return (
      <div className={"grid gap-2"}>
        <Skeleton classNames={{ base: "h-24" }} />
        <Skeleton classNames={{ base: "h-24" }} />
        <Skeleton classNames={{ base: "h-24" }} />
      </div>
    );
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <>
      {allProjects.map(project => {
        const description = project.truncateDescription(25);

        return (
          <div key={project.id}>
            <CardProject
              title={project.name}
              description={description}
              logoUrl={project.logoUrl}
              languages={project.languages?.map(language => ({ children: language.name }))}
              buttonProps={{
                children: "0 USD",
              }}
              onClick={() => handleOpenProjectGrant(project.id)}
              size={"none"}
              background={"transparent"}
              border={"none"}
            />
          </div>
        );
      })}

      {hasNextPage ? <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} /> : null}
    </>
  );
}
