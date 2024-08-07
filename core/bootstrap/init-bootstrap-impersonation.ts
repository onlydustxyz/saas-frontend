"use client";

import { useEffect } from "react";

import { useClientBootstrapContext } from "@/core/bootstrap/client-bootstrap-context";
import { bootstrap } from "@/core/bootstrap/index";
import { buildImpersonationHeadersFromClaim } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-helpers";
import { ImpersonationProvider } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";
import { ImpersonationClaim } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation.types";

export function InitBootstrapImpersonation() {
  // const { isImpersonating, getImpersonateClaim } = useImpersonation();

  // TODO @impersonation
  // MOCK
  const isImpersonating = false;

  function getImpersonateClaim() {
    return {
      sub: "github|123456",
    };
  }
  // END MOCK

  const { setClientBootstrap } = useClientBootstrapContext();

  useEffect(() => {
    const impersonationProvider: ImpersonationProvider | null = isImpersonating
      ? {
          // If the user is impersonating getImpersonateClaim will return a claim
          getHeaders: () => buildImpersonationHeadersFromClaim(getImpersonateClaim() as ImpersonationClaim),
        }
      : null;

    bootstrap.setImpersonationProvider(impersonationProvider);

    setClientBootstrap(prevState => ({ ...prevState, impersonationProvider }));
  }, [isImpersonating]);

  return null;
}
