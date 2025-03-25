import { useContext } from "react";

import { Project } from "@/core/domain/project/models/project-model";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { ContributorLabels } from "@/shared/panels/project-update-sidepanel/_components/contributor-labels/contributor-labels";
import { GlobalInformation } from "@/shared/panels/project-update-sidepanel/_components/global-information/global-information";
import { MoreInfo } from "@/shared/panels/project-update-sidepanel/_components/more-info/more-info";
import { ProjectLead } from "@/shared/panels/project-update-sidepanel/_components/project-lead/project-lead";
import { Button } from "@/shared/ui/button";

import { CreateProjectContext } from "../../ProjectCreation.context";
import { MultiStepsForm } from "../../components/MultiStepsForm";

export const ProjectInformationsPage = () => {
  const {
    form,
    isSubmitting,
    helpers: { prev },
  } = useContext(CreateProjectContext);

  const data = form.watch();

  const { user } = useAuthUser();

  const project = new Project({
    ...data,
    categories: [],
    contributorCount: 0,
    createdAt: "",
    ecosystems: [],
    languages: [],
    goodFirstIssueCount: 0,
    id: "",
    slug: "",
    name: "",
    hiring: false,
    visibility: "PUBLIC",
    topContributors: [],
    leaders: user ? [user] : [],
    moreInfos: [],
    hasRemainingBudget: false,
    indexingComplete: false,
    indexedAt: "",
    contributorLabels: [],
  });

  return (
    <MultiStepsForm
      title="Project information"
      step={3}
      stepCount={3}
      submitButton={
        <Button disabled={!form.formState?.isValid || isSubmitting} className="w-full md:w-auto">
          Publish
        </Button>
      }
      prev={prev}
    >
      <GlobalInformation project={project} form={form} />
      <ProjectLead form={form} />
      <MoreInfo form={form} />
      <ContributorLabels form={form} />
    </MultiStepsForm>
  );
};
