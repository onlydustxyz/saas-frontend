import { ChevronsLeft, Menu } from "lucide-react";

import { Breadcrumbs } from "@/design-system/atoms/breadcrumbs";
import { Button } from "@/design-system/atoms/button/variants/button-default";

import { BaseLink } from "@/shared/components/base-link/base-link";
import { Logo } from "@/shared/components/logo/logo";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { GlobalSearch } from "@/shared/features/global-search/global-search";
import { UserMenu } from "@/shared/features/navigation/_components/user-menu/user-menu";
import { NotificationsPopover } from "@/shared/features/notifications/notifications-popover";

import { useNavigation } from "../../navigation.context";
import { HeaderProps } from "./header.types";

export function Header({ onToggle, isOpen }: HeaderProps) {
  const { breadcrumb } = useNavigation();
  return (
    <header className={"flex w-full justify-between gap-xs border-b-1 border-border-primary px-2xl py-xl"}>
      <div className="flex flex-1 flex-row items-center justify-start">
        <Button
          variant={"tertiary"}
          iconOnly={true}
          size={"sm"}
          startIcon={{ component: isOpen ? ChevronsLeft : Menu }}
          onClick={onToggle}
        />
        {breadcrumb && <Breadcrumbs items={breadcrumb} />}
      </div>
      <div className="flex flex-1 flex-row items-center justify-center">
        <BaseLink href={NEXT_ROUTER.home.root} className={"flex flex-row items-center justify-center"}>
          <Logo />
        </BaseLink>
      </div>
      <div className={"flex flex-1 flex-row items-center justify-end gap-6"}>
        <GlobalSearch />
        <NotificationsPopover />
        <UserMenu isCompact={true} />
      </div>
    </header>
  );
}
