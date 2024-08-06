import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { UserFacadePort } from "@/core/domain/user/inputs/user-facade-port";
import { UserProfileInterface } from "@/core/domain/user/models/user-profile-model";
import { SetMyProfileBody } from "@/core/domain/user/user-contract.types";

export function useSetMyProfile({
  options,
}: UseMutationFacadeParams<UserFacadePort["setMyProfile"], undefined, UserProfileInterface, SetMyProfileBody> = {}) {
  const userStoragePort = bootstrap.getUserStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...userStoragePort.setMyProfile({}),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: userStoragePort.getMyProfile({}).tag,
            exact: false,
          });

          options?.onSuccess?.(data, variables, context);
        },
      },
    })
  );
}
