"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { Card } from "@/shared/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { EcosystemDocumentation } from "./_features/ecosystem-documentation/ecosystem-documentation";
import { EcosystemEvents } from "./_features/ecosystem-events/ecosystem-events";
import { EcosystemSummary } from "./_features/ecosystem-summary/ecosystem-summary";

const ECOSYSTEM_ROUTES = (ecosystemSlug: string) => [
  { href: NEXT_ROUTER.ecosystems.details.overview.root(ecosystemSlug), label: "Overview" },
  { href: NEXT_ROUTER.ecosystems.details.projects.root(ecosystemSlug), label: "Projects" },
  { href: NEXT_ROUTER.ecosystems.details.community.root(ecosystemSlug), label: "Community" },
];

function Navigation({ params }: { params: { ecosystemSlug: string } }) {
  const currentPath = usePathname();
  return (
    <Tabs defaultValue={NEXT_ROUTER.ecosystems.details.overview.root(params.ecosystemSlug)} value={currentPath}>
      <TabsList className="h-auto w-full flex-wrap justify-start">
        {ECOSYSTEM_ROUTES(params.ecosystemSlug).map(({ href, label }) => (
          <TabsTrigger key={href} value={href} className="flex-1" asChild>
            <Link href={href}>{label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default function EcosystemLayout({
  params,
  children,
}: {
  params: { ecosystemSlug: string };
  children: ReactNode;
}) {
  return (
    <PageContainer size="medium" className={"flex-1"}>
      <div className="flex flex-col items-start justify-start gap-4 pt-4 laptop:h-full laptop:flex-row">
        <div className="flex w-full flex-col gap-4 laptop:sticky laptop:top-20 laptop:w-[440px] laptop:min-w-[440px]">
          <EcosystemSummary ecosystemSlug={params.ecosystemSlug} />
          <EcosystemEvents ecosystemSlug={params.ecosystemSlug} />
          <EcosystemDocumentation ecosystemSlug={params.ecosystemSlug} />
        </div>

        <Card className={"flex flex-col overflow-hidden pb-xl tablet:h-full desktop:flex-1"}>
          <div className={"flex w-full flex-row items-end justify-between gap-1 px-4 py-6"}>
            <Navigation params={params} />
          </div>
          {children}
        </Card>
      </div>
    </PageContainer>
  );
}
