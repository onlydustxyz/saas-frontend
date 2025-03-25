import onlydustLogoSpace from "@/public/images/logos/onlydust-logo-space.webp";

import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";

export function ProjectAvatar({
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

  if (isError) {
    return null;
  }

  return (
    <Avatar className="h-auto w-full rounded-xl">
      <AvatarImage src={logoUrl} alt={name} className="aspect-square" />
      <AvatarFallback>
        <img className="aspect-square rounded-xl" src={onlydustLogoSpace?.src} alt={name} />
      </AvatarFallback>
    </Avatar>
  );
}
