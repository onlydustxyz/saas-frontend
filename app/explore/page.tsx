"use client";

import { Typo } from "@/design-system/atoms/typo";

import { ExpertiseSection } from "./_components/expertise/expertise-section";
import { TrendingProjects } from "./_features/trending-projects/trending-projects";

export default function ExplorePage() {
  return (
    <div className="mx-auto flex max-w-laptop flex-col gap-6xl py-4xl">
      <section className="flex flex-col gap-lg">
        <div className="flex flex-col gap-md">
          <Typo variant="heading" size="xs" weight="medium" translate={{ token: "explore:trending.title" }} />
          <Typo color="secondary" size="xs" translate={{ token: "explore:trending.description" }} />
        </div>

        <TrendingProjects />
      </section>

      <ExpertiseSection />
    </div>
  );
}
