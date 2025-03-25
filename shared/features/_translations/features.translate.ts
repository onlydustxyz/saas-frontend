import enCardProjectCategory from "@/design-system/molecules/cards/card-project-category/_translations/card-project-category.en.json";
import enCardProjectOverview from "@/design-system/molecules/cards/card-project-overview/_translations/card-project-overview.en.json";

import enRepoIndexingAlert from "@/shared/features/alerts/repo-indexing-alert/_translations/repo-indexing-alert.en.json";
import enAmountSelector from "@/shared/features/amount-selector/_translations/amount-selector.en.json";
import enCardContributionKanban from "@/shared/features/card-contribution-kanban/card-contribution-kanban-translate.en.json";
import enContributionPopover from "@/shared/features/contributions/contributions-popover/contributions-popover-translate.en.json";
import enContributorActivityGraph from "@/shared/features/contributors/activity-graph/contributor-activity-graph-translate.en.json";
import enContributorProfileCheckbox from "@/shared/features/contributors/contributor-profile-checkbox/contributor-profile-checkbox-translate.en.json";
import enContributorProfileExtended from "@/shared/features/contributors/contributor-profile-extended/contributor-profile-extended-translate.en.json";
import { enFiltersTranslations } from "@/shared/features/filters/_translations/filters.translate";
import enGithubMissingPermissionsAlert from "@/shared/features/github-permissions/_components/github-missing-permissions-alert/_translations/github-missing-permissions-alert.en.json";
import { enGlobalSearchTranslation } from "@/shared/features/global-search/_translations/global-search.translate";
import enInvoices from "@/shared/features/invoice/_translations/invoice.en.json";
import enPayoutStatus from "@/shared/features/payout-status/_translations/payout-status.en.json";
import { enPopoversTranslations } from "@/shared/features/popovers/_translations/popovers.translate";
import { enCellTranslation } from "@/shared/features/table/cell/_translations/cell.translate";
import { enTransactionsTranslation } from "@/shared/features/transactions/_translations/transactions.translate";

export const enFeaturesTranslations = {
  features: {
    amountSelector: enAmountSelector,
    invoices: enInvoices,
    contributionPopover: enContributionPopover,
    githubMissingPermissionsAlert: enGithubMissingPermissionsAlert,
    repoIndexingAlert: enRepoIndexingAlert,
    payoutStatus: enPayoutStatus,
    cardContributionKanban: enCardContributionKanban,
    cardProjectCategory: enCardProjectCategory,
    cardProjectOverview: enCardProjectOverview,
    contributorProfileExtended: enContributorProfileExtended,
    contributorProfileCheckbox: enContributorProfileCheckbox,
    contributorActivityGraph: enContributorActivityGraph,
    ...enCellTranslation,
    ...enFiltersTranslations,
    ...enPopoversTranslations,
    ...enTransactionsTranslation,
    ...enGlobalSearchTranslation,
  },
};
