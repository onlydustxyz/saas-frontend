import background from "@/public/images/backgrounds/discover-header.png";
import { ArrowRight, Bot, FolderSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { GlobalSearch } from "@/shared/features/global-search/global-search";
import { useForcedOnboarding } from "@/shared/hooks/flags/use-forced-onboarding";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { GlowingEffect } from "@/shared/ui/glowing-effect";
import { TypographyH2, TypographyP } from "@/shared/ui/typography";

function HasSufficentData() {
  return (
    <Button>
      You don’t find your perfect fit ?
      <ArrowRight />
    </Button>
  );
}

function NoSufficentData() {
  const { capture } = usePosthog();

  return (
    <div className="flex flex-col gap-4">
      <TypographyP className="text-center">Didn’t find what you’re looking for?</TypographyP>
      <div className="flex flex-row gap-4">
        <Link
          href={NEXT_ROUTER.projects.root}
          className="flex-1 cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => capture("discover_cta_browse_projects")}
        >
          <Card className="relative flex-1">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

            <CardHeader className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <FolderSearch className="size-5 text-cyan-200" />
                <CardTitle className="text-left text-base text-cyan-100">Browse</CardTitle>
              </div>
              <CardDescription className="text-left">
                Dive into a world of exciting projects and discover hidden gems.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link
          href={NEXT_ROUTER.odSay.root}
          className="flex-1 cursor-pointer transition-opacity hover:opacity-80"
          onClick={() => capture("discover_cta_odsay")}
        >
          <Card className="relative flex-1">
            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

            <CardHeader className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <Bot className="size-5 text-purple-200" />
                <CardTitle className="text-left text-base text-purple-100">ODSay</CardTitle>
              </div>
              <CardDescription className="text-left">
                Find your perfect match with our AI-powered assistant.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}

function ForcedOnboardingFooter() {
  return (
    <div>
      <GlobalSearch searchWidthClassName="w-[500px]" containerClassName="h-[50px]" />
    </div>
  );
}

export function PageHeader({ hasSufficentData = false }: { hasSufficentData?: boolean }) {
  const isForcedOnboarding = useForcedOnboarding();

  const Footer = hasSufficentData ? HasSufficentData : NoSufficentData;

  const VariableFooter = isForcedOnboarding ? ForcedOnboardingFooter : Footer;
  return (
    <header className="relative z-[1] w-full py-16">
      <Image
        src={background}
        alt=""
        className={"pointer-events-none absolute inset-0 -z-[1] h-auto w-full rounded-t-2xl opacity-50"}
        loading="eager"
      />
      <div className="relative z-[1] mx-auto flex w-full max-w-[600px] flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center">
            <TypographyH2 className="text-center">Get matched to your next</TypographyH2>
            <TypographyH2 className="bg-gradient-to-r from-purple-500 to-primary bg-clip-text text-center text-transparent">
              Open source contributions
            </TypographyH2>
          </div>
          <TypographyP className="text-center">
            Get recommendations based on your profile and past contributions.
          </TypographyP>
        </div>
        <VariableFooter />
      </div>
    </header>
  );
}
