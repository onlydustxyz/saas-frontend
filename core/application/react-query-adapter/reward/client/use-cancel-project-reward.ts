import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";

export function useCancelProjectReward({
  pathParams,
  options,
}: UseMutationFacadeParams<RewardFacadePort["cancelProjectReward"], undefined, unknown> = {}) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...rewardStoragePort.cancelProjectReward({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.projectId) {
            await queryClient.invalidateQueries({
              queryKey: rewardStoragePort.getProjectRewards({ pathParams: { projectId: pathParams.projectId } }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}