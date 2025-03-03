import { TrendingUpIcon } from "lucide-react";

import { CardProjectMarketplace } from "@/design-system/molecules/cards/card-project-marketplace";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { PROJECT_TAG } from "@/shared/constants/project-tags";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";

interface FeaturedProject {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  logoUrl: string;
  contributorCount: number;
  starCount: number;
  forkCount: number;
  availableIssueCount: number;
  goodFirstIssueCount: number;
  categories: Array<{ id: string; name: string }>;
  languages: Array<{
    id: string;
    name: string;
    percentage: number;
    logoUrl: string;
    color?: string;
  }>;
  ecosystems: Array<{
    id: string;
    name: string;
    slug: string;
    logoUrl: string;
  }>;
  tags: PROJECT_TAG[];
}

export function FeaturedProjects() {
  // This would typically come from an API
  const featuredProjects: FeaturedProject[] = [
    {
      id: "1",
      name: "Next.js",
      slug: "vercel/next.js",
      shortDescription: "The React Framework for Production",
      logoUrl: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4",
      contributorCount: 2800,
      starCount: 115000,
      forkCount: 24000,
      availableIssueCount: 150,
      goodFirstIssueCount: 25,
      categories: [
        { id: "web", name: "Web Development" },
        { id: "framework", name: "Framework" },
      ],
      languages: [
        {
          id: "ts",
          name: "TypeScript",
          percentage: 60,
          logoUrl: "/images/languages/typescript.svg",
          color: "#3178C6",
        },
        {
          id: "js",
          name: "JavaScript",
          percentage: 40,
          logoUrl: "/images/languages/javascript.svg",
          color: "#F7DF1E",
        },
      ],
      ecosystems: [
        {
          id: "react",
          name: "React",
          slug: "react",
          logoUrl: "/images/ecosystems/react.svg",
        },
      ],
      tags: [PROJECT_TAG.FAST_AND_FURIOUS, PROJECT_TAG.HAS_GOOD_FIRST_ISSUES],
    },
    {
      id: "2",
      name: "TailwindCSS",
      slug: "tailwindlabs/tailwindcss",
      shortDescription: "A utility-first CSS framework for rapid UI development",
      logoUrl: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
      contributorCount: 850,
      starCount: 75000,
      forkCount: 3800,
      availableIssueCount: 45,
      goodFirstIssueCount: 12,
      categories: [
        { id: "css", name: "CSS" },
        { id: "design", name: "Design" },
      ],
      languages: [
        {
          id: "js",
          name: "JavaScript",
          percentage: 55,
          logoUrl: "/images/languages/javascript.svg",
          color: "#F7DF1E",
        },
        {
          id: "css",
          name: "CSS",
          percentage: 45,
          logoUrl: "/images/languages/css.svg",
          color: "#1572B6",
        },
      ],
      ecosystems: [
        {
          id: "web",
          name: "Web",
          slug: "web",
          logoUrl: "/images/ecosystems/web.svg",
        },
      ],
      tags: [PROJECT_TAG.HOT_COMMUNITY, PROJECT_TAG.NEWBIES_WELCOME],
    },
    {
      id: "3",
      name: "Prisma",
      slug: "prisma/prisma",
      shortDescription: "Next-generation ORM for Node.js & TypeScript",
      logoUrl: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4",
      contributorCount: 450,
      starCount: 35000,
      forkCount: 1800,
      availableIssueCount: 85,
      goodFirstIssueCount: 15,
      categories: [
        { id: "database", name: "Database" },
        { id: "orm", name: "ORM" },
      ],
      languages: [
        {
          id: "ts",
          name: "TypeScript",
          percentage: 70,
          logoUrl: "/images/languages/typescript.svg",
          color: "#3178C6",
        },
        {
          id: "rust",
          name: "Rust",
          percentage: 30,
          logoUrl: "/images/languages/rust.svg",
          color: "#DEA584",
        },
      ],
      ecosystems: [
        {
          id: "nodejs",
          name: "Node.js",
          slug: "nodejs",
          logoUrl: "/images/ecosystems/nodejs.svg",
        },
      ],
      tags: [PROJECT_TAG.LIKELY_TO_REWARD, PROJECT_TAG.HAS_GOOD_FIRST_ISSUES],
    },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUpIcon className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-bold">Featured Projects</h2>
        </div>
      </div>
      <div className="flex gap-6 pb-4">
        {featuredProjects.map(project => (
          <CardProjectMarketplace
            as={BaseLink}
            htmlProps={{
              href: NEXT_ROUTER.projects.details.root(project.slug),
            }}
            name={project.name}
            slug={project.slug}
            description={project.shortDescription}
            logoUrl={project.logoUrl}
            contributorCount={project.contributorCount}
            starCount={project.starCount}
            forkCount={project.forkCount}
            availableIssueCount={project.availableIssueCount}
            goodFirstIssueCount={project.goodFirstIssueCount}
            categories={project.categories}
            languages={project.languages}
            ecosystems={project.ecosystems}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
}
