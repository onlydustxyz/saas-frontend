import { usePostHog } from "posthog-js/react";

import { Auth0ClientAdapter } from "@/core/application/auth0-client-adapter";
import { useClientBootstrapAuth } from "@/core/bootstrap/auth/use-client-bootstrap-auth";
import { useClientBootstrapImpersonation } from "@/core/bootstrap/impersonation/use-client-bootstrap-impersonation";

export function usePosthog() {
  const posthog = usePostHog();
  const { isImpersonating } = useClientBootstrapImpersonation();
  const { user } = useClientBootstrapAuth();

  const impersonated_by = Auth0ClientAdapter.helpers.getGithubUserIdFromSub(user?.sub) ?? "UNKNOWN";

  function identify(userId: string, properties?: Record<string, unknown>) {
    posthog.identify(userId, properties);
  }

  function capture(eventName: string, properties?: Record<string, unknown>) {
    const props = isImpersonating ? { ...properties, impersonated_by } : properties;
    posthog.capture(eventName, props);
  }

  function reset() {
    posthog.reset();
  }

  return {
    posthog,
    identify,
    capture,
    reset,
  };
}
