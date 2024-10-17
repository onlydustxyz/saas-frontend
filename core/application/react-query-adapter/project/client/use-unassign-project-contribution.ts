import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  UseMutationFacadeParams,
  useMutationAdapter,
} from "@/core/application/react-query-adapter/helpers/use-mutation-adapter";
import { bootstrap } from "@/core/bootstrap";
import { ProjectFacadePort } from "@/core/domain/project/input/project-facade-port";

export function useUnassignProjectContribution({
  pathParams,
  options,
  invalidateTagParams,
}: UseMutationFacadeParams<
  ProjectFacadePort["unassignProjectContribution"],
  {
    contribution: {
      pathParams: {
        contributionGithubId: number;
      };
    };
  },
  unknown
> = {}) {
  const projectStoragePort = bootstrap.getProjectStoragePortForClient();
  const contributionStorageProt = bootstrap.getContributionStoragePortForClient();
  const queryClient = useQueryClient();

  return useMutation(
    useMutationAdapter({
      ...projectStoragePort.unassignProjectContribution({ pathParams }),
      options: {
        ...options,
        onSuccess: async (data, variables, context) => {
          await queryClient.invalidateQueries({
            queryKey: contributionStorageProt.getContributions({}).tag,
            exact: false,
          });

          if (invalidateTagParams) {
            await queryClient.invalidateQueries({
              queryKey: contributionStorageProt.getContributionsById({
                pathParams: { contributionGithubId: invalidateTagParams.contribution.pathParams.contributionGithubId },
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
