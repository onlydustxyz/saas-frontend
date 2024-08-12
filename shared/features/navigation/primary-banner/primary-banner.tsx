import { ComponentProps } from "react";

import { BannerReactQueryAdapter } from "@/core/application/react-query-adapter/banner";
import { bootstrap } from "@/core/bootstrap";

import { RemixIconsName } from "@/design-system/atoms/icon/adapters/remix-icon/remix-icon-names.types";
import { Skeleton } from "@/design-system/atoms/skeleton";
import { PlgBanner } from "@/design-system/organisms/plg-banner/plg-banner";

import { PrimaryBannerProps } from "@/shared/features/navigation/primary-banner/primary-banner.types";

export function PrimaryBanner({ isFolded }: PrimaryBannerProps) {
  const { format } = bootstrap.getDateHelperPort();
  const { data: bannerData, isLoading, isError } = BannerReactQueryAdapter.client.useGetBanner({});

  function getCta(): ComponentProps<typeof PlgBanner>["cta"] {
    if (!bannerData?.buttonText || !bannerData?.buttonLinkUrl) return undefined;

    return {
      text: bannerData.buttonText,
      href: bannerData.buttonLinkUrl,
      icon: (bannerData.buttonIconSlug as RemixIconsName) || undefined,
    };
  }

  if (isLoading) {
    return <Skeleton className={"h-full w-full"} />;
  }

  if (isFolded || !bannerData || !bannerData.longDescription || isError) {
    return <div className="flex-1" />;
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="h-full w-[260px] min-w-[260px]">
        <PlgBanner
          title={bannerData.title}
          subTitle={bannerData.subTitle}
          date={bannerData.date ? format(new Date(bannerData.date), "MM.dd.yyyy") : undefined}
          description={bannerData.longDescription}
          cta={getCta()}
        />
      </div>
    </div>
  );
}
