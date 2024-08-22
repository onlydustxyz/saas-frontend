import { ArrowDown, ArrowRight, ChartPie } from "lucide-react";
import { PropsWithChildren } from "react";

import { SummaryProps } from "@/app/programs/[programId]/_features/grant-form-sidepanel/_components/summary/summary.types";

import { bootstrap } from "@/core/bootstrap";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarDescription } from "@/design-system/molecules/avatar-description";

function Section({ children }: PropsWithChildren) {
  return (
    <section className="overflow-hidden rounded-lg border border-container-stroke-separator bg-container-3 px-4 py-3">
      {children}
    </section>
  );
}

export function Summary({ amount, budget, project }: SummaryProps) {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();

  const { amount: currentBudgetBalance } = moneyKernelPort.format({
    amount: budget.amount,
    currency: budget.currency,
  });

  const { amount: formattedAmount } = moneyKernelPort.format({
    amount: parseFloat(amount),
    currency: budget.currency,
  });

  const { amount: newBudgetBalance } = moneyKernelPort.format({
    amount: budget.amount - parseFloat(amount),
    currency: budget.currency,
  });

  const projectBudget = project.totalAvailable.totalPerCurrency?.find(b => {
    return b.currency.id === budget.currency.id;
  });

  const rawCurrentProjectBalance = projectBudget?.amount ?? 0;

  const { amount: currentProjectBalance } = moneyKernelPort.format({
    amount: rawCurrentProjectBalance,
    currency: budget.currency,
  });

  const { amount: newProjectBalance } = moneyKernelPort.format({
    amount: rawCurrentProjectBalance + parseFloat(amount),
    currency: budget.currency,
  });

  return (
    <Paper size={"s"} container={"transparent"}>
      <div className="grid gap-3">
        <header className={"flex items-center gap-1"}>
          <ChartPie size={16} />
          <Typo size={"xs"} weight={"medium"} translate={{ token: "programs:grantForm.summary.title" }} />
        </header>

        <Section>
          <div className="mb-4 flex items-center justify-between gap-4">
            <AvatarDescription
              avatarProps={{
                src: budget.currency.logoUrl,
                alt: budget.currency.name,
                size: "s",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.balance",
                  values: {
                    budget: budget.currency.name,
                  },
                },
              }}
            />

            <Typo
              as={"div"}
              htmlProps={{ title: currentBudgetBalance }}
              size={"s"}
              color={"text-2"}
              classNames={{ base: "flex gap-1 w-full overflow-hidden justify-end" }}
            >
              <span className={"truncate"}>{currentBudgetBalance}</span>
              <span>{budget.currency.code}</span>
            </Typo>
          </div>

          <div className="mb-2 flex items-center justify-between gap-4">
            <AvatarDescription
              avatarProps={{
                src: budget.currency.logoUrl,
                alt: budget.currency.name,
                size: "s",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.grant",
                  values: {
                    budget: budget.currency.name,
                  },
                },
              }}
            />

            <div className={"flex w-full items-center justify-end gap-1 overflow-hidden"}>
              <div className={"text-label-blue"}>
                <ArrowRight size={16} />
              </div>

              <Typo
                as={"div"}
                htmlProps={{ title: formattedAmount }}
                size={"s"}
                classNames={{ base: "flex gap-1 overflow-hidden justify-end" }}
              >
                <span className={"truncate"}>{formattedAmount}</span>
                <span>{budget.currency.code}</span>
              </Typo>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-container-stroke-separator pt-2">
            <AvatarDescription
              avatarProps={{
                src: budget.currency.logoUrl,
                alt: budget.currency.name,
                size: "s",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.balance",
                  values: {
                    budget: budget.currency.name,
                  },
                },
              }}
            />

            <Typo
              as={"div"}
              htmlProps={{ title: newBudgetBalance }}
              size={"s"}
              color={"text-2"}
              classNames={{ base: "flex gap-1 w-full overflow-hidden justify-end" }}
            >
              <span className={"truncate"}>{newBudgetBalance}</span>
              <span>{budget.currency.code}</span>
            </Typo>
          </div>
        </Section>

        <Section>
          <div className="mb-4 flex items-center justify-between gap-4">
            <AvatarDescription
              avatarProps={{
                src: project.logoUrl,
                alt: project.name,
                size: "s",
                shape: "square",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.project.balance",
                  values: {
                    project: project.name,
                  },
                },
              }}
            />

            <Typo
              as={"div"}
              htmlProps={{ title: currentProjectBalance }}
              size={"s"}
              color={"text-2"}
              classNames={{ base: "flex gap-1 w-full overflow-hidden justify-end" }}
            >
              <span className={"truncate"}>{currentProjectBalance}</span>
              <span>{budget.currency.code}</span>
            </Typo>
          </div>

          <div className="mb-2 flex items-center justify-between gap-4">
            <AvatarDescription
              avatarProps={{
                src: project.logoUrl,
                alt: project.name,
                size: "s",
                shape: "square",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.budget.grant",
                  values: {
                    budget: budget.currency.name,
                  },
                },
              }}
            />

            <div className={"flex w-full items-center justify-end gap-1 overflow-hidden"}>
              <div className="text-label-green">
                <ArrowDown size={16} />
              </div>

              <Typo
                as={"div"}
                htmlProps={{ title: formattedAmount }}
                size={"s"}
                classNames={{ base: "flex gap-1 overflow-hidden justify-end" }}
              >
                <span className={"truncate"}>{formattedAmount}</span>
                <span>{budget.currency.code}</span>
              </Typo>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-container-stroke-separator pt-2">
            <AvatarDescription
              avatarProps={{
                src: project.logoUrl,
                alt: project.name,
                size: "s",
                shape: "square",
              }}
              labelProps={{
                translate: {
                  token: "programs:grantForm.summary.project.balance",
                  values: {
                    project: project.name,
                  },
                },
              }}
            />

            <Typo
              as={"div"}
              htmlProps={{ title: newProjectBalance }}
              size={"s"}
              color={"text-2"}
              classNames={{ base: "flex gap-1 w-full overflow-hidden justify-end" }}
            >
              <span className={"truncate"}>{newProjectBalance}</span>
              <span>{budget.currency.code}</span>
            </Typo>
          </div>
        </Section>
      </div>
    </Paper>
  );
}
