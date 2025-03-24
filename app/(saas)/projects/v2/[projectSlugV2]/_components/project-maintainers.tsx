import Link from "next/link";

import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographySmall } from "@/shared/ui/typography";

import { ProjectAsideSection } from "./project-aside-section";

export function ProjectMaintainers({
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
      <ProjectAsideSection.Skeleton>
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-8 w-1/2" />
      </ProjectAsideSection.Skeleton>
    );
  }

  if (isError || !maintainers || maintainers.length === 0) {
    return null;
  }

  return (
    <ProjectAsideSection title="Maintainers">
      <div className="flex flex-col gap-3">
        {maintainers.map(maintainer => (
          <Link
            key={maintainer.login}
            href={NEXT_ROUTER.users.details.root(maintainer.login)}
            className="flex w-fit items-center gap-2"
          >
            <Avatar className="size-8">
              <AvatarImage src={maintainer.avatarUrl} alt={maintainer.login} />
              <AvatarFallback>{maintainer.login.charAt(0)}</AvatarFallback>
            </Avatar>

            <TypographySmall>{maintainer.login}</TypographySmall>
          </Link>
        ))}
      </div>
    </ProjectAsideSection>
  );
}
