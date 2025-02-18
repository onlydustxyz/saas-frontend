"use client";

import { Bell } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import { RegisterHackathonProps } from "@/app/(saas)/osw/_features/register-hackathon/register-hackathon.types";

import { HackathonReactQueryAdapter } from "@/core/application/react-query-adapter/hackathon";
import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { IsAuthenticated, SignInButton } from "@/shared/providers/auth-provider";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Progress } from "@/shared/ui/progress";
import { TypographyMuted } from "@/shared/ui/typography";

function RegisterHackathon({ hackathonSlug }: RegisterHackathonProps) {
  const { capture } = usePosthog();

  const {
    data: hackathon,
    isLoading: hackathonIsLoading,
    isError: hackathonIsError,
  } = HackathonReactQueryAdapter.client.useGetHackathonBySlug({
    pathParams: {
      hackathonSlug,
    },
    options: {
      enabled: Boolean(hackathonSlug),
    },
  });

  const isPast = hackathon?.isPast();

  const {
    data: hackathonRegistration,
    isLoading: hackathonRegistrationIsLoading,
    isError: hackathonRegistrationIsError,
  } = MeReactQueryAdapter.client.useGetMyHackathonRegistration({
    pathParams: { hackathonId: hackathon?.id ?? "" },
    options: {
      enabled: Boolean(hackathon?.id),
    },
  });

  const { mutate: register, isPending: registerIsPending } = MeReactQueryAdapter.client.useRegisterToHackathon({
    pathParams: {
      hackathonId: hackathon?.id ?? "",
    },
    invalidateTagParams: {
      getHackathonBySlug: {
        pathParams: {
          hackathonSlug,
        },
      },
    },
    options: {
      onSuccess: () => {
        toast.success(`Registered to ${hackathon?.title}`);

        capture("hackathon_registration", { hackathon_id: hackathon?.id });
      },
      onError: () => {
        toast.error(`Error registering to ${hackathon?.title}`);
      },
    },
  });

  const isError = hackathonIsError || hackathonRegistrationIsError;
  const isLoading = hackathonIsLoading || hackathonRegistrationIsLoading;
  const isRegistered = hackathonRegistration?.isRegistered;

  const renderRegisterOrProgress = useMemo(() => {
    if (!isRegistered) {
      return (
        <Tooltip content={"The event is over"} enabled={isPast}>
          <Button
            size={"md"}
            onClick={handleClick}
            startIcon={{ component: Bell }}
            classNames={{ base: "w-full" }}
            isLoading={isLoading || registerIsPending}
            isDisabled={isRegistered || isPast}
          >
            Register
          </Button>
        </Tooltip>
      );
    }

    return (
      <div className="flex flex-col items-end gap-1">
        <TypographyMuted>5 applications / 10 remaining</TypographyMuted>
        <Progress value={50} max={100} />
      </div>
    );
  }, [isPast, isRegistered]);

  function handleClick() {
    register({});
  }

  if (isError) return null;

  return renderRegisterOrProgress;
}

export function AuthenticatedRegisterHackathon({ hackathonSlug }: { hackathonSlug: string }) {
  return (
    <IsAuthenticated>
      <IsAuthenticated.Yes>
        <RegisterHackathon hackathonSlug={hackathonSlug} />
      </IsAuthenticated.Yes>
      <IsAuthenticated.No>
        <SignInButton>Registered</SignInButton>
      </IsAuthenticated.No>
    </IsAuthenticated>
  );
}
