import { AnyType } from "@/core/kernel/types";

import { MenuPort, PopOverMenuPort } from "@/design-system/molecules/menu/menu.types";

export function isMenuPopOver(menu: MenuPort<AnyType>): menu is PopOverMenuPort<AnyType> {
  return (menu as PopOverMenuPort).isPopOver !== undefined;
}
