import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";

import { TransactionsContextProvider } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/context/transactions.context";
import { TransactionsSidepanel } from "@/app/manage-projects/[projectSlug]/_sections/financial-section/components/transactions-sidepanel/transactions-sidepanel";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";

export function TransactionsTrigger() {
  const { projectSlug = "" } = useParams<{ projectSlug: string }>();
  const { Panel, open, close, isOpen } = useSidePanel({ name: "sponsor-transaction" });

  function togglePanel() {
    if (!isOpen) {
      open();
    } else {
      close();
    }
  }

  return (
    <>
      <Button
        variant={"primary"}
        endIcon={{ component: ChevronRight }}
        isTextButton
        size={"md"}
        translate={{ token: "manageProjects:detail.financial.buttons.seeTransactions" }}
        onClick={togglePanel}
        classNames={{
          base: "max-w-full overflow-hidden",
          label: "whitespace-nowrap text-ellipsis overflow-hidden",
        }}
      />
      <TransactionsContextProvider projectSlug={projectSlug}>
        <Panel>
          <TransactionsSidepanel />
        </Panel>
      </TransactionsContextProvider>
    </>
  );
}