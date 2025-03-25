import { BootstrapConstructor } from "@/core/bootstrap/index";
import { ApplicationClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/application-client-adapter-mock";
import { BiClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/bi-client-adapter-mock";
import { BillingProfileClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/billing-profile-client-adapter-mock";
import { ContributionClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/contribution-client-adapter-mock";
import { CountryClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/country-client-adapter-mock";
import { CurrencyClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/currency-client-adapter-mock";
import { DepositClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/deposit-client-adapter-mock";
import { EcosystemClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/ecosystem-client-adapter-mock";
import { GithubClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/github-client-adapter-mock";
import { IssueClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/issue-client-adapter-mock";
import { LanguagesClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/languages-client-adapter-mock";
import { MeClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/me-client-adapter-mock";
import { NotificationClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/notification-client-adapter-mock";
import { ProgramClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/program-client-adapter-mock";
import { ProjectCategoryClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/project-category-client-adapter-mock";
import { ProjectClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/project-client-adapter-mock";
import { RecoClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/reco-client-adapter-mock";
import { RewardClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/reward-client-adapter-mock";
import { SearchClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/search-client-adapter-mock";
import { SponsorClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/sponsor-client-adapter-mock";
import { UserClientAdapterMock } from "@/core/infrastructure/marketplace-api-client-adapter/mock-adapters/user-client-adapter-mock";
import { DateAdapterMock } from "@/core/kernel/date/date-adapter-mock";
import { FileAdapterMock } from "@/core/kernel/file/file-adapter-mock";
import { IdAdapterMock } from "@/core/kernel/id/id-adapter-mock";
import { LegalAdapterMock } from "@/core/kernel/legal/legal-adapter-mock";
import { MoneyAdapterMock } from "@/core/kernel/money/money-adapter-mock";
import { SocialAdapterMock } from "@/core/kernel/social/social-adapter-mock";
import { StyleAdapterMock } from "@/core/kernel/style/style-adapter-mock";
import { UrlAdapterMock } from "@/core/kernel/url/url-adapter-mock";
import { ValidationAdapterMock } from "@/core/kernel/validation/validation-adapter-mock";

import { BookmarkClientAdapterMock } from "../infrastructure/marketplace-api-client-adapter/mock-adapters/bookmark-client-adapter-mock";
import { ContributorClientAdapterMock } from "../infrastructure/marketplace-api-client-adapter/mock-adapters/contributor-client-adapter-mock";
import { HackathonClientAdapterMock } from "../infrastructure/marketplace-api-client-adapter/mock-adapters/hackathon-client-adapter-mock";
import { LeaderboardClientAdapterMock } from "../infrastructure/marketplace-api-client-adapter/mock-adapters/leaderboard-client-adapter-mock";
import { QuestClientAdapterMock } from "../infrastructure/marketplace-api-client-adapter/mock-adapters/quest-client-adapter-mock";
import { MarkdownAdapterMock } from "../kernel/markdown/markdown-adapter-mock";

export const bootstrapConstructorMock: BootstrapConstructor = {
  meStoragePortForClient: new MeClientAdapterMock(),
  meStoragePortForServer: new MeClientAdapterMock(),
  userStoragePortForClient: new UserClientAdapterMock(),
  userStoragePortForServer: new UserClientAdapterMock(),
  programStoragePortForClient: new ProgramClientAdapterMock(),
  programStoragePortForServer: new ProgramClientAdapterMock(),
  projectStoragePortForClient: new ProjectClientAdapterMock(),
  projectStoragePortForServer: new ProjectClientAdapterMock(),
  sponsorStoragePortForClient: new SponsorClientAdapterMock(),
  sponsorStoragePortForServer: new SponsorClientAdapterMock(),
  biStoragePortForClient: new BiClientAdapterMock(),
  biStoragePortForServer: new BiClientAdapterMock(),
  currencyStoragePortForClient: new CurrencyClientAdapterMock(),
  currencyStoragePortForServer: new CurrencyClientAdapterMock(),
  depositStoragePortForClient: new DepositClientAdapterMock(),
  depositStoragePortForServer: new DepositClientAdapterMock(),
  notificationStoragePortForClient: new NotificationClientAdapterMock(),
  notificationStoragePortForServer: new NotificationClientAdapterMock(),
  projectCategoryStoragePortForClient: new ProjectCategoryClientAdapterMock(),
  projectCategoryStoragePortForServer: new ProjectCategoryClientAdapterMock(),
  languageStoragePortForClient: new LanguagesClientAdapterMock(),
  languageStoragePortForServer: new LanguagesClientAdapterMock(),
  countryStoragePortForClient: new CountryClientAdapterMock(),
  countryStoragePortForServer: new CountryClientAdapterMock(),
  ecosystemStoragePortForServer: new EcosystemClientAdapterMock(),
  ecosystemStoragePortForClient: new EcosystemClientAdapterMock(),
  githubStoragePortForServer: new GithubClientAdapterMock(),
  githubStoragePortForClient: new GithubClientAdapterMock(),
  contributionStoragePortForServer: new ContributionClientAdapterMock(),
  contributionStoragePortForClient: new ContributionClientAdapterMock(),
  applicationStoragePortForClient: new ApplicationClientAdapterMock(),
  applicationStoragePortForServer: new ApplicationClientAdapterMock(),
  rewardStoragePortForClient: new RewardClientAdapterMock(),
  rewardStoragePortForServer: new RewardClientAdapterMock(),
  issueStoragePortForClient: new IssueClientAdapterMock(),
  issueStoragePortForServer: new IssueClientAdapterMock(),
  billingProfileStoragePortForClient: new BillingProfileClientAdapterMock(),
  billingProfileStoragePortForServer: new BillingProfileClientAdapterMock(),
  recoStoragePortForClient: new RecoClientAdapterMock(),
  recoStoragePortForServer: new RecoClientAdapterMock(),
  hackathonStoragePortForClient: new HackathonClientAdapterMock(),
  hackathonStoragePortForServer: new HackathonClientAdapterMock(),
  contributorStoragePortForClient: new ContributorClientAdapterMock(),
  contributorStoragePortForServer: new ContributorClientAdapterMock(),
  bookmarkStoragePortForClient: new BookmarkClientAdapterMock(),
  bookmarkStoragePortForServer: new BookmarkClientAdapterMock(),
  dateKernelPort: DateAdapterMock,
  moneyKernelPort: new MoneyAdapterMock(),
  socialKernelPort: new SocialAdapterMock(),
  fileKernelPort: new FileAdapterMock(),
  urlKernelPort: UrlAdapterMock,
  idKernelPort: IdAdapterMock,
  legalKernelPort: new LegalAdapterMock(),
  markdownKernelPort: new MarkdownAdapterMock(),
  validationKernelPort: new ValidationAdapterMock(),
  styleKernelPort: StyleAdapterMock,
  searchStoragePortForClient: new SearchClientAdapterMock(),
  searchStoragePortForServer: new SearchClientAdapterMock(),
  questStoragePortForClient: new QuestClientAdapterMock(),
  questStoragePortForServer: new QuestClientAdapterMock(),
  leaderboardStoragePortForClient: new LeaderboardClientAdapterMock(),
  leaderboardStoragePortForServer: new LeaderboardClientAdapterMock(),
};
