"use client";

import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { ProjectInterfaceV2 } from "@/core/domain/project/models/project-model-v2";

interface IssueCreationPanelContextInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
  step: "definition" | "creation";
  setStep: (step: "definition" | "creation") => void;
  issue: Issue | null;
  setIssue: (issue: Issue) => void;
  projectId: string;
  project: ProjectInterfaceV2 | undefined;
  closeAndReset: () => void;
}

interface Issue {
  title: string;
  body: string;
  repoId: number;
  issueCompositionId: string;
  additionalQuestions?: string;
}

const IssueCreationPanelContext = createContext<IssueCreationPanelContextInterface>({
  open: false,
  setOpen: () => {},
  step: "definition",
  setStep: () => {},
  issue: null,
  setIssue: () => {},
  projectId: "",
  project: undefined,
  closeAndReset: () => {},
});

export function IssueCreationPanelProvider({ children, projectId }: PropsWithChildren & { projectId: string }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"definition" | "creation">("definition");
  const [issue, setIssue] = useState<Issue | null>(null);

  const { data: project } = ProjectReactQueryAdapter.client.useGetProjectBySlugOrId({
    pathParams: {
      projectIdOrSlug: projectId,
    },
    options: {
      enabled: Boolean(projectId) && Boolean(open),
    },
  });

  function reset() {
    setStep("definition");
    setIssue(null);
  }

  function closeAndReset() {
    setOpen(false);
    reset();
  }

  useEffect(() => {
    reset();
  }, [open]);

  return (
    <IssueCreationPanelContext.Provider
      value={{ open, setOpen, step, setStep, issue, setIssue, projectId, project, closeAndReset }}
    >
      {children}
    </IssueCreationPanelContext.Provider>
  );
}

export function useIssueCreationPanel() {
  return useContext(IssueCreationPanelContext);
}
