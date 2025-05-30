import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { MeHackathonRegistrationInterface } from "@/core/domain/me/models/me-hackathon-registration-model";

export function useGetMyHackathonRegistration({
  pathParams,
  options,
}: UseQueryFacadeParams<MeFacadePort["getMyHackathonRegistration"], MeHackathonRegistrationInterface>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getMyHackathonRegistration({ pathParams }),
      options,
    })
  );
}
