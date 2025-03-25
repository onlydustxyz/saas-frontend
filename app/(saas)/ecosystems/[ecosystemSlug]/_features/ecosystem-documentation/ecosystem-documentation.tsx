import { CornerDownLeft } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { EcosystemReactQueryAdapter } from "@/core/application/react-query-adapter/ecosystem";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4 } from "@/shared/ui/typography";

import { EcosystemDocumentationProps } from "./ecosystem-documentation.types";

export function EcosystemDocumentation({ ecosystemSlug }: EcosystemDocumentationProps) {
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

  const renderDocumentations = useMemo(() => {
    if (isLoading) {
      return (
        <Card className="h-[200px]">
          <Skeleton className="h-full w-full" />
        </Card>
      );
    }

    if (isError) {
      return <ErrorState />;
    }

    return ecosystem?.documentations.map(documentation => (
      <Link key={documentation.name} href={documentation.url} target="_blank">
        <Card className="flex items-center justify-between gap-4 bg-muted p-6 hover:opacity-80">
          <div className="flex flex-col gap-2 overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground">{documentation.name}</p>
            <p className="line-clamp-3 text-sm text-muted-foreground">{documentation.description}</p>
          </div>
          <CornerDownLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
        </Card>
      </Link>
    ));
  }, [isLoading, isError, ecosystem]);

  if (!ecosystem?.documentations.length) {
    return null;
  }

  return (
    <Card className="flex flex-col divide-y divide-border-primary">
      <div className="flex flex-col p-6">
        <TypographyH4 className="text-sm">Documentation</TypographyH4>
      </div>
      <div className="flex flex-col gap-4 p-6">{renderDocumentations}</div>
    </Card>
  );
}
