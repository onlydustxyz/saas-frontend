import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";
import { GetAllCompletedProjectRewardableItemsModel } from "@/core/domain/reward/reward-contract.types";

export function useGetAllCompletedProjectRewardableItems({
  options,
  pathParams,
  queryParams,
}: UseQueryFacadeParams<
  RewardFacadePort["getAllCompletedProjectRewardableItems"],
  GetAllCompletedProjectRewardableItemsModel
>) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...rewardStoragePort.getAllCompletedProjectRewardableItems({ pathParams, queryParams }),
      options,
    })
  );
}
