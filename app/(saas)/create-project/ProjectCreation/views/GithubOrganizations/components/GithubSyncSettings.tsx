import { GithubIcon } from "lucide-react";

import { Link } from "@/design-system/atoms/link";

import { Button } from "@/shared/ui/button";
import { TypographyLarge, TypographyMuted } from "@/shared/ui/typography";

import { OAuthGithubConfigLink } from "../../../utils/githubSetupLink";
import { GithubWorkflowTutorialSidepanel } from "./github-workflow-tutorial-side-panel/GithubWorkflowTutorialSidepanel";

interface GithubSyncSettingsProps {
  title: string;
  message?: string;
  showButton?: string;
  settingsButton?: string;
  PoolingFeedback?: React.ReactElement;
}

export const GithubSyncSettings = ({
  title,
  message,
  settingsButton,
  PoolingFeedback,
  showButton,
}: GithubSyncSettingsProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-6 rounded-2xl border p-5">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <TypographyLarge className="uppercase">{title}</TypographyLarge>
        {message ? (
          <TypographyMuted>
            {message}
            &nbsp;
            <GithubWorkflowTutorialSidepanel>
              <button className="text-secondary-600">{showButton}</button>
            </GithubWorkflowTutorialSidepanel>
          </TypographyMuted>
        ) : null}
      </div>
      <div className="center flex w-full flex-col items-center gap-5 lg:flex-row">
        {settingsButton ? (
          <Button variant="secondary" size="sm" className="w-full" asChild>
            <Link href={OAuthGithubConfigLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <GithubIcon />
              {settingsButton}
            </Link>
          </Button>
        ) : null}
        {PoolingFeedback ? PoolingFeedback : null}
      </div>
    </div>
  );
};
