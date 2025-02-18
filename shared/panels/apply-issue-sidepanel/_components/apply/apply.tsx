import { Info } from "lucide-react";
import { Controller, useFormContext } from "react-hook-form";

import { Icon } from "@/design-system/atoms/icon";
import { Textarea } from "@/design-system/atoms/textarea";
import { Typo } from "@/design-system/atoms/typo";

import { ApplyIssueSidepanelForm } from "../../apply-issue-sidepanel.types";

export function Apply() {
  const { control } = useFormContext<ApplyIssueSidepanelForm>();

  return (
    <div className="flex w-full flex-col gap-4">
      <Typo size={"md"} weight={"medium"} translate={{ token: "panels:applyIssue.apply.githubComment" }} />
      <Controller control={control} name="githubComment" render={({ field }) => <Textarea {...field} />} />
      <div className="flex flex-row items-center justify-start gap-1">
        <Icon component={Info} size={"md"} classNames={{ base: "text-typography-tertiary" }} />
        <Typo size={"xs"} weight={"medium"} translate={{ token: "panels:applyIssue.apply.info" }} color="tertiary" />
      </div>
    </div>
  );
}
