"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const PROJECT_ROUTES = (projectSlug: string) => [
  { href: NEXT_ROUTER.projects.details.overview.root(projectSlug), label: "Overview" },
  { href: NEXT_ROUTER.projects.details.issues.root(projectSlug), label: "Open Issues" },
  { href: NEXT_ROUTER.projects.details.contributors.root(projectSlug), label: "Contributors" },
  { href: NEXT_ROUTER.projects.details.rewards.root(projectSlug), label: "Rewards" },
  { href: NEXT_ROUTER.projects.details.threads.root(projectSlug), label: "Threads" },
  { href: NEXT_ROUTER.projects.details.channels.root(projectSlug), label: "Channels" },
];

export function ProjectNavigation({ params }: { params: { projectSlug: string } }) {
  const currentPath = usePathname();

  return (
    <Tabs
      defaultValue={NEXT_ROUTER.projects.details.overview.root(params.projectSlug)}
      value={currentPath}
      className="flex w-full flex-col gap-4"
    >
      <TabsList className="h-auto w-full flex-wrap justify-start">
        {PROJECT_ROUTES(params.projectSlug).map(({ href, label }) => (
          <TabsTrigger key={href} value={href} className="flex-1" asChild>
            <Link href={href}>{label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
