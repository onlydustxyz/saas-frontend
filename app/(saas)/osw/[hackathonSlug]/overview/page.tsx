"use client";

import { HackathonDescription } from "@/app/(saas)/osw/[hackathonSlug]/overview/_features/hackathon-description/hackathon-description";
import { HackathonStats } from "@/app/(saas)/osw/[hackathonSlug]/overview/_features/hackathon-stats/hackathon-stats";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PosthogCaptureOnMount } from "@/shared/tracking/posthog/posthog-capture-on-mount/posthog-capture-on-mount";
import { Translate } from "@/shared/translation/components/translate/translate";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";

function ApplyGuidelinesCard() {
  return (
    <div className="w-full p-4">
      <Alert variant="info">
        <AlertTitle className="mb-4 text-lg">Heads up, builders! Application limits & best practices</AlertTitle>
        <AlertDescription>
          <ul className="list-inside space-y-2">
            <li className="font-bold text-foreground">
              ✓ To keep things fair and spam-free, we’re limiting applications to 10 issues at a time.
            </li>
            <li className="text-foreground">
              ✓ <strong>Pick wisely</strong> – Only apply if you can actually solve it.
            </li>
            <li className="text-foreground">
              ✓ <strong>Add a personal touch</strong> – A quick comment on why you’re interested makes a difference. It
              helps maintainers see you&apos;re the right fit.
            </li>
            <li className="text-foreground">
              ✓ <strong>You get credits back</strong> – If an issue is assigned to someone else or you make a PR, your
              counter drops. Sent 10 apps? If 1 issue is taken, boom—you’re back at 9/10, meaning you can apply for
              another.
            </li>
            <li className="text-foreground">
              ✓ <strong>TL;DR</strong>: Be thoughtful, show your motivation, and keep an eye on your application count.
              Let’s keep it clean and high-quality. More info on how to send a great application?
            </li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}

function HackathonOverviewPage({ params: { hackathonSlug } }: { params: { hackathonSlug: string } }) {
  const { data: hackathon } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug,
    },
    options: {
      enabled: Boolean(hackathonSlug),
    },
  });

  return (
    <ScrollView>
      <PosthogCaptureOnMount
        eventName={"hackathon_viewed"}
        params={{
          hackathon_id: hackathon?.id,
        }}
        paramsReady={Boolean(hackathon?.id)}
      />

      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Open-Source Week",
            href: NEXT_ROUTER.osw.root,
          },
          {
            id: "slug",
            label: hackathonSlug,
          },
          {
            id: "overview",
            label: <Translate token={"osw:details.tabs.overview"} />,
          },
        ]}
      />

      <HackathonStats
        countRegistered={hackathon?.subscriberCount}
        countAvailableIssues={hackathon?.availableIssueCount}
        totalAvailableIssues={hackathon?.issueCount}
        countProjects={hackathon?.projectCount}
        endsAt={hackathon?.endDate}
      />

      <ApplyGuidelinesCard />
      <HackathonDescription description={hackathon?.description} />
    </ScrollView>
  );
}

export default withClientOnly(HackathonOverviewPage);
