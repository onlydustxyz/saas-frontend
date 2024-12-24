import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { CircleDollarSign, GitMerge, Medal } from "lucide-react";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import { ProjectContributorsInterfaceV2 } from "@/core/domain/project/models/project-contributors-model-v2";

import { Icon } from "@/design-system/atoms/icon";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { TABLE_CELL_SIZE } from "@/shared/constants/table";
import { Metric } from "@/shared/features/projects/metric/metric";
import { CellEmpty } from "@/shared/features/table/cell/cell-empty/cell-empty";
import { Translate } from "@/shared/translation/components/translate/translate";

import { TableColumns } from "./filter-columns.types";

export function useFilterColumns() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<ProjectContributorsInterfaceV2>();

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("project-contributors-table-columns");

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds(["login", "rewardCount", "mergedPullRequestCount", "totalEarnedUsdAmount"]);
    }
  }, [selectedIds]);

  const columnMap: Partial<Record<TableColumns, object>> = {
    login: columnHelper.accessor("login", {
      enableSorting: false,
      header: () => <Translate token={"project:details.contributors.columns.from"} />,
      cell: info => {
        const login = info.getValue();
        const avatarUrl = info.row.original.avatarUrl;
        const rank = info.row.original.rank;

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: avatarUrl,
              },
            ]}
            shape={"squared"}
            title={{ children: login }}
            description={{ children: `${rank.rankCategory} ${rank.rank} ${rank.rankPercentile}` }}
            withPopover={false}
          />
        );
      },
    }),
    rewardCount: columnHelper.accessor("rewardCount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.XXXS,
      maxSize: TABLE_CELL_SIZE.XXXS,
      header: () => <Translate token={"project:details.contributors.columns.rewards"} />,
      cell: info => {
        const rewardCount = info.getValue();

        if (!rewardCount) {
          return <CellEmpty />;
        }
        return <Metric icon={Medal} count={rewardCount} iconSize="sm" />;
      },
    }),
    mergedPullRequestCount: columnHelper.accessor("mergedPullRequestCount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.XXXS,
      maxSize: TABLE_CELL_SIZE.XXXS,
      header: () => <Translate token={"project:details.contributors.columns.mergedPr"} />,
      cell: info => {
        const mergedPullRequestCount = info.getValue();

        if (!mergedPullRequestCount) {
          return <CellEmpty />;
        }
        return <Metric icon={GitMerge} count={mergedPullRequestCount} iconSize="sm" />;
      },
    }),
    totalEarnedUsdAmount: columnHelper.accessor("totalEarnedUsdAmount", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.XXXS,
      maxSize: TABLE_CELL_SIZE.XXXS,
      header: () => <Translate token={"project:details.contributors.columns.rewardAmount"} />,
      cell: info => {
        const totalEarnedUsdAmount = info.getValue();

        const { amount, code } = moneyKernelPort.format({
          amount: totalEarnedUsdAmount,
          currency: moneyKernelPort.getCurrency("USD"),
          options: {
            notation: "compact",
          },
          uppercase: true,
        });

        if (!totalEarnedUsdAmount) {
          return <CellEmpty />;
        }

        return (
          <div className="flex items-center gap-sm">
            <Icon component={CircleDollarSign} size="sm" classNames={{ base: "text-foreground-quinary" }} />

            <Typo size="xs" weight="medium">
              {amount} {code}
            </Typo>
          </div>
        );
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<ProjectContributorsInterfaceV2>[];

  return { columns, selectedIds, setSelectedIds };
}
