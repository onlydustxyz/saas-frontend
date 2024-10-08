import { Avatar } from "@/design-system/atoms/avatar";
import { withComponentAdapter } from "@/design-system/helpers/with-component-adapter";
import { MenuItemDefaultAdapter } from "@/design-system/molecules/menu-item/adapters/default/default.adapter";

import { MenuItemAvatarPort, MenuItemPort } from "../menu-item.types";

export function MenuItemAvatar<T = string>({ avatar, ...props }: MenuItemAvatarPort<T>) {
  return withComponentAdapter<MenuItemPort<T>>(MenuItemDefaultAdapter)({
    ...props,
    startContent: <Avatar size={"xxs"} {...avatar} />,
  });
}
