import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { GithubLabelWithCountInterface } from "@/core/domain/github/models/github-label-model";
import { HackathonListItemInterface } from "@/core/domain/hackathon/models/hackathon-list-item-model";
import { ProjectAvailableIssuesInterface } from "@/core/domain/project/models/project-available-issues-model";
import { GetProjectAvailableIssuesQueryParams } from "@/core/domain/project/project-contract.types";

interface ProjectIssuesContextValue {
  issues: ProjectAvailableIssuesInterface[];
  labels: GithubLabelWithCountInterface[];
  selectedLabels: GithubLabelWithCountInterface[];
  selectedHackathons: HackathonListItemInterface[];
  liveHackathons: HackathonListItemInterface[];
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleLabelClick: (label: GithubLabelWithCountInterface) => void;
  handleHackathonClick: (hackathon: HackathonListItemInterface) => void;
  fetchNextPage: () => void;
}

const ProjectIssuesContext = createContext<ProjectIssuesContextValue | undefined>(undefined);

export function ProjectIssuesProvider({ children, projectSlug }: PropsWithChildren<{ projectSlug: string }>) {
  const searchParams = useSearchParams();

  const [selectedLabels, setSelectedLabels] = useState<GithubLabelWithCountInterface[]>(() => {
    const labels = searchParams.get("l")?.split(",").filter(Boolean) || [];
    return labels.map(name => ({ name })) as GithubLabelWithCountInterface[];
  });

  const [selectedHackathons, setSelectedHackathons] = useState<HackathonListItemInterface[]>(() => {
    const hackathons = searchParams.get("h")?.split(",").filter(Boolean) || [];
    return hackathons.map(id => ({ id })) as HackathonListItemInterface[];
  });

  const { data: hackathons } = HackathonReactQueryAdapter.client.useGetHackathons({});

  const liveHackathons = useMemo(
    () => hackathons?.hackathons.filter(hackathon => hackathon.isLive()) ?? [],
    [hackathons]
  );

  const queryParams: Partial<GetProjectAvailableIssuesQueryParams> = {
    githubLabels: selectedLabels.map(label => label.name),
    hackathonId: selectedHackathons[0]?.id,
    pageSize: 5,
  };

  const {
    data: issuesData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = ProjectReactQueryAdapter.client.useGetProjectAvailableIssues({
    pathParams: {
      projectIdOrSlug: projectSlug,
    },
    queryParams,
    options: {
      enabled: Boolean(projectSlug),
    },
  });

  const issues = useMemo(() => issuesData?.pages.flatMap(page => page.issues) ?? [], [issuesData]);

  const labels = useMemo(() => {
    const allLabels = issuesData?.pages.flatMap(page => page.labels) ?? [];
    return [...new Map(allLabels.map(label => [label.name, label])).values()] as GithubLabelWithCountInterface[];
  }, [issuesData]);

  function handleLabelClick(label: GithubLabelWithCountInterface) {
    setSelectedLabels(prev => {
      const next = prev.some(l => l.name === label.name) ? prev.filter(l => l.name !== label.name) : [...prev, label];

      const params = new URLSearchParams(window.location.search);

      const labels = next.map(l => l.name);

      if (labels.length) {
        params.set("l", labels.join(","));
      } else {
        params.delete("l");
      }

      window.history.replaceState(null, "", `?${params.toString()}`);

      return next;
    });
  }

  function handleHackathonClick(hackathon: HackathonListItemInterface) {
    setSelectedHackathons(prev => {
      const next = prev.some(h => h.id === hackathon.id)
        ? prev.filter(h => h.id !== hackathon.id)
        : [...prev, hackathon];

      const params = new URLSearchParams(window.location.search);

      const hackathons = next.map(h => h.id);

      if (hackathons.length) {
        params.set("h", hackathons.join(","));
      } else {
        params.delete("h");
      }

      window.history.replaceState(null, "", `?${params.toString()}`);

      return next;
    });
  }

  const value = {
    issues,
    labels,
    selectedLabels,
    selectedHackathons,
    liveHackathons,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    handleLabelClick,
    handleHackathonClick,
    fetchNextPage,
  };

  return <ProjectIssuesContext.Provider value={value}>{children}</ProjectIssuesContext.Provider>;
}

export function useProjectIssues() {
  const context = useContext(ProjectIssuesContext);
  if (!context) {
    throw new Error("useProjectIssues must be used within a ProjectIssuesProvider");
  }
  return context;
} 