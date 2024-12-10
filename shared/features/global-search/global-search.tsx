import { Kbd } from "@nextui-org/kbd";
import { Command } from "cmdk";
import { useTranslation } from "react-i18next";

import { Input } from "@/design-system/atoms/input";

import { EmptyStateLite } from "@/shared/components/empty-state-lite/empty-state-lite";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { ShowMore } from "@/shared/components/show-more/show-more";
import { GlobalSearchProvider, useGlobalSearch } from "@/shared/features/global-search/global-search.context";

import { Header } from "./_components/header/header";
import { ModalPortal } from "./_components/modal-container/modal-container";
import { Filters } from "./_features/filters/filters";
import { Result } from "./_features/result/result";

export function SafeGlobalSearch() {
  const { t } = useTranslation("features");
  const { isOpen, hasNextPage, fetchNextPage, isFetchingNextPage, results, onOpenChange } = useGlobalSearch();

  return (
    <>
      <div className="cursor-pointer" onClick={() => onOpenChange(true)}>
        <Input
          name={"global-search"}
          placeholder={t("globalSearch.menu.placeholder")}
          readOnly={true}
          canInteract={false}
          endContent={
            <Kbd
              keys={["command"]}
              classNames={{
                base: "bg-background-primary rounded-sm shadow-none",
              }}
            >
              K
            </Kbd>
          }
        />
      </div>
      <ModalPortal isOpen={isOpen}>
        <div className={"w-full max-w-[730px] overflow-hidden rounded-xl bg-background-primary effect-box-shadow-sm"}>
          <Command>
            <Header />
            <Filters />
            <div className={"h-auto overflow-hidden p-2"}>
              <ScrollView className="h-[350px]">
                <Command.Empty>
                  <EmptyStateLite />
                </Command.Empty>
                <Command.List className="flex w-full flex-col gap-3 outline-none">
                  {results.map((r, i) => (
                    <Result data={r} key={i} />
                  ))}
                  {hasNextPage && results.length > 0 ? (
                    <ShowMore onNext={fetchNextPage} loading={isFetchingNextPage} />
                  ) : null}
                </Command.List>
              </ScrollView>
            </div>
          </Command>
        </div>
      </ModalPortal>
    </>
  );
}

export function GlobalSearch() {
  if (process.env.NEXT_PUBLIC_ENABLE_GLOBAL_SEARCH === "true") {
    return (
      <GlobalSearchProvider>
        <SafeGlobalSearch />
      </GlobalSearchProvider>
    );
  }

  return null;
}
