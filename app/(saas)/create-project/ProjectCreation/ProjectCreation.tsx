"use client";

import { useContext } from "react";

import { CreateProjectContext, CreateProjectProvider } from "./ProjectCreation.context";
import { ProjectCreationSteps } from "./types/ProjectCreationSteps";
import { GithubOrganizationPage } from "./views/GithubOrganizations/GithubOrganizations";
import { GithubRepositoryPage } from "./views/GithubRepository";
import { ProjectInformationsPage } from "./views/ProjectInformations/ProjectInformations";

const SafeProjectCreation = () => {
  const { currentStep } = useContext(CreateProjectContext);

  const ActiveStep = () => {
    switch (currentStep) {
      case ProjectCreationSteps.INFORMATIONS:
        return <ProjectInformationsPage />;
      case ProjectCreationSteps.REPOSITORIES:
        return <GithubRepositoryPage />;
      default:
        return <GithubOrganizationPage />;
    }
  };

  return ActiveStep();
};

export const ProjectCreation = () => {
  return (
    <CreateProjectProvider>
      <SafeProjectCreation />
    </CreateProjectProvider>
  );
};
