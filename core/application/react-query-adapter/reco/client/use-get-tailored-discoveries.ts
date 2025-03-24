import { useQuery } from "@tanstack/react-query";

import { bootstrap } from "@/core/bootstrap";
import { RecoFacadePort } from "@/core/domain/reco/input/reco-facade-port";
import { GetTailoredDiscoveriesModel } from "@/core/domain/reco/reco-contract.types";

import { UseQueryFacadeParams, useQueryAdapter } from "../../helpers/use-query-adapter";

export function useGetTailoredDiscoveries({
  options,
  queryParams,
}: UseQueryFacadeParams<RecoFacadePort["getTailoredDiscoveries"], GetTailoredDiscoveriesModel>) {
  const recoStoragePort = bootstrap.getRecoStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...recoStoragePort.getTailoredDiscoveries({ queryParams }),
      options,
    })
  );
}
