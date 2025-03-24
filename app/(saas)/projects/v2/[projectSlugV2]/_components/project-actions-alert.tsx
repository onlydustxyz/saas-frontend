import { useAuth0 } from "@auth0/auth0-react";
import { BellPlus, BellRing } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { cn } from "@/shared/utils";

export function ProjectActionsAlert({ projectId = "" }: { projectId?: string }) {
  const { capture } = usePosthog();
  const { isAuthenticated } = useAuth0();
  const { data } = MeReactQueryAdapter.client.useGetMyNotificationsSettingsForProject({
    pathParams: {
      projectId,
    },
    options: {
      enabled: isAuthenticated && Boolean(projectId),
    },
  });

  const isAlertEnabled = useMemo(() => data?.onGoodFirstIssueAdded, [data]);

  const { mutateAsync: setAlert } = MeReactQueryAdapter.client.useSetMyNotificationsSettingsForProject({
    pathParams: { projectId },
  });

  async function toggleAlert() {
    if (isAlertEnabled) {
      await setAlert({ onGoodFirstIssueAdded: false });
      capture("project_good_first_issue_alert_disabled", { projectId });
      toast.success(`${data?.name} alert disabled`);
    } else {
      await setAlert({ onGoodFirstIssueAdded: true });
      capture("project_good_first_issue_alert_enabled", { projectId });
      toast.success(`${data?.name} alert enabled`);
    }
  }

  if (!projectId) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"outline"}
          className={cn({ "bg-purple-500 hover:bg-purple-700": isAlertEnabled })}
          size="icon"
          onClick={toggleAlert}
        >
          {isAlertEnabled ? <BellRing className={"fill-white"} /> : <BellPlus />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        {isAlertEnabled ? "Disable good first issue alert" : "Enable good first issue alert"}
      </TooltipContent>
    </Tooltip>
  );
}
