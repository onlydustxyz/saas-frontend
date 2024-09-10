import { Alert } from "@/design-system/molecules/alert";

import { FeedbackDrawer } from "@/shared/features/feedback-drawer/feedback-drawer";
import { useFeedbackDrawerState } from "@/shared/features/feedback-drawer/feedback-drawer.hooks";
import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { AllCurrencies } from "@/shared/panels/currency-list-sidepanel/_components/all-currencies/all-currencies";
import { UsedCurrencies } from "@/shared/panels/currency-list-sidepanel/_components/used-currencies/used-currencies";
import { useCurrencyListSidepanel } from "@/shared/panels/currency-list-sidepanel/currency-list-sidepanel.hooks";
import { CurrencyListSidepanelProps } from "@/shared/panels/currency-list-sidepanel/currency-list-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function CurrencyListSidepanel({ sponsorId }: CurrencyListSidepanelProps) {
  const { name } = useCurrencyListSidepanel();
  const { Panel } = useSidePanel({ name });

  const feedbackDrawerState = useFeedbackDrawerState();
  const [, setIsOpen] = feedbackDrawerState;

  function handleOpenFeedbackDrawer() {
    setIsOpen(true);
  }

  return (
    <Panel>
      <SidePanelHeader
        title={{
          translate: { token: "panels:currencyList.title" },
        }}
        canClose
      />

      <SidePanelBody>
        <div className="flex flex-1 flex-col gap-lg">
          <UsedCurrencies sponsorId={sponsorId} />
          <AllCurrencies />
        </div>

        <Alert
          title={<Translate token={"panels:currencyList.alert.title"} />}
          description={<Translate token={"panels:currencyList.alert.description"} />}
          color={"brand"}
          primaryButton={{
            translate: { token: "panels:currencyList.alert.primaryAction" },
            onClick: handleOpenFeedbackDrawer,
          }}
        />
      </SidePanelBody>
      <FeedbackDrawer state={feedbackDrawerState} />
    </Panel>
  );
}
