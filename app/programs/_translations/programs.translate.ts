import enBudgetAvailable from "@/app/programs/[programId]/_features/financial-section/components/budget-available-cards/budget-available.en.json";
import enFinancialColumnChart from "@/app/programs/[programId]/_features/financial-section/components/financial-column-chart/financial-column-chart.en.json";
import enFinancialDetailSidePanel from "@/app/programs/[programId]/_features/financial-section/components/financial-detail-sidepanel/financial-detail-sidepanel.en.json";
import enGrantList from "@/app/programs/[programId]/_features/grant-list-sidepanel/_translations/grant-list.en.json";
import enTransactionPanel from "@/app/programs/[programId]/_features/transactions-sidepanel/_translations/transaction-sidepanel.en.json";
import enProgramsDetails from "@/app/programs/[programId]/_translations/programs-detail.en.json";

import enProjectDetail from "../[programId]/_features/project-sidepanel/project-sidepanel.en.json";
import enPrograms from "./programs.en.json";

export const enProgramsTranslation = {
  programs: {
    list: enPrograms,
    details: enProgramsDetails,
    transactionPanel: enTransactionPanel,
    financialColumnChart: enFinancialColumnChart,
    budgetAvailable: enBudgetAvailable,
    financialDetailSidePanel: enFinancialDetailSidePanel,
    projectDetail: enProjectDetail,
    grantList: enGrantList,
  },
};
