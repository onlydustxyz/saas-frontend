"use client";

import { useCallback, useMemo, useState } from "react";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";
import { GetHackathonProjectsV2QueryParams } from "@/core/domain/hackathon/hackathon-contract.types";

import { Typo } from "@/design-system/atoms/typo";
import {
  CardProjectMarketplace,
  CardProjectMarketplaceLoading,
} from "@/design-system/molecules/cards/card-project-marketplace";
import { TableSearch } from "@/design-system/molecules/table-search/variants/table-search-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { withClientOnly } from "@/shared/components/client-only/client-only";
import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { FilterButton } from "@/shared/features/filters/_components/filter-button/filter-button";
import { FilterDataProvider } from "@/shared/features/filters/_contexts/filter-data/filter-data.context";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { cn } from "@/shared/helpers/cn";
import { useAuthContext } from "@/shared/providers/auth-provider";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterData } from "./_components/filter-data/filter-data";
import { useHackathonProjectsFilterDataSidePanel } from "./_components/filter-data/filter-data.hooks";

export type HackathonProjectsFilters = Omit<NonNullable<GetHackathonProjectsV2QueryParams>, "pageSize" | "pageIndex">;

const sortSeed = Math.floor(Math.random() * 10);

const mockProjects = Array.from({ length: 9 }).map((_, index) => ({
  id: `mock-project-${index}`,
  name: "Why did you unblur me?",
  slug: `mock-project-${index}`,
  shortDescription:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius voluptates aliquid eligendi et vero, optio temporibus dolores deserunt, deleniti minima quaerat voluptatum placeat quidem? Veritatis quidem hic incidunt in est!",
  contributorCount: 6,
  starCount: 6,
  forkCount: 6,
  odhackIssueCount: 42,
}));

function HackathonProjectsPage({ params }: { params: { hackathonSlug: string } }) {
  const { isAuthenticated } = useAuthContext();
  const [search, setSearch] = useState<string>();
  const { open: openFilterPanel } = useHackathonProjectsFilterDataSidePanel();
  const [filters, setFilters] = useState<HackathonProjectsFilters>({});
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const queryParams: Partial<GetHackathonProjectsV2QueryParams> = {
    search: debouncedSearch,
    sortSeed,
    ...filters,
  };

  const { data: hackathon } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug: params.hackathonSlug,
    },
    options: {
      enabled: Boolean(params.hackathonSlug),
    },
  });

  const { data: hackathonRegistration } = MeReactQueryAdapter.client.useGetMyHackathonRegistration({
    pathParams: { hackathonId: hackathon?.id ?? "" },
    options: {
      enabled: Boolean(hackathon?.id) && isAuthenticated,
    },
  });

  const isRegistered = hackathonRegistration?.isRegistered ?? false;
  const canAccessProjects = hackathon?.isPast() || (hackathon?.isLive() && isRegistered);

  const renderProjectMessage = useCallback(() => {
    if (hackathon?.isComingSoon()) {
      const formattedDates = hackathon.formatDisplayDates();

      if (formattedDates) {
        return `This section will become available once the event begins on ${formattedDates.startDate} at ${formattedDates.startTime}.`;
      }

      return "This section will become available once the event begins.";
    }

    if (!isRegistered) {
      return "Register now to access the full project list.";
    }

    return "The projects are not available yet.";
  }, [hackathon, isRegistered]);

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    HackathonReactQueryAdapter.client.useGetHackathonProjects({
      pathParams: {
        hackathonSlug: params.hackathonSlug,
      },
      queryParams,
      options: {
        enabled: Boolean(params.hackathonSlug) && canAccessProjects,
      },
    });

  const projects = useMemo(() => data?.pages.flatMap(({ projects }) => projects) ?? [], [data]);
  const totalItemNumber = useMemo(() => data?.pages[0]?.totalItemNumber ?? 0, [data]);

  const renderProjects = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 8 }).map((_, index) => <CardProjectMarketplaceLoading key={index} />);
    }

    if (isError) {
      return (
        <div className="col-span-full p-lg">
          <ErrorState />
        </div>
      );
    }

    if (!projects.length) {
      return (
        <div className="col-span-full p-lg">
          <EmptyStateLite />
        </div>
      );
    }

    const urlSearchParams = new URLSearchParams();

    if (hackathon?.id) {
      urlSearchParams.set("h", hackathon.id);
    }

    return projects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        as={BaseLink}
        htmlProps={{
          href: hackathon?.isLive()
            ? `${NEXT_ROUTER.projects.details.root(project.slug)}?${urlSearchParams.toString()}`
            : NEXT_ROUTER.projects.details.root(project.slug),
        }}
        name={project.name}
        slug={project.slug}
        description={project.shortDescription}
        logoUrl={project.logoUrl}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        categories={project.categories}
        languages={project.languages}
        ecosystems={project.ecosystems}
        tags={project.tags}
        odHackStats={project.odHackStats}
      />
    ));
  }, [isLoading, isError, projects]);

  const renderMockProjects = useMemo(() => {
    return mockProjects.map(project => (
      <CardProjectMarketplace
        key={project.id}
        name={project.name}
        slug={project.slug}
        description={project.shortDescription}
        contributorCount={project.contributorCount}
        starCount={project.starCount}
        forkCount={project.forkCount}
        odHackStats={{
          issueCount: project.odhackIssueCount,
          availableIssueCount: project.odhackIssueCount,
        }}
      />
    ));
  }, [isLoading, isError, projects]);

  return (
    <FilterDataProvider filters={filters} setFilters={setFilters}>
      <PosthogCaptureOnMount
        eventName={"hackathon_viewed"}
        params={{
          hackathon_id: hackathon?.id,
        }}
        paramsReady={Boolean(hackathon?.id)}
      />

      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Open-Source Week",
            href: NEXT_ROUTER.osw.root,
          },
          {
            id: "slug",
            label: params.hackathonSlug,
          },
          {
            id: "projects",
            label: <Translate token={"osw:details.tabs.projects"} />,
          },
        ]}
      />
      <div className="flex h-full flex-col gap-lg overflow-hidden p-lg pb-0">
        {canAccessProjects ? (
          <nav className={"flex gap-md"}>
            <FilterButton onClick={openFilterPanel} />
            <TableSearch value={search} onChange={setSearch} onDebouncedChange={setDebouncedSearch} />
          </nav>
        ) : null}

        <div className="relative h-full">
          <ScrollView
            className={cn("max-h-[calc(100%-2rem)]", {
              "blur-xl": !canAccessProjects,
            })}
          >
            <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {canAccessProjects ? renderProjects : renderMockProjects}

              {hasNextPage ? (
                <div className="col-span-full">
                  <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
                </div>
              ) : null}
            </div>
          </ScrollView>

          {!canAccessProjects ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Typo>{renderProjectMessage()}</Typo>
            </div>
          ) : null}
        </div>

        {canAccessProjects ? (
          <div className="flex gap-md">
            <Typo size={"sm"} color={"secondary"} translate={{ token: "osw:details.projects.projectsCount" }} />
            <Typo size={"sm"} color={"primary"}>
              {totalItemNumber}
            </Typo>
          </div>
        ) : null}
      </div>
      <FilterData />
    </FilterDataProvider>
  );
}

export default withClientOnly(HackathonProjectsPage);
