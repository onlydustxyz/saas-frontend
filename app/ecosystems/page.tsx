"use client";

import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Orbit } from "lucide-react";

import { Icon } from "@/design-system/atoms/icon";

import { withClientOnly } from "@/shared/components/client-only/client-only";
import { ListBanner } from "@/shared/features/list-banner/list-banner";
import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";

function EcosystemsPage() {
  return (
    <div className="pb-7xl">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Ecosystems",
          },
        ]}
      />

      <div className="mx-auto flex flex-col gap-4xl py-4xl">
        <ListBanner
          title={{ children: "Explore Ecosystems" }}
          subtitle={{
            children:
              "Explore a wide range of projects shaping the future of digital communities and driving transformative change.",
          }}
          logo={<Icon component={Orbit} classNames={{ base: "size-16" }} />}
        />
      </div>
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(EcosystemsPage));
