"use client";

import { useMemo } from "react";

import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { useMatchPath } from "@/shared/hooks/router/use-match-path";
import { Translate } from "@/shared/translation/components/translate/translate";

enum Views {
  "OVERVIEW" = "OVERVIEW",
  "PROJECTS" = "PROJECTS",
  "COMMUNITY" = "COMMUNITY",
  "MY_APPLICATIONS" = "MY_APPLICATIONS",
}

export function HackathonNavigation({ params }: { params: { hackathonSlug: string } }) {
  const isOverview = useMatchPath(NEXT_ROUTER.osw.details.overview.root(params.hackathonSlug));
  const isProjects = useMatchPath(NEXT_ROUTER.osw.details.projects.root(params.hackathonSlug));
  const isCommunity = useMatchPath(NEXT_ROUTER.osw.details.community.root(params.hackathonSlug));
  const isMyApplications = useMatchPath(NEXT_ROUTER.osw.details.myApplications.root(params.hackathonSlug));
  const selectedId = useMemo(() => {
    if (isOverview) {
      return Views.OVERVIEW;
    }
    if (isProjects) {
      return Views.PROJECTS;
    }
    // if (isCommunity) {
    //   return Views.COMMUNITY;
    // }
    if (isMyApplications) {
      return Views.MY_APPLICATIONS;
    }
  }, [isOverview, isProjects, isCommunity, isMyApplications]);

  return (
    <Tabs
      variant={"underline"}
      searchParams={"hackathon-view"}
      classNames={{ base: "tablet:self-end self-start -mb-px pl-xl" }}
      tabs={[
        {
          id: Views.OVERVIEW,
          children: <Translate token={"osw:details.tabs.overview"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.osw.details.overview.root(params.hackathonSlug),
          },
        },
        {
          id: Views.PROJECTS,
          children: <Translate token={"osw:details.tabs.projects"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.osw.details.projects.root(params.hackathonSlug),
          },
        },
        // {
        //   id: Views.COMMUNITY,
        //   children: <Translate token={"osw:details.tabs.community"} />,
        //   as: BaseLink,
        //   htmlProps: {
        //     href: NEXT_ROUTER.osw.details.community.root(params.hackathonSlug),
        //   },
        // },
        {
          id: Views.MY_APPLICATIONS,
          children: <Translate token={"osw:details.tabs.myApplications"} />,
          as: BaseLink,
          htmlProps: {
            href: NEXT_ROUTER.osw.details.myApplications.root(params.hackathonSlug),
          },
        },
      ]}
      selectedId={selectedId}
    />
  );
}
