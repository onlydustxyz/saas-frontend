"use client";

import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { ProgramsTable } from "@/app/programs/_features/programs-table/programs-table";

import { Typo } from "@/design-system/atoms/typo";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useShowProgramsList } from "@/shared/hooks/programs/use-show-programs-list";
import { Translate } from "@/shared/translation/components/translate/translate";

export function withProgramList<P extends object>(Component: ComponentType<P>) {
  return function WithProgramList(props: P) {
    const [showProgramList] = useShowProgramsList();
    const router = useRouter();

    useEffect(() => {
      if (showProgramList.loading) return;

      if (!showProgramList.hasMultiplePrograms) {
        router.push(NEXT_ROUTER.programs.details.root(showProgramList.firstProgram ?? ""));
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
    <PageWrapper
      navigation={{
        title: <Translate token={"programs:list.header.title"} />,
      }}
    >
      <ScrollView>
        <PageContent>
          <div className="grid h-full gap-3">
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

export default withProgramList(ProgramsPage);
