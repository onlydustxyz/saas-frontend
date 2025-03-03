import { RocketIcon, SparklesIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";

export function ProjectRecommendationBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-30 mix-blend-soft-light" />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-background">
        {/* Additional gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 px-8 py-16 text-center md:flex-row md:justify-between md:px-16 md:py-24 md:text-left">
        <div className="flex flex-col items-center gap-6 md:items-start md:pr-8">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/20 p-3 backdrop-blur-sm">
              <SparklesIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="rounded-full bg-primary/20 p-3 backdrop-blur-sm">
              <RocketIcon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">
              Discover Your Next
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Open Source Project
              </span>
            </h2>
            <p className="max-w-md text-lg text-muted-foreground">
              Get personalized project recommendations based on your expertise and interests. Join a thriving community
              of contributors.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:items-end">
          <Button size="lg" className="gap-2text-lg h-12 min-w-[200px] shadow-lg transition-all hover:opacity-90">
            <RocketIcon className="h-5 w-5" />
            Get Started
          </Button>
          <Button variant="ghost" size="lg" className="h-12 min-w-[200px] text-lg backdrop-blur-sm">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
