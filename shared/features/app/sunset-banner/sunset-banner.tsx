"use client";

import { Info } from "lucide-react";

import { Button } from "@/shared/ui/button";

export function SunsetBanner() {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto flex h-full items-center justify-between gap-4 px-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Info className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
          <div className="min-w-0 text-xs font-medium sm:text-sm">
            <span className="hidden sm:block">
              Transitioning to our new platform for all open source projects. Please withdraw pending rewards and join
              us.
            </span>
            <span className="block sm:hidden">New platform available. Withdraw rewards & join us!</span>
          </div>
        </div>
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="flex-shrink-0 bg-white text-xs text-blue-600 hover:bg-gray-100 sm:text-sm"
        >
          <a href="https://contribute.onlydust.com" target="_blank" rel="noopener noreferrer">
            <span className="hidden sm:inline">Explore New Platform</span>
            <span className="sm:hidden">Explore</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
