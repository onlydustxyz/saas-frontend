"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";

import { SponsorsTable } from "@/app/financials/_features/sponsors-table/sponsors-table";

import { Typo } from "@/design-system/atoms/typo";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ScrollView } from "@/shared/components/scroll-view/scroll-view";
import { NEXT_ROUTER } from "@/shared/constants/router";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContent } from "@/shared/features/page-content/page-content";
import { PageWrapper } from "@/shared/features/page-wrapper/page-wrapper";
import { useShowSponsorList } from "@/shared/hooks/sponsors/use-show-sponsor-list";
import { Translate } from "@/shared/translation/components/translate/translate";

function withSponsorList<P extends object>(Component: ComponentType<P>) {
  return function WithSponsorList(props: P) {
    const [showSponsorList] = useShowSponsorList();
    const router = useRouter();

    useEffect(() => {
      if (showSponsorList.loading) return;

      if (!showSponsorList.hasMultipleSponsors) {
        router.push(NEXT_ROUTER.financials.programs.root(showSponsorList.firstSponsor ?? ""));
      }
    }, [showSponsorList, router]);

    if (showSponsorList.loading) {
      return null;
    }

    return <Component {...props} />;
  };
}

function FinancialPage() {
  return (
    <PageWrapper>
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: <Translate token={"financials:list.header.title"} />,
            href: NEXT_ROUTER.financials.root,
            level: "1",
          },
        ]}
      />
      <ScrollView>
        <PageContent classNames={{ base: "h-full" }}>
          <div className="flex flex-col gap-4">
            <Typo
              size={"xs"}
              weight={"medium"}
              variant={"heading"}
              translate={{
                token: "financials:list.content.title",
              }}
            />

            <SponsorsTable />
          </div>
        </PageContent>
      </ScrollView>
    </PageWrapper>
  );
}

export default withClientOnly(withAuthenticationRequired(withSponsorList(FinancialPage)));
