import { tv } from "tailwind-variants";

import { cn } from "@/shared/helpers/cn";

import { Tooltip } from "../../tooltip";
import { ButtonGroupPort, ButtonSolidVariant } from "../button.types";
import { Button } from "./button-default";

const ButtonGroupVariant = tv({
  slots: {
    base: "flex overflow-hidden border-1 border-border-primary-alt effect-box-shadow-xs",
  },
  variants: {
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
    size: {
      xs: {
        base: "rounded-sm",
      },
      sm: {
        base: "rounded-md",
      },
      md: {
        base: "rounded-md",
      },
      lg: {
        base: "rounded-lg",
      },
    },
    layout: {
      horizontal: {
        base: "flex-row",
      },
      vertical: {
        base: "flex-col",
      },
    },
  },
  defaultVariants: {
    size: "md",
    layout: "horizontal",
  },
});

function ButtonItem({
  itemProps,
  commonProps,
  hasBorder,
  index,
  fullWidth,
  variant = "secondary",
  layout,
}: {
  itemProps: ButtonGroupPort["buttons"][0];
  commonProps: Omit<ButtonGroupPort, "buttons">;
  index: number;
  hasBorder?: boolean;
  fullWidth?: boolean;
  variant?: ButtonSolidVariant;
  layout?: ButtonGroupPort["layout"];
}) {
  function handleClick() {
    if (commonProps.onClick) {
      commonProps.onClick(index);
    }

    if (itemProps.onClick) {
      itemProps.onClick();
    }
  }

  function renderButton() {
    return (
      <Button
        {...commonProps}
        {...itemProps}
        onClick={handleClick}
        variant={variant}
        classNames={{
          ...commonProps.classNames,
          ...itemProps.classNames,
          base: cn(
            "rounded-none !shadow-none border-r-0 border-b-0 !border-border-primary-alt",
            {
              "border-l-1 border-t-0": layout === "horizontal",
              "border-t-1 border-l-0": layout === "vertical",

              "border-l-0": layout === "horizontal" && !hasBorder,
              "border-t-0": layout === "vertical" && !hasBorder,

              "w-full": fullWidth,
            },
            commonProps.classNames?.base,
            itemProps.classNames?.base
          ),
          content: cn(
            {
              "justify-start": layout === "vertical",
            },
            commonProps.classNames?.content,
            itemProps.classNames?.content
          ),
        }}
      />
    );
  }

  if (itemProps.tooltip) {
    return <Tooltip {...itemProps.tooltip}>{renderButton()}</Tooltip>;
  }

  return renderButton();
}

export function ButtonGroup({ buttons, fullWidth, variant, layout = "horizontal", ...commonProps }: ButtonGroupPort) {
  const { base } = ButtonGroupVariant({ size: commonProps.size, fullWidth, layout });

  return (
    <div className={base()}>
      {buttons.map((itemProps, index) => (
        <div key={index} className={cn({ "flex-1": fullWidth })}>
          <ButtonItem
            itemProps={itemProps}
            commonProps={commonProps}
            hasBorder={index !== 0}
            index={index}
            fullWidth={fullWidth}
            variant={variant}
            layout={layout}
          />
        </div>
      ))}
    </div>
  );
}
