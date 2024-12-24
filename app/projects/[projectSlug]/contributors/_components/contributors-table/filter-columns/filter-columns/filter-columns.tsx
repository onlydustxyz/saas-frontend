import { TableColumnList } from "@/design-system/molecules/table-column-list";

import { Translate } from "@/shared/translation/components/translate/translate";

import { FilterColumnsProps, TableColumns } from "./filter-columns.types";

export function FilterColumns({ selectedIds, setSelectedIds }: FilterColumnsProps) {
  return (
    <TableColumnList
      titleProps={{ token: "project:details.contributors.filters.columnList" }}
      menuProps={{
        items: [
          {
            id: "from",
            label: <Translate token={"project:details.contributors.columns.from"} />,
            searchValue: "From",
            isCheckbox: true,
          },
          {
            id: "rewardCount",
            label: <Translate token={"project:details.contributors.columns.rewards"} />,
            searchValue: "Rewards",
            isCheckbox: true,
          },
          {
            id: "mergedPullRequestCount",
            label: <Translate token={"project:details.contributors.columns.mergedPr"} />,
            searchValue: "Merged PR",
            isCheckbox: true,
          },
          {
            id: "totalEarnedUsdAmount",
            label: <Translate token={"project:details.contributors.columns.rewardAmount"} />,
            searchValue: "Reward Amount",
            isCheckbox: true,
          },
        ],
        selectedIds,
        onSelect: ids => setSelectedIds(ids as Array<TableColumns>),
        isMultiple: true,
      }}
      popoverProps={{
        placement: "bottom-end",
      }}
    />
  );
}
