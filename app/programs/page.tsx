"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { ProgramsTable } from "@/app/programs/_features/programs-table/programs-table";

import { Typo } from "@/design-system/atoms/typo";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useShowProgramsList } from "@/shared/hooks/programs/use-show-programs-list";
import { Translate } from "@/shared/translation/components/translate/translate";

function withProgramList<P extends object>(Component: ComponentType<P>) {
  return function WithProgramList(props: P) {
    const [showProgramList] = useShowProgramsList();
    const router = useRouter();

    useEffect(() => {
      if (showProgramList.loading) return;

      if (!showProgramList.hasMultiplePrograms) {
        router.push(NEXT_ROUTER.programs.projects.root(showProgramList.firstProgram ?? ""));
      }
    }, [showProgramList, router]);

    if (showProgramList.loading) {
      return null;
    }

    return <Component {...props} />;
  };
}

function ProgramsPage() {
  return (
    <PageWrapper>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"programs:list.header.title"} />,
            href: NEXT_ROUTER.programs.root,
            level: "1",
          },
        ]}
      />
      <ScrollView>
        <PageContent classNames={{ base: "h-full" }}>
          <div className="flex flex-col gap-4">
            <Typo
              size={"xs"}
              weight={"medium"}
              variant={"heading"}
              translate={{
                token: "programs:list.content.title",
              }}
            />

            <ProgramsTable />
          </div>
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(withProgramList(ProgramsPage)));
