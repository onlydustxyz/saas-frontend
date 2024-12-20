import { ElementType, useMemo } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Popover } from "@/design-system/atoms/popover";
import { Typo, TypoSize } from "@/design-system/atoms/typo";
import { AvatarGroup } from "@/design-system/molecules/avatar-group";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { cn } from "@/shared/helpers/cn";

import { AvatarLabelGroupPort } from "../../avatar-label-group.types";
import { AvatarLabelGroupDefaultVariants } from "./default.variants";

export function AvatarLabelGroupDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  avatars,
  title,
  description,
  size = "md",
  shape,
  quantity,
  truncate,
  withPopover = true,
  popoverContent,
}: AvatarLabelGroupPort<C>) {
  const Component = as || "div";
  const slots = AvatarLabelGroupDefaultVariants({ truncate });

  const { titleSize, descriptionSize } = useMemo(() => {
    let titleSize: TypoSize = "sm";
    let descriptionSize: TypoSize = "sm";

    switch (size) {
      case "md":
      case "sm":
      case "xs":
        descriptionSize = "xs";
        break;
      case "xxs":
        titleSize = "xs";
        descriptionSize = "xs";
        break;
    }

    return { titleSize, descriptionSize };
  }, [size]);

  function renderContent() {
    return (
      <Component {...htmlProps} className={cn(slots.base(), classNames?.base)}>
        {avatars.length === 1 ? (
          <Avatar src={avatars[0].src} size={size} shape={shape} />
        ) : (
          <AvatarGroup avatars={avatars} size={size} outsideBorder quantity={quantity} shape={shape} />
        )}

        <div className="flex flex-col">
          {title ? (
            <Typo
              size={titleSize}
              weight="medium"
              color="secondary"
              classNames={{
                base: slots.title(),
              }}
              {...title}
            />
          ) : null}

          {description ? (
            <Typo
              size={descriptionSize}
              color="tertiary"
              classNames={{
                base: slots.description(),
              }}
              {...description}
            />
          ) : null}
        </div>
      </Component>
    );
  }

  if (withPopover && avatars?.length > 0) {
    return (
      <Popover>
        <Popover.Trigger>{() => renderContent()}</Popover.Trigger>

        <Popover.Content>
          {() => (
            <div className="h-fit w-fit overflow-hidden">
              <ScrollView className={"max-h-[300px]"}>
                <div className="flex w-fit flex-col gap-2">
                  {popoverContent
                    ? popoverContent
                    : avatars?.map((avatar, index) => (
                        <AvatarLabelGroup
                          shape={shape}
                          avatars={[avatar]}
                          key={index}
                          title={avatar?.name ? { children: avatar?.name } : title}
                          withPopover={false}
                        />
                      ))}
                </div>
              </ScrollView>
            </div>
          )}
        </Popover.Content>
      </Popover>
    );
  }

  return renderContent();
}
