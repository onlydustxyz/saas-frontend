import { ColumnDef, SortingState, createColumnHelper } from "@tanstack/react-table";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Flag from "react-flagpack";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "react-use";
import { toast } from "sonner";

import { ProjectReactQueryAdapter } from "@/core/application/react-query-adapter/project";
import { bootstrap } from "@/core/bootstrap";
import { GetIssueApplicantsQueryParams } from "@/core/domain/issue/issue-contract.types";
import { IssueApplicantInterface } from "@/core/domain/issue/models/issue-applicant-model";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { TableCellKpi } from "@/design-system/atoms/table-cell-kpi";
import { Tooltip } from "@/design-system/atoms/tooltip";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelGroup } from "@/design-system/molecules/avatar-label-group";
import { SortDirection } from "@/design-system/molecules/table-sort";

import { AcceptIgnoreApplication } from "@/shared/components/mutation/application/accept-ignore-application/accept-ignore-application";
import { TABLE_CELL_SIZE } from "@/shared/constants/table";
import { ApplicationLimitBadge } from "@/shared/features/application-limit-badge/application-limit-badge";
import { ContributorLabelPopover } from "@/shared/features/popovers/contributor-label-popover/contributor-label-popover";
import {
  FilterColumnsHookProps,
  TableColumns,
} from "@/shared/modals/manage-applicants-modal/_components/applicants-table/_components/filter-columns/filter-columns.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function useFilterColumns({ projectId, onAssign, repoId }: FilterColumnsHookProps) {
  const { t } = useTranslation();

  const moneyKernelPort = bootstrap.getMoneyKernelPort();
  const columnHelper = createColumnHelper<IssueApplicantInterface>();

  const [sorting, setSorting] = useState<SortingState>([]);

  const [selectedIds, setSelectedIds] = useLocalStorage<Array<TableColumns>>("manage-applicants-table-columns");

  const { mutateAsync: updateContributorLabels } = ProjectReactQueryAdapter.client.useUpdateProjectContributorLabels({
    pathParams: { projectId },
  });

  async function onLabelChange(githubUserId: number, selectedIds: string[]) {
    try {
      await updateContributorLabels({
        contributorsLabels: [
          {
            githubUserId,
            labels: selectedIds,
          },
        ],
      });
      toast.success(<Translate token={"modals:manageApplicants.table.toast.success"} />);
    } catch (error) {
      toast.error(<Translate token={"modals:manageApplicants.table.toast.error"} />);
    }
  }

  useEffect(() => {
    if (!selectedIds) {
      setSelectedIds(["contributor", "labels", "languages", "ecosystems", "country", "rewardedAmount", "actions"]);
    }
  }, [selectedIds, setSelectedIds]);

  const sortingMap: Partial<Record<keyof IssueApplicantInterface, GetIssueApplicantsQueryParams["sort"]>> = {
    contributor: "CONTRIBUTOR_LOGIN",
    totalRewardedUsdAmount: "TOTAL_REWARDED_USD_AMOUNT",
  };

  const sortingParams = useMemo(() => {
    if (sorting.length === 0) return null;

    return {
      sort: sortingMap[sorting[0].id as keyof typeof sortingMap],
      sortDirection: sorting[0].desc ? SortDirection.DESC : SortDirection.ASC,
    };
  }, [sorting]);

  const columnMap: Partial<Record<TableColumns, object>> = {
    contributor: columnHelper.accessor("contributor", {
      header: () => <Translate token={"modals:manageApplicants.table.columns.contributor"} />,
      cell: info => {
        const { contributor } = info.row.original;

        return (
          <AvatarLabelGroup
            avatars={[
              {
                src: contributor.avatarUrl,
              },
            ]}
            title={{
              children: (
                <div>
                  {contributor.login}
                  <ApplicationLimitBadge count={11} />
                </div>
              ),
            }}
            description={{ children: contributor.rank.getTitle().wording }}
            withPopover={false}
          />
        );
      },
    }),
    labels: columnHelper.accessor("projectContributorLabels", {
      enableSorting: false,
      header: () => <Translate token={"modals:manageApplicants.table.columns.labels"} />,
      cell: info => {
        const {
          contributor: { githubUserId },
          projectContributorLabels,
        } = info.row.original;

        return (
          <ContributorLabelPopover
            projectIdOrSlug={projectId}
            name={`contributorsLabels-${githubUserId}`}
            placeholder={t("modals:manageApplicants.table.rows.labels.placeholder")}
            onSelect={selectedIds => onLabelChange(githubUserId, selectedIds)}
            selectedLabels={projectContributorLabels ?? []}
          />
        );
      },
    }),
    languages: columnHelper.accessor("languages", {
      enableSorting: false,
      header: () => <Translate token={"modals:manageApplicants.table.columns.languages"} />,
      cell: info => {
        const { languages } = info.row.original;

        if (!languages?.length) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
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
              children: <Translate token={"modals:manageApplicants.table.rows.languages"} count={languages?.length} />,
            }}
          />
        );
      },
    }),
    ecosystems: columnHelper.accessor("ecosystems", {
      enableSorting: false,
      header: () => <Translate token={"modals:manageApplicants.table.columns.ecosystems"} />,
      cell: info => {
        const { ecosystems } = info.row.original;

        if (!ecosystems?.length) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
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
                <Translate token={"modals:manageApplicants.table.rows.ecosystems"} count={ecosystems?.length} />
              ),
            }}
          />
        );
      },
    }),
    country: columnHelper.accessor("country", {
      enableSorting: false,
      size: TABLE_CELL_SIZE.XXS,
      minSize: TABLE_CELL_SIZE.XXS,
      header: () => <Translate token={"modals:manageApplicants.table.columns.country"} />,
      cell: info => {
        const { country } = info.row.original;

        if (!country) {
          return (
            <Typo size="xs" color="secondary">
              -
            </Typo>
          );
        }

        return (
          <TableCellKpi shape={"squared"} badgeClassNames={{ label: "leading-[0]" }}>
            <Tooltip content={country.name}>
              <Flag code={country.code} hasBorder={false} size={"m"} />
            </Tooltip>
          </TableCellKpi>
        );
      },
    }),
    rewardedAmount: columnHelper.accessor("totalRewardedUsdAmount", {
      header: () => <Translate token={"modals:manageApplicants.table.columns.rewardedAmount"} />,
      cell: info => {
        const { totalRewardedUsdAmount } = info.row.original;

        const { amount, code } = moneyKernelPort.format({
          amount: totalRewardedUsdAmount.value,
          currency: moneyKernelPort.getCurrency("USD"),
        });

        return (
          <TableCellKpi>
            {amount} {code}
          </TableCellKpi>
        );
      },
    }),
    actions: columnHelper.display({
      id: "actions",
      enableResizing: false,
      header: () => <Translate token={"programs:list.content.table.columns.actions"} />,
      cell: info => {
        const { applicationId } = info.row.original;

        if (!applicationId) return null;

        return (
          <div className={"flex gap-sm"}>
            <AcceptIgnoreApplication
              applicationId={applicationId}
              repoId={repoId}
              acceptOptions={{
                onSuccess: () => {
                  onAssign();
                },
              }}
            >
              {({ accept, ignore, isUpdating, isDisabled }) => (
                <>
                  <Button
                    startIcon={{ component: CircleX }}
                    variant={"secondary"}
                    size={"sm"}
                    onClick={ignore}
                    isLoading={isUpdating}
                    isDisabled={isDisabled}
                  >
                    <Translate token={"modals:manageApplicants.table.rows.ignore"} />
                  </Button>

                  <Button
                    startIcon={{ component: CircleCheck }}
                    variant={"secondary"}
                    size={"sm"}
                    onClick={accept}
                    isLoading={isUpdating}
                    isDisabled={isDisabled}
                  >
                    <Translate token={"modals:manageApplicants.table.rows.assign"} />
                  </Button>
                </>
              )}
            </AcceptIgnoreApplication>
          </div>
        );
      },
    }),
  } as const;

  const columnMapKeys = Object.keys(columnMap) as Array<keyof typeof columnMap>;

  // Loop on object keys to keep column order
  const columns = columnMapKeys
    .map(key => (selectedIds?.includes(key) ? columnMap[key] : null))
    .filter(Boolean) as ColumnDef<IssueApplicantInterface>[];

  return { columns, selectedIds, setSelectedIds, sorting, setSorting, sortingParams };
}
