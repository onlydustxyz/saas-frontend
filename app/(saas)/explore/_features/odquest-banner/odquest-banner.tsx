import { ArrowRightIcon, TrophyIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";

export function OdQuestBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Grain texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-30 mix-blend-soft-light" />

      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-background">
        {/* Additional gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-500/10 to-blue-500/10 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 px-8 py-16 text-center md:flex-row md:justify-between md:px-16 md:py-20 md:text-left">
        <div className="flex flex-col items-center gap-6 md:items-start md:pr-8">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-500/20 p-3 backdrop-blur-sm">
              <TrophyIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-4xl font-bold tracking-tight">
                Join the
                <span className="bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text px-3 text-transparent">
                  OdQuest
                </span>
                Challenge
              </h2>
              <p className="mt-2 text-sm font-medium text-blue-500/80">
                Earn rewards while contributing to open source
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 md:justify-start">
              <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
                <span className="font-medium text-blue-500">500+</span>
                <span className="text-sm text-muted-foreground">Active Quests</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
                <span className="font-medium text-blue-500">$50K+</span>
                <span className="text-sm text-muted-foreground">Rewards Pool</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-4 py-2 backdrop-blur-sm">
                <span className="font-medium text-blue-500">1000+</span>
                <span className="text-sm text-muted-foreground">Contributors</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:items-end">
          <Button size="lg" className="gap-2text-lg group h-12 min-w-[200px] shadow-lg transition-all hover:opacity-90">
            Start Quest
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
