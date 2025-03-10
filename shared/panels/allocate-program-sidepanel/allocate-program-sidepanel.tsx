import { Button } from "@/design-system/atoms/button/variants/button-default";
import { AccordionLoading } from "@/design-system/molecules/accordion";
import { CardProject, CardProjectLoading } from "@/design-system/molecules/cards/card-project";

import { ErrorState } from "@/shared/components/error-state/error-state";
import { AmountSelector } from "@/shared/features/amount-selector/amount-selector";
import { AmountSelectorLoading } from "@/shared/features/amount-selector/amount-selector.loading";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel, useSinglePanelData } from "@/shared/features/side-panels/side-panel/side-panel";
import { Summary } from "@/shared/panels/allocate-program-sidepanel/_components/summary";
import {
  useAllocateProgram,
  useAllocateProgramSidepanel,
} from "@/shared/panels/allocate-program-sidepanel/allocate-program-sidepanel.hooks";
import { AllocateProgramData } from "@/shared/panels/allocate-program-sidepanel/allocate-program.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function AllocateProgramSidepanel() {
  const { name } = useAllocateProgramSidepanel();
  const { Panel } = useSidePanel({ name });
  const { sponsorId, programId, canGoBack } = useSinglePanelData<AllocateProgramData>(name) ?? {
    sponsorId: "",
    programId: "",
  };

  const {
    amount,
    budget,
    allBudgets,
    handleAmountChange,
    handleBudgetChange,
    isLoading,
    isError,
    program,
    programUsdAmount,
    summary,
    allocate,
  } = useAllocateProgram({
    sponsorId,
    programId,
  });

  function renderBody() {
    if (isLoading) {
      return (
        <div className="flex h-full flex-col gap-3">
          <CardProjectLoading />

          <AmountSelectorLoading />

          <AccordionLoading />
        </div>
      );
    }

    if (isError) {
      return <ErrorState />;
    }

    if (!program || !budget) return null;

    return (
      <div className="flex h-full flex-col gap-3">
        <CardProject
          title={program.name}
          logoUrl={program.logoUrl}
          buttonProps={{
            children: `${programUsdAmount} USD`,
          }}
        />

        <div className="flex items-center">
          <AmountSelector
            amount={amount}
            onAmountChange={handleAmountChange}
            budget={budget}
            allBudgets={allBudgets}
            onBudgetChange={handleBudgetChange}
            actions={[
              {
                value: 25,
                label: "25 %",
                type: "PERCENT",
              },
              {
                value: 50,
                label: "50 %",
                type: "PERCENT",
              },
              {
                value: 75,
                label: "75 %",
                type: "PERCENT",
              },
              {
                value: 100,
                label: "100 %",
                type: "PERCENT",
              },
            ]}
          />
        </div>

        <Summary summary={summary} />
      </div>
    );
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: { token: "panels:allocateProgram.title" },
        }}
        canGoBack={canGoBack !== false}
        canClose
      />

      <SidePanelBody>{renderBody()}</SidePanelBody>

      <SidePanelFooter>
        <Button
          variant={"primary"}
          size={"md"}
          onClick={() => allocate.post()}
          isDisabled={isLoading || allocate.isPending || allocate.newBalanceIsNegative}
        >
          <Translate token={"panels:allocateProgram.makeAllocation"} />
        </Button>
      </SidePanelFooter>
    </Panel>
  );
}
