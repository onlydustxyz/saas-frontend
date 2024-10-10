import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { RewardFacadePort } from "@/core/domain/reward/input/reward-facade-port";
import { AddOtherIssueBody, AddOtherIssueModel } from "@/core/domain/reward/reward-contract.types";

export function useAddOtherIssue({
  pathParams,
  options,
}: UseMutationFacadeParams<RewardFacadePort["addOtherIssue"], undefined, AddOtherIssueModel, AddOtherIssueBody> = {}) {
  const rewardStoragePort = bootstrap.getRewardStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...rewardStoragePort.addOtherIssue({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          if (pathParams?.projectId) {
            await queryClient.invalidateQueries({
              queryKey: rewardStoragePort.getProjectRewardableItems({ pathParams: { projectId: pathParams.projectId } })
                .tag,
              exact: false,
            });

            await queryClient.invalidateQueries({
              queryKey: rewardStoragePort.getAllCompletedProjectRewardableItems({
                pathParams: { projectId: pathParams.projectId },
              }).tag,
              exact: false,
            });
          }

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
