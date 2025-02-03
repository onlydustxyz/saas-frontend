import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { MeFacadePort } from "@/core/domain/me/inputs/me-facade-port";
import { MeInterface } from "@/core/domain/me/models/me-model";

export function useGetUpdateGithubProfile({
  options,
}: UseQueryFacadeParams<MeFacadePort["getUpdateGithubProfile"], MeInterface>) {
  const meStoragePort = bootstrap.getMeStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...meStoragePort.getUpdateGithubProfile({}),
      options,
    })
  );
}
