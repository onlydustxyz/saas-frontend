"use client";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";

import { ProjectActivity } from "./project-activity";
import { ProjectAvatar } from "./project-avatar";
import { ProjectCategories } from "./project-categories";
import { ProjectCommunity } from "./project-community";
import { ProjectContributors } from "./project-contributors";
import { ProjectDescription } from "./project-description";
import { ProjectEcosystems } from "./project-ecosystems";
import { ProjectIssues } from "./project-issues";
import { ProjectLanguages } from "./project-languages";
import { ProjectMaintainers } from "./project-maintainers";
import { ProjectNews } from "./project-news";
import { ProjectRepos } from "./project-repos";
import { ProjectTitle } from "./project-title";

export function ViewDesktop({ projectSlug }: { projectSlug: string }) {
  const {
    data: project,
    isLoading,
    isError,
  } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  return (
    <div className="hidden w-full gap-6 md:flex">
      <aside className="flex flex-1 shrink-0 flex-col gap-4 md:max-w-[200px] lg:max-w-[300px]">
        <ProjectAvatar logoUrl={project?.logoUrl} name={project?.name} isLoading={isLoading} isError={isError} />

        <ProjectCommunity moreInfos={project?.moreInfos} isLoading={isLoading} isError={isError} />

        <ProjectLanguages languages={project?.languages} isLoading={isLoading} isError={isError} />

        <ProjectEcosystems ecosystems={project?.ecosystems} isLoading={isLoading} isError={isError} />

        <ProjectCategories categories={project?.categories} isLoading={isLoading} isError={isError} />

        <ProjectMaintainers maintainers={project?.leads} isLoading={isLoading} isError={isError} />

        <ProjectContributors projectIdOrSlug={projectSlug} />

        <ProjectRepos repos={project?.repos} isLoading={isLoading} isError={isError} />
      </aside>

      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-6">
          <ProjectTitle
            id={project?.id}
            name={project?.name}
            shortDescription={project?.shortDescription}
            isLoading={isLoading}
            isError={isError}
            showActions
          />

          <ProjectNews projectId={project?.id} />

          <ProjectDescription
            description={project?.overview}
            projectId={project?.id}
            title={"Overview by OnlyDust"}
            isAiGenerated
            isLoading={isLoading}
            isError={isError}
          />

          <ProjectIssues projectSlug={projectSlug} />

          <ProjectActivity projectSlug={projectSlug} projectId={project?.id} />
        </div>
      </div>
    </div>
  );
}
