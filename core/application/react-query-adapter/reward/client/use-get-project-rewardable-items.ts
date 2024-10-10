import { useInfiniteQuery } from "@tanstack/react-query";

import {
  UseInfiniteQueryFacadeParams,
  useInfiniteQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-infinite-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";
import { GetProjectRewardableItemsModel } from "@/core/domain/reward/reward-contract.types";

export function useGetProjectRewardableItems({
  pathParams,
  queryParams,
  options,
}: UseInfiniteQueryFacadeParams<RewardFacadePort["getProjectRewardableItems"], GetProjectRewardableItemsModel>) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();

  return useInfiniteQuery(
    useInfiniteQueryAdapter<RewardFacadePort["getProjectRewardableItems"], GetProjectRewardableItemsModel>({
      pathParams,
      queryParams,
      options,
      httpStorage: rewardStoragePort.getProjectRewardableItems,
    })
  );
}
