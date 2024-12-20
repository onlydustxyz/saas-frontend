"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import "keen-slider/keen-slider.min.css";

import { ProjectBanners } from "@/app/explore/_features/project-banners/project-banners";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { GlobalSearch } from "@/shared/features/global-search/global-search";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { BrowseProjects } from "./_features/browse-projects/browse-projects";
import { ProjectCategoryList } from "./_features/project-category-list/project-category-list";
import { TrendingProjects } from "./_features/trending-projects/trending-projects";

function ExplorePage() {
  return (
    <div className="pb-7xl">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"explore:title"} />,
          },
        ]}
      />

      <div className="mx-auto flex flex-col gap-7xl py-4xl">
        {process.env.NEXT_PUBLIC_ENABLE_GLOBAL_SEARCH !== "true" && <GlobalSearch byPassFlag={true} />}
        <ProjectBanners />

        <TrendingProjects />

        <ProjectCategoryList />

        <BrowseProjects />
      </div>
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(ExplorePage));
