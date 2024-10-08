import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { useEffect } from "react";
import Flag from "react-flagpack";
import { useLocalStorage } from "react-use";

import { bootstrap } from "@/core/bootstrap";
import { BiContributorInterface, BiContributorResponse } from "@/core/domain/bi/models/bi-contributor-model";

import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";

import { Translate } from "@/shared/translation/components/translate/translate";

export function useFilterColumns() {
  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<BiContributorInterface>();

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<keyof BiContributorResponse>>(
    "deep-dive-contributors-table-columns"
  );

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds([
        "contributor",
        "projects",
        "categories",
        "languages",
        "ecosystems",
        "countryCode",
        "totalRewardedUsdAmount",
        "contributionCount",
        "prCount",
        "rewardCount",
      ]);
    }
  }, [selectedIds, setSelectedIds]);

  const columnMap: Partial<Record<keyof BiContributorResponse, object>> = {
    contributor: columnHelper.accessor("contributor", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.contributorName"} />,
      cell: info => {
        const contributor = info.getValue();

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: contributor.avatarUrl,
              },
            ]}
            shape={"squared"}
            title={{ children: contributor.login }}
          />
        );
      },
    }),
    projects: columnHelper.accessor("projects", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.projects"} />,
      cell: info => {
        const projects = info.getValue() ?? [];

        if (!projects.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        if (projects.length === 1) {
          const project = projects[0];

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: project.logoUrl,
                },
              ]}
              title={{ children: project.name }}
              description={{ children: <Translate token={"data:deepDive.projectsTable.rows.projectLead"} /> }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={projects.map(project => ({
              src: project.logoUrl,
              name: project.name,
            }))}
            quantity={3}
            title={{
              children: <Translate token={"data:deepDive.contributorsTable.rows.projects"} count={projects?.length} />,
            }}
          />
        );
      },
    }),
    categories: columnHelper.accessor("categories", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.categories"} />,
      cell: info => {
        const categories = info.getValue();

        if (!categories?.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return <TableCellKpi>{categories.map(category => category.name).join(", ")}</TableCellKpi>;
      },
    }),
    languages: columnHelper.accessor("languages", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.languages"} />,
      cell: info => {
        const languages = info.getValue() ?? [];

        if (!languages.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        if (languages.length === 1) {
          const language = languages[0];

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: language.logoUrl,
                },
              ]}
              title={{ children: language.name }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={languages.map(language => ({
              src: language.logoUrl,
              name: language.name,
            }))}
            quantity={3}
            title={{
              children: (
                <Translate token={"data:deepDive.contributorsTable.rows.languages"} count={languages?.length} />
              ),
            }}
          />
        );
      },
    }),
    ecosystems: columnHelper.accessor("ecosystems", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.ecosystems"} />,
      cell: info => {
        const ecosystems = info.getValue() ?? [];

        if (!ecosystems.length) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        if (ecosystems.length === 1) {
          const ecosystem = ecosystems[0];

          return (
            <AvatarLabelGroup
              avatars={[
                {
                  src: ecosystem.logoUrl,
                },
              ]}
              title={{ children: ecosystem.name }}
            />
          );
        }

        return (
          <AvatarLabelGroup
            avatars={ecosystems.map(ecosystem => ({
              src: ecosystem.logoUrl,
              name: ecosystem.name,
            }))}
            quantity={3}
            title={{
              children: (
                <Translate token={"data:deepDive.contributorsTable.rows.ecosystems"} count={ecosystems?.length} />
              ),
            }}
          />
        );
      },
    }),
    countryCode: columnHelper.accessor("countryCode", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.country"} />,
      cell: info => {
        const countryCode = info.getValue();

        if (!countryCode) {
          return <Typo size={"xs"}>N/A</Typo>;
        }

        return (
          <TableCellKpi shape={"squared"} badgeClassNames={{ label: "leading-[0]" }}>
            <Flag code={countryCode} hasBorder={false} size={"m"} />
          </TableCellKpi>
        );
      },
    }),
    totalRewardedUsdAmount: columnHelper.accessor("totalRewardedUsdAmount", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.totalRewardedUsdAmount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const { amount, code } = moneyKernelPort.format({
          amount: value,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return (
          <TableCellKpi trend={trend}>
            {amount} {code}
          </TableCellKpi>
        );
      },
    }),
    contributionCount: columnHelper.accessor("contributionCount", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.contributionCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),
    prCount: columnHelper.accessor("prCount", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.prCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),
    rewardCount: columnHelper.accessor("rewardCount", {
      header: () => <Translate token={"data:deepDive.contributorsTable.columns.rewardCount"} />,
      cell: info => {
        const { value, trend } = info.getValue() ?? {};

        const formattedValue = Intl.NumberFormat().format(value);

        return <TableCellKpi trend={trend}>{formattedValue}</TableCellKpi>;
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<BiContributorInterface>[];

  return { columns, selectedIds, setSelectedIds };
}
