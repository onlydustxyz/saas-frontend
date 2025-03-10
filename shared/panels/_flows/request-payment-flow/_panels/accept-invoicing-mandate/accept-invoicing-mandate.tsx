import { useState } from "react";

import { BillingProfileReactQueryAdapter } from "@/core/application/react-query-adapter/billing-profile";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Checkbox } from "@/design-system/atoms/checkbox";
import { Alert } from "@/design-system/molecules/alert";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { useSidePanel } from "@/shared/features/side-panels/side-panel/side-panel";
import { cn } from "@/shared/helpers/cn";
import { useGenerateInvoice } from "@/shared/panels/_flows/request-payment-flow/_panels/generate-invoice/generate-invoice.hooks";
import { useUploadInvoice } from "@/shared/panels/_flows/request-payment-flow/_panels/upload-invoice/upload-invoice.hooks";
import { useRequestPaymentFlow } from "@/shared/panels/_flows/request-payment-flow/request-payment-flow.context";
import { Translate } from "@/shared/translation/components/translate/translate";

import { InvoiceUploadSelection } from "../_components/invoice-upload-selection/invoice-upload-selection";
import { useInvoicingMandate } from "../invoicing-mandate/invoicing-mandate.hooks";
import { useAcceptInvoicingMandate } from "./accept-invoicing-mandate.hooks";
import { UploadSelection } from "./accept-invoicing-mandate.types";

function Content() {
  const [uploadSelection, setUploadSelection] = useState<UploadSelection>("GENERATE");
  const [mandateAccepted, setMandateAccepted] = useState(false);

  const isUploadSelectionGenerate = uploadSelection === "GENERATE";

  const { billingProfileId } = useRequestPaymentFlow();
  const { open: openInvoicingMandate } = useInvoicingMandate();
  const { open: openGenerateInvoice } = useGenerateInvoice();
  const { open: openUploadInvoice } = useUploadInvoice();

  const { mutate, isPending } = BillingProfileReactQueryAdapter.client.useAcceptOrDeclineBillingProfileMandateById({
    pathParams: {
      billingProfileId: billingProfileId || "",
    },
  });

  function toggleMandateAccepted() {
    setMandateAccepted(!mandateAccepted);
  }

  function toggleUploadSelection() {
    setUploadSelection(isUploadSelectionGenerate ? "MANUAL" : "GENERATE");
  }

  function handleNext() {
    if (isUploadSelectionGenerate) {
      mutate({
        hasAcceptedInvoiceMandate: mandateAccepted,
      });
      openGenerateInvoice();
    } else {
      openUploadInvoice();
    }
  }

  return (
    <>
      <SidePanelHeader
        title={{
          translate: {
            token: "panels:requestPaymentFlow.title",
          },
        }}
        canGoBack
        canClose
      />

      <SidePanelBody>
        <div className="flex h-full flex-col justify-between">
          <InvoiceUploadSelection value={uploadSelection} onChange={toggleUploadSelection} />

          <Alert
            color="brand"
            title={<Translate token="panels:requestPaymentFlow.choices.alert.title" />}
            description={<Translate token="panels:requestPaymentFlow.choices.alert.description" />}
            classNames={{
              description: "whitespace-pre-line",
            }}
          />
        </div>
      </SidePanelBody>

      <SidePanelFooter>
        <div
          className={cn("flex w-full items-center justify-between gap-lg", {
            "justify-end": !isUploadSelectionGenerate,
          })}
        >
          {isUploadSelectionGenerate ? (
            <Button
              size="md"
              variant="secondary"
              onClick={toggleMandateAccepted}
              startContent={<Checkbox value={mandateAccepted} onChange={toggleMandateAccepted} />}
            >
              <Translate token="panels:requestPaymentFlow.footer.accept" />{" "}
              <span
                className="underline"
                onClick={e => {
                  e.stopPropagation();
                  openInvoicingMandate();
                }}
              >
                <Translate token="panels:requestPaymentFlow.footer.mandate" />
              </span>
            </Button>
          ) : null}

          <Button
            size="md"
            onClick={handleNext}
            isDisabled={!mandateAccepted && isUploadSelectionGenerate}
            isLoading={isPending}
          >
            <Translate token="common:next" />
          </Button>
        </div>
      </SidePanelFooter>
    </>
  );
}

export function AcceptInvoicingMandate() {
  const { name } = useAcceptInvoicingMandate();
  const { Panel } = useSidePanel({ name });

  return (
    <Panel>
      <Content />
    </Panel>
  );
}
