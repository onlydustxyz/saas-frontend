import { ArrowUpDown } from "lucide-react";
import { ChangeEvent, useMemo, useRef, useState } from "react";

import { bootstrap } from "@/core/bootstrap";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";

import { cn } from "@/shared/helpers/cn";

import { AmountFieldProps } from "./amount-field.types";

type conversion = "conversion";
type currency = "currency";
export function AmountField({ onAmountChange, amount, readOnly, isFilled, budget }: AmountFieldProps) {
  const [order, setOrder] = useState<conversion | currency>("currency");
  const { format, getCurrency, maximumSignificantDigits } = bootstrap.getMoneyKernelPort();
  const inputRef = useRef<HTMLInputElement>(null);
  const isCurrencyFirst = order === "currency";
  const isConversionFirst = order === "conversion";

  function handleFocusInput() {
    inputRef.current?.focus();
  }

  function handleChangeAmount(e: ChangeEvent<HTMLInputElement>) {
    if (!readOnly && onAmountChange) {
      let value = e.target.value;

      // Only allow numbers and one dot
      value = value.replace(/[^\d.]/g, "");

      // A single decimal is considered valid but will cause NaN errors
      if (value === ".") {
        return;
      }

      if (value.length > 1 && value.startsWith("0") && !value.startsWith("0.")) {
        value = value.slice(1);
      }

      if (value.length > maximumSignificantDigits) {
        return;
      }

      if (value.includes(".") && value.length > maximumSignificantDigits + 1) {
        return;
      }

      if (isCurrencyFirst) {
        return onAmountChange(value || "0");
      }

      if (isConversionFirst) {
        const amount = parseFloat(value || "0") / (budget.usdConversionRate ?? 0);
        return onAmountChange(`${amount ?? 0}`);
      }
    }
  }

  function onChangeOrder() {
    if (isCurrencyFirst) {
      return setOrder("conversion");
    }

    return setOrder("currency");
  }

  const { primary, secondary } = useMemo(() => {
    const usdAmount = parseFloat(amount) * (budget.usdConversionRate ?? 0);
    const { amount: formattedUsdAmount } = format({
      amount: usdAmount,
      currency: getCurrency("USD"),
    });
    const { amount: formattedCurrencyAmount } = format({
      amount: parseFloat(amount),
      currency: budget.currency,
      options: { maximumSignificantDigits },
    });

    if (isConversionFirst) {
      return {
        primary: {
          value: `${formattedUsdAmount.replaceAll(",", "") ?? 0}`,
          currency: "USD",
        },
        secondary: {
          value: formattedCurrencyAmount,
          currency: budget.currency.code,
        },
      };
    }

    return {
      primary: {
        value: `${formattedCurrencyAmount.replaceAll(",", "") ?? 0}`,
        currency: budget.currency.code,
      },
      secondary: {
        value: formattedUsdAmount,
        currency: "USD",
      },
    };
  }, [isCurrencyFirst, isConversionFirst, budget, amount]);

  const inputWidth = useMemo(() => Math.min(Math.max(primary.value.length, 1), 50) + "ch", [primary]);

  return (
    <div className={"grid justify-center gap-2"}>
      <div
        className={cn("mx-auto flex items-center gap-1 text-lg", {
          "text-xl": primary.value.length < 22,
          "text-2xl": primary.value.length < 18,
          "text-3xl": primary.value.length < 14,
          "text-4xl": primary.value.length < 11,
        })}
      >
        <input
          ref={inputRef}
          type="text"
          style={{ width: inputWidth }}
          className={cn(
            "flex bg-transparent text-right font-medium tabular-nums text-typography-primary outline-none transition-colors",
            {
              "text-typography-tertiary placeholder:text-typography-tertiary": !isFilled,
            }
          )}
          value={primary.value}
          onChange={handleChangeAmount}
          readOnly={readOnly}
          placeholder={"_"}
        />
        <div onClick={handleFocusInput}>
          <span
            className={cn("font-clash font-medium text-typography-primary transition-colors", {
              "text-typography-tertiary": !isFilled,
            })}
          >
            {primary.currency}
          </span>
        </div>
      </div>
      <div className={"flex w-full flex-row justify-center"}>
        <Button
          variant={"secondary"}
          size={"xs"}
          iconOnly={true}
          startIcon={{ component: ArrowUpDown }}
          onClick={onChangeOrder}
        />
      </div>
      <Typo
        size={"md"}
        color={"secondary"}
        classNames={{
          base: cn("text-center transition-all"),
        }}
      >
        {secondary.value} {secondary.currency}
      </Typo>
    </div>
  );
}
