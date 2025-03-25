import { useContext } from "react";

import { TypographyH4 } from "@/shared/ui/typography";

import { CreateProjectContext } from "../../ProjectCreation.context";
import { MultiStepsForm } from "../../components/MultiStepsForm";
import { GithubSyncSettings } from "./components/GithubSyncSettings";
import OrganizationList from "./components/OrganizationList";

export const GithubOrganizationPage = () => {
  const {
    helpers: { next },
    organizations,
    organizationsLoading,
    PoolingFeedback,
  } = useContext(CreateProjectContext);

  const installedOrganizations = organizations.filter(org => org.installationStatus !== "NOT_INSTALLED");
  const availableOrganizations = organizations.filter(
    org => org.installationStatus === "NOT_INSTALLED" && org.isCurrentUserAdmin
  );

  return (
    <MultiStepsForm
      title="Select your Github organizations"
      description="Please install the github app on the desired github organization(s) containing the repositories you want to add."
      step={1}
      stepCount={3}
      next={next}
      nextDisabled={!organizations.length}
    >
      <div>
        <TypographyH4 className="uppercase">Installed on these organizations</TypographyH4>
        <OrganizationList
          organizations={installedOrganizations}
          emptyListFallBackText="No installed organizations found"
          loading={organizationsLoading}
          disabledTooltip="This organization was installed by an admin"
        />
      </div>

      <div className="mt-6">
        <TypographyH4 className="uppercase">Available Organizations</TypographyH4>
        <OrganizationList
          organizations={availableOrganizations}
          emptyListFallBackText="No available organizations found"
          loading={organizationsLoading}
        />
      </div>

      <div className="mt-6">
        <GithubSyncSettings
          title="GitHub settings"
          showButton="Show me how"
          settingsButton="Edit configuration"
          message="Missing an organization? Edit your configuration and make sure the desired organizations are granted."
          PoolingFeedback={PoolingFeedback}
        />
      </div>
    </MultiStepsForm>
  );
};
