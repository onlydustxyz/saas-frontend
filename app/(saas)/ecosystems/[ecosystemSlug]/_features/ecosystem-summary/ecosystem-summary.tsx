import { CornerDownLeft, Folder, UserRound } from "lucide-react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";

import { Languages } from "@/shared/features/projects/languages/languages";
import { Metric } from "@/shared/features/projects/metric/metric";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4 } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { EcosystemSummaryProps } from "./ecosystem-summary.types";

export function EcosystemSummary({ ecosystemSlug }: EcosystemSummaryProps) {
  const {
    data: ecosystem,
    isLoading,
    isError,
  } = EcosystemReactQueryAdapter.client.useGetEcosystemBySlug({
    pathParams: {
      slug: ecosystemSlug,
    },
    options: {
      enabled: Boolean(ecosystemSlug),
    },
  });

  if (isLoading) {
    return (
      <Card className="h-[200px]">
        <Skeleton className="h-full w-full" />
      </Card>
    );
  }

  if (isError || !ecosystem) return null;

  const { description, logoUrl, name, projectCount, contributorCount, languages, links } = ecosystem;

  return (
    <Card>
      <div className="flex flex-col divide-y divide-border-primary">
        <div className="flex flex-row items-center gap-6 p-6 py-4">
          <Avatar className="h-14 w-14 rounded-lg">
            <AvatarImage src={logoUrl ?? ""} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex h-full flex-col justify-between overflow-hidden">
            <h3 className="truncate text-lg font-medium text-foreground">{name}</h3>

            <div className="flex items-center gap-4">
              <Metric icon={Folder} count={projectCount} />
              <Metric icon={UserRound} count={contributorCount} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-6">
            {description ? (
              <div className="flex flex-col gap-2">
                <TypographyH4>Description</TypographyH4>
                <p className="line-clamp-3 text-sm text-foreground">{description}</p>
              </div>
            ) : null}
          </div>

          {languages?.length ? (
            <div className="flex flex-col gap-6">
              <TypographyH4>Languages</TypographyH4>
              <Languages languages={languages} />
            </div>
          ) : null}

          {links?.length ? (
            <div className="flex flex-col gap-6">
              <TypographyH4>Links</TypographyH4>

              <div className="grid gap-4 mobile:grid-cols-2">
                {links.map((link, index) => {
                  const isFirst = index === 0;

                  let domain;
                  try {
                    const urlObject = new URL(link.url);
                    domain = urlObject.hostname;
                  } catch {
                    domain = link.url;
                  }

                  return (
                    <Card key={link.url} className={"overflow-hidden"}>
                      <a href={link.url} target="_blank" className="block px-6 py-4" rel="noreferrer">
                        <div className="relative z-[1] flex items-center gap-2">
                          <div className="flex flex-1 flex-col gap-6">
                            <p className="text-sm font-medium">{link.value}</p>

                            <Badge
                              variant={isFirst ? "default" : "outline"}
                              className={cn(
                                "w-fit max-w-full rounded-sm",
                                isFirst ? "bg-primary" : "text-muted-foreground"
                              )}
                            >
                              <span className="truncate">{domain}</span>
                            </Badge>
                          </div>

                          <CornerDownLeft className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </a>
                    </Card>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
