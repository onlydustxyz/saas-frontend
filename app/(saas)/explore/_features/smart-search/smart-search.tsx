import { ArrowRightIcon, SearchIcon, SlidersHorizontal, SparklesIcon } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";

const quickFilters = [
  { name: "JavaScript", type: "language" },
  { name: "React", type: "framework" },
  { name: "Good First Issue", type: "difficulty" },
  { name: "Documentation", type: "type" },
  { name: "Bug Fix", type: "type" },
  { name: "Feature", type: "type" },
];

const searchExamples = [
  "Find React issues about performance",
  "Show me good first issues in TypeScript",
  "Bug fixes in Next.js with high priority",
];

export function SmartSearch() {
  return (
    <div className="relative -mx-6 flex w-full flex-col items-center px-6">
      {/* Background with grain and gradient */}
      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-30 mix-blend-soft-light" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="relative w-full max-w-[1400px] space-y-12 py-16 md:py-24">
        {/* Hero Text */}
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Find Your Next{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Open Source Contribution
            </span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Search through thousands of issues using natural language
          </p>
        </div>

        {/* Search Bar */}
        <div className="mx-auto space-y-8">
          <div className="relative mx-auto max-w-3xl">
            <SearchIcon className="absolute left-5 top-4 h-6 w-6 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Try 'Show me React issues about state management'"
              className="h-14 rounded-full border-primary/20 bg-background pl-14 pr-36 text-lg shadow-lg placeholder:text-muted-foreground/50 focus-visible:ring-primary/30"
            />
            <Button size="sm" variant="ghost" className="absolute right-4 top-2.5 gap-2 rounded-full px-6 py-5">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 px-4">
            {quickFilters.map(filter => (
              <Badge
                key={filter.name}
                variant="secondary"
                className="cursor-pointer rounded-full px-6 py-2 text-sm hover:bg-primary/20"
              >
                {filter.name}
              </Badge>
            ))}
          </div>

          {/* Search Examples */}
          <div className="flex flex-col items-center justify-center gap-6 pt-6">
            <div className="flex items-center gap-2">
              <SparklesIcon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Popular Searches</span>
            </div>
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              {searchExamples.map((example, index) => (
                <div key={example} className="flex items-center">
                  <button className="group flex items-center gap-2 rounded-full bg-primary/5 px-6 py-2.5 text-sm transition-all hover:bg-primary/10">
                    <SearchIcon className="h-4 w-4 text-primary/60" />
                    <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                      {example}
                    </span>
                    <ArrowRightIcon className="h-4 w-4 text-primary/60 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  {index < searchExamples.length - 1 && (
                    <div className="mx-3 hidden h-1 w-1 rounded-full bg-muted-foreground/20 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
