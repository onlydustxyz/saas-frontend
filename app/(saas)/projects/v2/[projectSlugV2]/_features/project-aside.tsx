"use client";

import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";
import Link from "next/link";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/separator";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyMuted, TypographySmall } from "@/shared/ui/typography";

function ProjectAvatar({
  logoUrl,
  name,
  isLoading,
  isError,
}: {
  logoUrl?: ProjectInterfaceV2["logoUrl"];
  name?: ProjectInterfaceV2["name"];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return <Skeleton className="aspect-square w-full" />;
  }

  if (isError || !logoUrl) {
    return null;
  }

  return (
    <Avatar className="h-auto w-full rounded-xl border-4 border-background">
      <AvatarImage src={logoUrl} alt={name} className="aspect-square" />
      <AvatarFallback>
        <img className="aspect-square rounded-xl" src={onlydustLogoSpace?.src} alt={name} />
      </AvatarFallback>
    </Avatar>
  );
}

function ProjectLanguages({
  languages,
  isLoading,
  isError,
}: {
  languages?: ProjectInterfaceV2["languages"];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <section className="space-y-3">
        <Skeleton className="h-7 w-full" />

        <Skeleton className="h-2 w-full" />

        <Skeleton className="h-5 w-1/2" />
      </section>
    );
  }

  if (isError || !languages) {
    return null;
  }

  return (
    <section className="space-y-3">
      <TypographyH4>Languages</TypographyH4>

      <div className="space-y-3">
        <div className="flex h-2 w-full overflow-hidden rounded-full bg-foreground">
          {languages.map(lang => (
            <div
              key={lang.name}
              className="h-full"
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color || "#9CA3AF",
              }}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {languages.map(lang => (
            <div key={lang.name} className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: lang.color }} />
              <TypographyMuted>
                {lang.name} {lang.percentage}%
              </TypographyMuted>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectMaintainers({
  maintainers,
  isLoading,
  isError,
}: {
  maintainers?: ProjectInterfaceV2["leads"];
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <section className="space-y-3">
        <Skeleton className="h-7 w-full" />

        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-1/2" />
      </section>
    );
  }

  if (isError || !maintainers || maintainers.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <TypographyH4>Maintainers</TypographyH4>

      <div className="flex flex-col gap-3">
        {maintainers.map(maintainer => (
          <Link
            key={maintainer.login}
            href={NEXT_ROUTER.users.details.root(maintainer.login)}
            className="flex items-center gap-2"
          >
            <Avatar className="size-8">
              <AvatarImage src={maintainer.avatarUrl} alt={maintainer.login} />
              <AvatarFallback>{maintainer.login.charAt(0)}</AvatarFallback>
            </Avatar>

            <TypographySmall>{maintainer.login}</TypographySmall>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ProjectAside({ projectSlug }: { projectSlug: string }) {
  const {
    data: project,
    isLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  return (
    <aside className="space-y-4">
      <ProjectAvatar logoUrl={project?.logoUrl} name={project?.name} isLoading={isLoading} isError={isError} />
      <ProjectLanguages languages={project?.languages} isLoading={isLoading} isError={isError} />
      <Separator />
      <ProjectMaintainers maintainers={project?.leads} isLoading={isLoading} isError={isError} />
    </aside>
  );
}
