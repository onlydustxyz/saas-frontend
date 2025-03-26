import { useMemo } from "react";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { FirstParameter } from "@/core/kernel/types";

export function AllProjectsBadge({
  queryParams,
}: {
  queryParams: FirstParameter<typeof ProjectReactQueryAdapter.client.useGetProjectsV2>["queryParams"];
}) {
  const { data } = ProjectReactQueryAdapter.client.useGetProjectsV2({
    queryParams,
  });

  return useMemo(() => data?.pages[0].totalItemNumber ?? "-", [data]);
}
