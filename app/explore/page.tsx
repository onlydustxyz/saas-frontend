"use client";

import { Section } from "@/app/explore/_components/section/section";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { BrowseProjects } from "./_features/browse-projects/browse-projects";
import { ContributorLeaderboard } from "./_features/contributor-leaderboard/contributor-leaderboard";
import { ProjectCategoryList } from "./_features/project-category-list/project-category-list";
import { ProjectLeaderboard } from "./_features/project-leaderboard/project-leaderboard";
import { TrendingProjects } from "./_features/trending-projects/trending-projects";

export default function ExplorePage() {
  return (
    <ScrollView>
      <div className="mx-auto flex max-w-laptop flex-col gap-6xl py-4xl">
        <Section
          title={{
            translate: { token: "explore:trending.title" },
          }}
          // TODO @hayden get the number of trending projects
          count={100}
          description={{
            translate: { token: "explore:trending.description" },
          }}
        >
          <TrendingProjects />
        </Section>

        <Section
          title={{
            translate: { token: "explore:expertise.title" },
          }}
          description={{
            translate: { token: "explore:expertise.description" },
          }}
        >
          <div className="flex flex-col gap-6xl">
            <ProjectCategoryList />

            <div className="grid gap-xl tablet:grid-cols-2 laptop:gap-3xl">
              <ContributorLeaderboard />
              <ProjectLeaderboard />
            </div>
          </div>
        </Section>

        <Section
          title={{
            translate: { token: "explore:browse.title" },
          }}
          // TODO @hayden get the number of browse projects
          count={100}
          description={{
            translate: { token: "explore:browse.description" },
          }}
          classNames={{
            base: "gap-4xl",
          }}
        >
          <BrowseProjects />
        </Section>
      </div>
    </ScrollView>
  );
}
