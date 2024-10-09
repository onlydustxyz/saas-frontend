import { useMemo } from "react";

import { ApplicationReactQueryAdapter } from "@/core/application/react-query-adapter/application";

import { Skeleton } from "@/design-system/atoms/skeleton";
import { Modal } from "@/design-system/molecules/modal";

import { AnimatedColumn } from "@/shared/components/animated-column-group/animated-column/animated-column";
import { ErrorState } from "@/shared/components/error-state/error-state";
import { PageContent } from "@/shared/features/page-content/page-content";
import { ManageApplicantsModalProps } from "@/shared/modals/manage-applicants-modal/manage-applicants-modal.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function ManageApplicantsModal({ isOpen, onOpenChange, projectId }: ManageApplicantsModalProps) {
  const { data, isLoading, isError } = ApplicationReactQueryAdapter.client.useGetApplications({
    queryParams: {
      projectId,
    },
    options: { enabled: !!projectId && isOpen },
  });
  const totalItemNumber = useMemo(() => data?.pages.flatMap(page => page.totalItemNumber) ?? [], [data]);

  console.log({ data });

  if (!projectId) return null;

  function renderContent() {
    if (isLoading) {
      return <Skeleton classNames={{ base: "h-full" }} />;
    }

    if (isError) {
      return (
        <PageContent classNames={{ base: "h-full flex flex-col justify-center" }}>
          <ErrorState />
        </PageContent>
      );
    }

    return (
      <AnimatedColumn className={"h-full"}>
        <PageContent classNames={{ base: "h-full" }}>Table</PageContent>
      </AnimatedColumn>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      titleProps={{
        children: (
          <>
            <Translate token={"modals:manageApplicants.title"} /> ({totalItemNumber})
          </>
        ),
      }}
      size="8xl"
      background="gradient"
    >
      <div className="h-dvh">{renderContent()}</div>
    </Modal>
  );
}
