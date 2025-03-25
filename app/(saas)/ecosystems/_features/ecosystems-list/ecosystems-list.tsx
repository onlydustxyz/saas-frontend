import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { EcosystemCard } from "@/app/(saas)/ecosystems/_components/ecosystem-card/ecosystem-card";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Input } from "@/shared/ui/input";
import { ShowMore } from "@/shared/ui/show-more";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyMuted } from "@/shared/ui/typography";

export function EcosystemsList() {
  const [search, setSearch] = useState<string>();
  const [debouncedSearch, setDebouncedSearch] = useState<string>();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    EcosystemReactQueryAdapter.client.useGetEcosystems({
      queryParams: { search: debouncedSearch },
    });

  const ecosystems = useMemo(() => data?.pages.flatMap(({ ecosystems }) => ecosystems) ?? [], [data]);

  const renderEcosystems = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} className="h-64" />);
    }

    if (isError) {
      return (
        <div className="col-span-full p-lg">
          <div className="flex items-center justify-center py-10">
            <TypographyMuted>Error loading ecosystems</TypographyMuted>
          </div>
        </div>
      );
    }

    if (!ecosystems.length) {
      return (
        <div className="col-span-full p-lg">
          <div className="flex items-center justify-center py-10">
            <TypographyMuted>No ecosystems found</TypographyMuted>
          </div>
        </div>
      );
    }

    return ecosystems.map(ecosystem => (
      <EcosystemCard
        key={ecosystem.id}
        href={NEXT_ROUTER.ecosystems.details.root(ecosystem.slug)}
        name={ecosystem.name}
        logoUrl={ecosystem.logoUrl}
        usersCount={ecosystem.contributorCount}
        projectsCount={ecosystem.projectCount}
        description={ecosystem.description}
        languages={ecosystem.languages}
      />
    ));
  }, [isLoading, isError, ecosystems]);

  return (
    <div className="flex h-full flex-col gap-4xl overflow-hidden">
      <header className="flex flex-row items-start justify-between gap-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search ecosystems..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setDebouncedSearch(e.target.value);
            }}
          />
        </div>
      </header>

      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {renderEcosystems}

        {hasNextPage ? (
          <div className="col-span-full">
            <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} hasNextPage={hasNextPage} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
