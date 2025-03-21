"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";

import { BiReactQueryAdapter } from "@/core/application/react-query-adapter/bi";
import { bootstrap } from "@/core/bootstrap";
import { GetBiProjectsQueryParams } from "@/core/domain/bi/bi-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Tooltip } from "@/design-system/atoms/tooltip";

import { Translate } from "@/shared/translation/components/translate/translate";

export function ExportCsv({ queryParams }: { queryParams: Partial<GetBiProjectsQueryParams> }) {
  const fileKernelPort = bootstrap.getFileKernelPort();

  const { mutate, isPending } = BiReactQueryAdapter.client.useGetBiProjectsCsv({
    queryParams: {
      ...queryParams,
      pageIndex: 0,
      pageSize: 10000,
    },
    options: {
      onSuccess: data => {
        fileKernelPort.download({
          blob: data,
          name: `projects-${new Date().getTime()}`,
          extension: "csv",
        });

        toast.success(<Translate token={"data:projectsTable.export.success"} />);
      },
      onError: () => {
        toast.error(<Translate token={"data:projectsTable.export.error"} />);
      },
    },
  });

  function handleClick() {
    mutate({});
  }

  return (
    <Tooltip content={<Translate token={"data:projectsTable.export.tooltip"} />}>
      <Button
        variant={"secondary"}
        size="sm"
        startIcon={{ component: Download }}
        iconOnly
        onClick={handleClick}
        isDisabled={isPending}
      />
    </Tooltip>
  );
}
