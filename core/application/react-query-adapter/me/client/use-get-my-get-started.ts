import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { MeGetStartedInterface } from "@/core/domain/me/models/me-get-started-model";

export function useGetMyGetStarted({
  options,
}: UseQueryFacadeParams<MeFacadePort["getMyGetStarted"], MeGetStartedInterface>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getMyGetStarted({}),
      options,
    })
  );
}
