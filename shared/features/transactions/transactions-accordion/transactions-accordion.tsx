import { useMemo } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Accordion, AccordionItemProps } from "@/design-system/molecules/accordion";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";

import { TransactionsEmptyState } from "../transactions-empty-state/transactions-empty-state";
import { TransactionsAccordionProps } from "./transactions-accordion.types";

export function TransactionsAccordion({ monthlyTransactions, ContentComponent }: TransactionsAccordionProps) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const items: AccordionItemProps[] = useMemo(() => {
    return (
      monthlyTransactions.map((t, index) => {
        return {
          id: `monthly-transaction-${index}`,
          titleProps: {
            children: dateKernelPort.format(new Date(t.date), "MMMM yyyy"),
          },
          badgeProps: {
            children: t.count,
          },
          content: <ContentComponent date={new Date(t.date)} />,
        };
      }) || []
    );
  }, [monthlyTransactions, dateKernelPort]);

  if (!items.length) {
    return <TransactionsEmptyState />;
  }

  return (
    <div className="overflow-hidden">
      <ScrollView>
        <Accordion items={items} defaultSelected={items?.[0] ? [items?.[0].id] : undefined} />
      </ScrollView>
    </div>
  );
}