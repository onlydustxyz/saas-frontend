import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { HoverBorderGradient } from "@/shared/ui/hover-border-gradient";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

import { ProjectContributeNowGFI } from "./project-contribute-now-gfi";
import { ProjectContributeNowHackathon } from "./project-contribute-now-hackathon";
import { ProjectContributeNowNetworks } from "./project-contribute-now-networks";
import { ProjectContributeNowTest } from "./project-contribute-now-test";

export function ProjectContributeNow({ projectId }: { projectId?: string }) {
  const { capture } = usePosthog();

  if (!projectId) {
    return null;
  }

  return (
    <Popover
      onOpenChange={open => {
        if (open) {
          capture("project_overview_open_contribute_now", { project_id: projectId });
        }
      }}
    >
      <PopoverTrigger asChild>
        <HoverBorderGradient>
          <Button asChild>
            <span>Contribute now</span>
          </Button>
        </HoverBorderGradient>
      </PopoverTrigger>

      <PopoverContent align="end" className="max-h-[80vh] w-screen max-w-[460px] overflow-auto p-0 md:max-h-[600px]">
        <div className="flex flex-col gap-4 p-3">
          <ProjectContributeNowHackathon projectId={projectId} />

          <ProjectContributeNowGFI
            projectId={projectId}
            size="small"
            hideWhenEmpty
            posthogPrefix="project_overview_contribute_now_click_good_first_issue"
          />

          <ProjectContributeNowNetworks projectId={projectId} />

          <ProjectContributeNowTest projectId={projectId} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
