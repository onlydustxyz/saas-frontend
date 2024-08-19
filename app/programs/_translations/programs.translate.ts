import enTransactionPanel from "@/app/programs/[programId]/_features/transactions-sidepanel/transaction-sidepanel.en.json";
import enProgramsDetails from "@/app/programs/[programId]/_translations/programs-detail.en.json";

import enFinancialColumnChart from "../[programId]/_features/financial-column-chart/financial-column-chart.en.json";
import enPrograms from "./programs.en.json";

export const enProgramsTranslation = {
  programs: {
    list: enPrograms,
    details: enProgramsDetails,
    transactionPanel: enTransactionPanel,
    financialColumnChart: enFinancialColumnChart,
  },
};
