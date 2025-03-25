import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyMuted } from "@/shared/ui/typography";

import { ProjectAsideSection } from "./project-aside-section";

export function ProjectLanguages({
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
      <ProjectAsideSection.Skeleton>
        <Skeleton className="h-2 w-full" />

        <Skeleton className="h-5 w-1/2" />
      </ProjectAsideSection.Skeleton>
    );
  }

  if (isError || !languages || languages.length === 0) {
    return null;
  }

  return (
    <ProjectAsideSection title="Languages">
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
    </ProjectAsideSection>
  );
}
