import { useQuery } from "@tanstack/react-query";

import {
  UseQueryFacadeParams,
  useQueryAdapter,
} from "@/core/application/react-query-adapter/helpers/use-query-adapter";
import { bootstrap } from "@/core/bootstrap";
import { LeaderboardFacadePort } from "@/core/domain/leaderboard/input/leaderboard-facade-port";
import { GetLeaderboardModel } from "@/core/domain/leaderboard/leaderboard-contract.types";

export function useGetLeaderboard({
  options,
  queryParams,
}: UseQueryFacadeParams<LeaderboardFacadePort["getLeaderboard"], GetLeaderboardModel>) {
  const leaderboardStoragePort = bootstrap.getLeaderboardStoragePortForClient();

  return useQuery(
    useQueryAdapter({
      ...leaderboardStoragePort.getLeaderboard({ queryParams }),
      options,
    })
  );
}
