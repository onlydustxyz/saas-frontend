import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { TypographyH4, TypographyP } from "@/shared/ui/typography";

const CONTRIBUTOR_GUIDE_URL =
  "https://blog.onlydust.com/contributor-guide-how-to-contribute-to-an-open-source-project-without-available-issues/";

export function ProjectContributeNowTest({ projectId }: { projectId?: string }) {
  const { capture } = usePosthog();

  return (
    <Card className="flex flex-col gap-3 p-3">
      <TypographyH4>Test the application</TypographyH4>

      <TypographyP className="text-sm">
        Want to help an Open Source project but don&apos;t know where to start? Test the application, report bugs,
        suggest improvements, and make a real impact!
      </TypographyP>

      <Button
        variant={"outline"}
        asChild
        className="w-fit"
        onClick={() => {
          capture("project_overview_contribute_now_click_faq", { project_id: projectId });
        }}
      >
        <a href={CONTRIBUTOR_GUIDE_URL} target="_blank" rel="noopener noreferrer">
          Read the Contribution Guide
        </a>
      </Button>
    </Card>
  );
}
