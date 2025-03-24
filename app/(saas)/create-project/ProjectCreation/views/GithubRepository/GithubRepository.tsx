import { AvatarImage } from "@radix-ui/react-avatar";
import { sortBy } from "lodash-es";
import { Search } from "lucide-react";
import { useCallback, useContext, useMemo, useRef } from "react";
import { Controller } from "react-hook-form";

import { CardGithubRepo } from "@/design-system/molecules/cards/card-github-repo";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Avatar } from "@/shared/ui/avatar";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { TypographyMuted, TypographySmall } from "@/shared/ui/typography";

import { CreateProjectContext } from "../../ProjectCreation.context";
import { MultiStepsForm } from "../../components/MultiStepsForm";
import { getGithubSetupLink } from "../../utils/githubSetupLink";
import { FormInformationCount } from "./components/FormInformationCount";
import { AddMissingRepositories } from "./components/add-missing-repositories/add-missing-repositories";
import { useRepositoryCount } from "./hooks/useRepositoryCount";
import { useRepositorySearch } from "./hooks/useRepositorySearch";

export const GithubRepositoryPage = () => {
  const {
    organizations,
    form,
    helpers: { next, prev },
    formFn: { addRepository, removeRepository },
  } = useContext(CreateProjectContext);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const installedOrganizations = organizations.filter(org => org.installationStatus !== "NOT_INSTALLED");

  const selectedRepos = form.watch("githubRepoIds") || [];
  const search = form.watch("search");
  const selectedReposCounts = useRepositoryCount(organizations, selectedRepos);
  const footerRightElement = FormInformationCount(selectedReposCounts.selected, selectedReposCounts.total);
  const filterOrganizationBySearch = useRepositorySearch(search);
  const filteredOrganizations = useMemo(
    () => filterOrganizationBySearch(installedOrganizations),
    [organizations, filterOrganizationBySearch]
  );

  const isSelected = useCallback((repoId: number) => !!selectedRepos.find(repo => repo === repoId), [selectedRepos]);

  const onRepoSelect = useCallback(
    (repoId: number) => {
      if (isSelected(repoId)) removeRepository(repoId);
      else addRepository(repoId);
    },
    [isSelected, addRepository, removeRepository]
  );

  return (
    <MultiStepsForm
      title="Which repositories will you need?"
      description="Only repositories from organizations where the GitHub app is installed are listed."
      step={2}
      stepCount={3}
      prev={prev}
      next={next}
      footerRightElement={footerRightElement}
      nextDisabled={!selectedRepos?.length}
      stickyChildren={
        <Controller
          name="search"
          control={form.control}
          render={props => (
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search repositories..."
                {...props.field}
                {...props.fieldState}
                ref={searchInputRef}
                className="pl-8"
              />
            </div>
          )}
        />
      }
    >
      <div className="flex flex-col gap-8">
        <Controller
          name="githubRepoIds"
          control={form.control}
          render={() => (
            <Accordion type="multiple" defaultValue={filteredOrganizations.map(org => org.login)}>
              {filteredOrganizations.length > 0 ? (
                filteredOrganizations.map(organization => {
                  const linkUrl = getGithubSetupLink({
                    id: organization.githubUserId,
                    login: organization.login,
                    installationId: organization.installationId,
                    installed: organization.installationStatus !== "NOT_INSTALLED",
                    isAPersonalOrganization: organization.isPersonal,
                  });

                  return (
                    <AccordionItem key={organization.login} value={organization.login}>
                      <AccordionTrigger>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarImage src={organization.avatarUrl || ""} alt={organization.login || ""} />
                          </Avatar>
                          <TypographySmall>{organization.name || organization.login || ""}</TypographySmall>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-8">
                        {organization.repos.length === 0 ? (
                          <TypographyMuted>No repositories found</TypographyMuted>
                        ) : (
                          <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2">
                            {(sortBy(organization.repos, "name") || []).map(repo => (
                              <CardGithubRepo
                                key={repo.id}
                                name={repo.name}
                                description={repo.description}
                                starsCount={repo.stars}
                                forkCount={repo.forkCount}
                                htmlProps={{ onClick: () => onRepoSelect(repo.id) }}
                                classNames={{ base: "cursor-pointer hover:bg-primary-alt/5" }}
                                topActions={{
                                  iconOnly: true,
                                  variant: "tertiary",
                                  startContent: (
                                    <Checkbox
                                      checked={isSelected(repo.id)}
                                      onCheckedChange={() => onRepoSelect(repo.id)}
                                    />
                                  ),
                                }}
                              />
                            ))}
                          </div>
                        )}

                        <AddMissingRepositories
                          url={linkUrl}
                          disabled={!organization.isCurrentUserAdmin}
                          tooltip="Github app installed by an organization admin"
                        />
                      </AccordionContent>
                    </AccordionItem>
                  );
                })
              ) : (
                <p className="text-body-s mb-2">No repositories found matching your search</p>
              )}
            </Accordion>
          )}
        />
      </div>
    </MultiStepsForm>
  );
};

export default GithubRepositoryPage;
