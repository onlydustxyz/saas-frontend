import { ApplicationStoragePort } from "@/core/domain/application/outputs/application-storage-port";
import { BiStoragePort } from "@/core/domain/bi/outputs/bi-storage-port";
import { BillingProfileStoragePort } from "@/core/domain/billing-profile/outputs/billing-profile-storage-port";
import { ContributionStoragePort } from "@/core/domain/contribution/output/contribution-storage-port";
import { CountryStoragePort } from "@/core/domain/country/outputs/country-storage-port";
import { CurrencyStoragePort } from "@/core/domain/currency/output/currency-storage-port";
import { DepositStoragePort } from "@/core/domain/deposit/outputs/deposit-storage-port";
import { EcosystemStoragePort } from "@/core/domain/ecosystem/outputs/ecosystem-storage-port";
import { GithubStoragePort } from "@/core/domain/github/outputs/github-storage-port";
import { IssueStoragePort } from "@/core/domain/issue/outputs/issue-storage-port";
import { LanguageStoragePort } from "@/core/domain/language/outputs/language-storage-port";
import { MeStoragePort } from "@/core/domain/me/outputs/me-storage-port";
import { NotificationStoragePort } from "@/core/domain/notification/outputs/notification-storage-port";
import { ProgramStoragePort } from "@/core/domain/program/outputs/program-storage-port";
import { ProjectCategoryStoragePort } from "@/core/domain/project-category/outputs/project-category-storage-port";
import { ProjectStoragePort } from "@/core/domain/project/outputs/project-storage-port";
import { RecoStoragePort } from "@/core/domain/reco/output/reco-storage-port";
import { RewardStoragePort } from "@/core/domain/reward/outputs/reward-storage-port";
import { SearchStoragePort } from "@/core/domain/search/outputs/search-storage-port";
import { SponsorStoragePort } from "@/core/domain/sponsor/outputs/sponsor-storage-port";
import { UserStoragePort } from "@/core/domain/user/outputs/user-storage-port";
import { ApplicationClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/application-client-adapter";
import { BiClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/bi-client-adapter";
import { BillingProfileClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/billing-profile-client-adapter";
import { ContributionClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/contribution-client-adapter";
import { CountryClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/country-client-adapter";
import { CurrencyClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/currency-client-adapter";
import { DepositClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/deposit-client-adapter";
import { EcosystemClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/ecosystem-client-adapter";
import { GithubClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/github-client-adapter";
import { IssueClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/issue-client-adapter";
import { LanguageClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/language-client-adapter";
import { MeClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/me-client-adapter";
import { NotificationClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/notification-client-adapter";
import { ProgramClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/program-client-adapter";
import { ProjectCategoryClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/project-category-client-adapter";
import { ProjectClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/project-client-adapter";
import { RecoClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/reco-client-adapter";
import { RewardClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/reward-client-adapter";
import { SearchClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/search-client-adapter";
import { SponsorClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/sponsor-client-adapter";
import { UserClientAdapter } from "@/core/infrastructure/marketplace-api-client-adapter/adapters/user-client-adapter";
import { AuthProvider } from "@/core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { FetchHttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/fetch-http-client/fetch-http-client";
import { ImpersonationProvider } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";
import { DateFacadePort } from "@/core/kernel/date/date-facade-port";
import { DateFnsAdapter } from "@/core/kernel/date/date-fns-adapter";
import { FileAdapter } from "@/core/kernel/file/file-adapter";
import { FileFacadePort } from "@/core/kernel/file/file-facade-port";
import { IdAdapter } from "@/core/kernel/id/id-adapter";
import { IdFacadePort } from "@/core/kernel/id/id-facade-port";
import { LegalAdapter } from "@/core/kernel/legal/legal-adapter";
import { LegalFacadePort } from "@/core/kernel/legal/legal-facade-port";
import { MoneyAdapter } from "@/core/kernel/money/money-adapter";
import { MoneyFacadePort } from "@/core/kernel/money/money-facade-port";
import { SocialAdapter } from "@/core/kernel/social/social-adapter";
import { SocialFacadePort } from "@/core/kernel/social/social-facade-port";
import { StyleAdapter } from "@/core/kernel/style/style-adapter";
import { StyleFacadePort } from "@/core/kernel/style/style-facade-port";
import { UrlAdapter } from "@/core/kernel/url/url-adapter";
import { UrlFacadePort } from "@/core/kernel/url/url-facade-port";
import { ValidationAdapter } from "@/core/kernel/validation/validation-adapter";
import { ValidationFacadePort } from "@/core/kernel/validation/validation-facade-port";

import { BookmarkStoragePort } from "../domain/bookmark/outputs/bookmark-storage-port";
import { ContributorStoragePort } from "../domain/contributor/outputs/contributor-storage-port";
import { HackathonStoragePort } from "../domain/hackathon/outputs/hackathon-storage-port";
import { LeaderboardStoragePort } from "../domain/leaderboard/outputs/leaderboard-storage-port";
import { QuestStoragePort } from "../domain/quest/outputs/quest-storage-port";
import { BookmarkClientAdapter } from "../infrastructure/marketplace-api-client-adapter/adapters/bookmark-client-adapter";
import { ContributorClientAdapter } from "../infrastructure/marketplace-api-client-adapter/adapters/contributor-client-adapter";
import { HackathonClientAdapter } from "../infrastructure/marketplace-api-client-adapter/adapters/hackathon-client-adapter";
import { LeaderboardClientAdapter } from "../infrastructure/marketplace-api-client-adapter/adapters/leaderboard-client-adapter";
import { QuestClientAdapter } from "../infrastructure/marketplace-api-client-adapter/adapters/quest-client-adapter";
import { MarkdownAdapter } from "../kernel/markdown/markdown-adapter";
import { MarkdownFacadePort } from "../kernel/markdown/markdown-facade-port";

export interface BootstrapConstructor {
  meStoragePortForClient: MeStoragePort;
  meStoragePortForServer: MeStoragePort;
  userStoragePortForClient: UserStoragePort;
  userStoragePortForServer: UserStoragePort;
  programStoragePortForClient: ProgramStoragePort;
  programStoragePortForServer: ProgramStoragePort;
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
  sponsorStoragePortForClient: SponsorStoragePort;
  sponsorStoragePortForServer: SponsorStoragePort;
  biStoragePortForClient: BiStoragePort;
  biStoragePortForServer: BiStoragePort;
  currencyStoragePortForClient: CurrencyStoragePort;
  currencyStoragePortForServer: CurrencyStoragePort;
  depositStoragePortForClient: DepositStoragePort;
  depositStoragePortForServer: DepositStoragePort;
  notificationStoragePortForClient: NotificationStoragePort;
  notificationStoragePortForServer: NotificationStoragePort;
  languageStoragePortForClient: LanguageStoragePort;
  languageStoragePortForServer: LanguageStoragePort;
  countryStoragePortForClient: CountryStoragePort;
  countryStoragePortForServer: CountryStoragePort;
  projectCategoryStoragePortForClient: ProjectCategoryStoragePort;
  projectCategoryStoragePortForServer: ProjectCategoryStoragePort;
  ecosystemStoragePortForClient: EcosystemStoragePort;
  ecosystemStoragePortForServer: EcosystemStoragePort;
  githubStoragePortForClient: GithubStoragePort;
  githubStoragePortForServer: GithubStoragePort;
  contributionStoragePortForClient: ContributionStoragePort;
  contributionStoragePortForServer: ContributionStoragePort;
  applicationStoragePortForClient: ApplicationStoragePort;
  applicationStoragePortForServer: ApplicationStoragePort;
  rewardStoragePortForClient: RewardStoragePort;
  rewardStoragePortForServer: RewardStoragePort;
  issueStoragePortForClient: IssueStoragePort;
  issueStoragePortForServer: IssueStoragePort;
  billingProfileStoragePortForClient: BillingProfileStoragePort;
  billingProfileStoragePortForServer: BillingProfileStoragePort;
  recoStoragePortForClient: RecoStoragePort;
  recoStoragePortForServer: RecoStoragePort;
  hackathonStoragePortForClient: HackathonStoragePort;
  hackathonStoragePortForServer: HackathonStoragePort;
  contributorStoragePortForClient: ContributorStoragePort;
  contributorStoragePortForServer: ContributorStoragePort;
  bookmarkStoragePortForClient: BookmarkStoragePort;
  bookmarkStoragePortForServer: BookmarkStoragePort;
  questStoragePortForClient: QuestStoragePort;
  questStoragePortForServer: QuestStoragePort;
  dateKernelPort: DateFacadePort;
  moneyKernelPort: MoneyFacadePort;
  socialKernelPort: SocialFacadePort;
  fileKernelPort: FileFacadePort;
  urlKernelPort: UrlFacadePort;
  idKernelPort: IdFacadePort;
  legalKernelPort: LegalFacadePort;
  markdownKernelPort: MarkdownFacadePort;
  validationKernelPort: ValidationFacadePort;
  styleKernelPort: StyleFacadePort;
  searchStoragePortForClient: SearchStoragePort;
  searchStoragePortForServer: SearchStoragePort;
  leaderboardStoragePortForClient: LeaderboardStoragePort;
  leaderboardStoragePortForServer: LeaderboardStoragePort;
}

export class Bootstrap {
  static #instance: Bootstrap;
  private authProvider?: AuthProvider;
  private impersonationProvider?: ImpersonationProvider | null = null;
  meStoragePortForClient: MeStoragePort;
  meStoragePortForServer: MeStoragePort;
  userStoragePortForClient: UserStoragePort;
  userStoragePortForServer: UserStoragePort;
  programStoragePortForClient: ProgramStoragePort;
  programStoragePortForServer: ProgramStoragePort;
  projectStoragePortForClient: ProjectStoragePort;
  projectStoragePortForServer: ProjectStoragePort;
  sponsorStoragePortForClient: SponsorStoragePort;
  sponsorStoragePortForServer: SponsorStoragePort;
  biStoragePortForClient: BiStoragePort;
  biStoragePortForServer: BiStoragePort;
  currencyStoragePortForClient: CurrencyStoragePort;
  currencyStoragePortForServer: CurrencyStoragePort;
  depositStoragePortForClient: DepositStoragePort;
  depositStoragePortForServer: DepositStoragePort;
  notificationStoragePortForClient: NotificationStoragePort;
  notificationStoragePortForServer: NotificationStoragePort;
  languageStoragePortForClient: LanguageStoragePort;
  languageStoragePortForServer: LanguageStoragePort;
  countryStoragePortForClient: CountryStoragePort;
  countryStoragePortForServer: CountryStoragePort;
  projectCategoryStoragePortForClient: ProjectCategoryStoragePort;
  projectCategoryStoragePortForServer: ProjectCategoryStoragePort;
  ecosystemStoragePortForClient: EcosystemStoragePort;
  ecosystemStoragePortForServer: EcosystemStoragePort;
  githubStoragePortForClient: GithubStoragePort;
  githubStoragePortForServer: GithubStoragePort;
  contributionStoragePortForClient: ContributionStoragePort;
  contributionStoragePortForServer: ContributionStoragePort;
  applicationStoragePortForClient: ApplicationStoragePort;
  applicationStoragePortForServer: ApplicationStoragePort;
  rewardStoragePortForClient: RewardStoragePort;
  rewardStoragePortForServer: RewardStoragePort;
  issueStoragePortForClient: IssueStoragePort;
  issueStoragePortForServer: IssueStoragePort;
  billingProfileStoragePortForClient: BillingProfileStoragePort;
  billingProfileStoragePortForServer: BillingProfileStoragePort;
  recoStoragePortForClient: RecoStoragePort;
  recoStoragePortForServer: RecoStoragePort;
  hackathonStoragePortForClient: HackathonStoragePort;
  hackathonStoragePortForServer: HackathonStoragePort;
  contributorStoragePortForClient: ContributorStoragePort;
  contributorStoragePortForServer: ContributorStoragePort;
  bookmarkStoragePortForClient: BookmarkStoragePort;
  bookmarkStoragePortForServer: BookmarkStoragePort;
  questStoragePortForClient: QuestStoragePort;
  questStoragePortForServer: QuestStoragePort;
  dateKernelPort: DateFacadePort;
  moneyKernelPort: MoneyFacadePort;
  socialKernelPort: SocialFacadePort;
  fileKernelPort: FileFacadePort;
  urlKernelPort: UrlFacadePort;
  idKernelPort: IdFacadePort;
  legalKernelPort: LegalFacadePort;
  markdownKernelPort: MarkdownFacadePort;
  validationKernelPort: ValidationFacadePort;
  styleKernelPort: StyleFacadePort;
  searchStoragePortForClient: SearchStoragePort;
  searchStoragePortForServer: SearchStoragePort;
  leaderboardStoragePortForClient: LeaderboardStoragePort;
  leaderboardStoragePortForServer: LeaderboardStoragePort;

  constructor(constructor: BootstrapConstructor) {
    this.meStoragePortForClient = constructor.meStoragePortForClient;
    this.meStoragePortForServer = constructor.meStoragePortForServer;
    this.userStoragePortForClient = constructor.userStoragePortForClient;
    this.userStoragePortForServer = constructor.userStoragePortForServer;
    this.programStoragePortForClient = constructor.programStoragePortForClient;
    this.programStoragePortForServer = constructor.programStoragePortForServer;
    this.projectStoragePortForClient = constructor.projectStoragePortForClient;
    this.projectStoragePortForServer = constructor.projectStoragePortForServer;
    this.sponsorStoragePortForClient = constructor.sponsorStoragePortForClient;
    this.sponsorStoragePortForServer = constructor.sponsorStoragePortForServer;
    this.biStoragePortForClient = constructor.biStoragePortForClient;
    this.biStoragePortForServer = constructor.biStoragePortForServer;
    this.currencyStoragePortForClient = constructor.currencyStoragePortForClient;
    this.currencyStoragePortForServer = constructor.currencyStoragePortForServer;
    this.depositStoragePortForClient = constructor.depositStoragePortForClient;
    this.depositStoragePortForServer = constructor.depositStoragePortForServer;
    this.notificationStoragePortForClient = constructor.notificationStoragePortForClient;
    this.notificationStoragePortForServer = constructor.notificationStoragePortForServer;
    this.languageStoragePortForClient = constructor.languageStoragePortForClient;
    this.languageStoragePortForServer = constructor.languageStoragePortForServer;
    this.countryStoragePortForClient = constructor.countryStoragePortForClient;
    this.countryStoragePortForServer = constructor.countryStoragePortForServer;
    this.projectCategoryStoragePortForClient = constructor.projectCategoryStoragePortForClient;
    this.projectCategoryStoragePortForServer = constructor.projectCategoryStoragePortForServer;
    this.ecosystemStoragePortForClient = constructor.ecosystemStoragePortForClient;
    this.ecosystemStoragePortForServer = constructor.ecosystemStoragePortForServer;
    this.githubStoragePortForClient = constructor.githubStoragePortForClient;
    this.githubStoragePortForServer = constructor.githubStoragePortForServer;
    this.contributionStoragePortForClient = constructor.contributionStoragePortForClient;
    this.contributionStoragePortForServer = constructor.contributionStoragePortForServer;
    this.applicationStoragePortForClient = constructor.applicationStoragePortForClient;
    this.applicationStoragePortForServer = constructor.applicationStoragePortForServer;
    this.rewardStoragePortForClient = constructor.rewardStoragePortForClient;
    this.rewardStoragePortForServer = constructor.rewardStoragePortForServer;
    this.issueStoragePortForClient = constructor.issueStoragePortForClient;
    this.issueStoragePortForServer = constructor.issueStoragePortForServer;
    this.billingProfileStoragePortForClient = constructor.billingProfileStoragePortForClient;
    this.billingProfileStoragePortForServer = constructor.billingProfileStoragePortForServer;
    this.recoStoragePortForClient = constructor.recoStoragePortForClient;
    this.recoStoragePortForServer = constructor.recoStoragePortForServer;
    this.hackathonStoragePortForClient = constructor.hackathonStoragePortForClient;
    this.hackathonStoragePortForServer = constructor.hackathonStoragePortForServer;
    this.contributorStoragePortForClient = constructor.contributorStoragePortForClient;
    this.contributorStoragePortForServer = constructor.contributorStoragePortForServer;
    this.bookmarkStoragePortForClient = constructor.bookmarkStoragePortForClient;
    this.bookmarkStoragePortForServer = constructor.bookmarkStoragePortForServer;
    this.questStoragePortForClient = constructor.questStoragePortForClient;
    this.questStoragePortForServer = constructor.questStoragePortForServer;
    this.dateKernelPort = constructor.dateKernelPort;
    this.moneyKernelPort = constructor.moneyKernelPort;
    this.socialKernelPort = constructor.socialKernelPort;
    this.fileKernelPort = constructor.fileKernelPort;
    this.urlKernelPort = constructor.urlKernelPort;
    this.idKernelPort = constructor.idKernelPort;
    this.legalKernelPort = constructor.legalKernelPort;
    this.markdownKernelPort = constructor.markdownKernelPort;
    this.validationKernelPort = constructor.validationKernelPort;
    this.styleKernelPort = constructor.styleKernelPort;
    this.searchStoragePortForClient = constructor.searchStoragePortForClient;
    this.searchStoragePortForServer = constructor.searchStoragePortForServer;
    this.leaderboardStoragePortForClient = constructor.leaderboardStoragePortForClient;
    this.leaderboardStoragePortForServer = constructor.leaderboardStoragePortForServer;
  }

  getAuthProvider() {
    return this.authProvider;
  }

  setAuthProvider(authProvider: AuthProvider) {
    this.authProvider = authProvider;
  }

  getImpersonationProvider() {
    return this.impersonationProvider;
  }

  setImpersonationProvider(impersonationProvider: ImpersonationProvider) {
    this.impersonationProvider = impersonationProvider;
  }

  getMeStoragePortForClient() {
    return this.meStoragePortForClient;
  }

  getMeStoragePortForServer() {
    return this.meStoragePortForServer;
  }

  getUserStoragePortForClient() {
    return this.userStoragePortForClient;
  }

  getUserStoragePortForServer() {
    return this.userStoragePortForServer;
  }

  getProgramStoragePortForClient() {
    return this.programStoragePortForClient;
  }

  getProgramStoragePortForServer() {
    return this.programStoragePortForServer;
  }

  getProjectStoragePortForClient() {
    return this.projectStoragePortForClient;
  }

  getProjectStoragePortForServer() {
    return this.projectStoragePortForServer;
  }

  getSponsorStoragePortForClient() {
    return this.sponsorStoragePortForClient;
  }

  getSponsorStoragePortForServer() {
    return this.sponsorStoragePortForServer;
  }

  getBiStoragePortForClient() {
    return this.biStoragePortForClient;
  }

  getBiStoragePortForServer() {
    return this.biStoragePortForServer;
  }

  getCurrencyStoragePortForClient() {
    return this.currencyStoragePortForClient;
  }

  getCurrencyStoragePortForServer() {
    return this.currencyStoragePortForServer;
  }

  getDepositStoragePortForClient() {
    return this.depositStoragePortForClient;
  }

  getDepositStoragePortForServer() {
    return this.depositStoragePortForServer;
  }

  getNotificationStoragePortForClient() {
    return this.notificationStoragePortForClient;
  }

  getNotificationStoragePortForServer() {
    return this.notificationStoragePortForServer;
  }

  getLanguagesStoragePortForServer() {
    return this.languageStoragePortForServer;
  }

  getLanguagesStoragePortForClient() {
    return this.languageStoragePortForClient;
  }

  getCountriesStoragePortForServer() {
    return this.countryStoragePortForServer;
  }

  getCountriesStoragePortForClient() {
    return this.countryStoragePortForClient;
  }

  getProjectCategoryStoragePortForServer() {
    return this.projectCategoryStoragePortForServer;
  }

  getProjectCategoryStoragePortForClient() {
    return this.projectCategoryStoragePortForClient;
  }

  getEcosystemStoragePortForServer() {
    return this.ecosystemStoragePortForServer;
  }

  getEcosystemStoragePortForClient() {
    return this.ecosystemStoragePortForClient;
  }

  getGithubStoragePortForServer() {
    return this.githubStoragePortForServer;
  }

  getGithubStoragePortForClient() {
    return this.githubStoragePortForClient;
  }

  getContributionStoragePortForServer() {
    return this.contributionStoragePortForServer;
  }

  getContributionStoragePortForClient() {
    return this.contributionStoragePortForClient;
  }

  getApplicationStoragePortForServer() {
    return this.applicationStoragePortForServer;
  }

  getApplicationStoragePortForClient() {
    return this.applicationStoragePortForClient;
  }

  getRewardStoragePortForServer() {
    return this.rewardStoragePortForServer;
  }

  getRewardStoragePortForClient() {
    return this.rewardStoragePortForClient;
  }

  getIssueStoragePortForServer() {
    return this.issueStoragePortForServer;
  }

  getIssueStoragePortForClient() {
    return this.issueStoragePortForClient;
  }

  getBillingProfileStoragePortForClient() {
    return this.billingProfileStoragePortForClient;
  }

  getBillingProfileStoragePortForServer() {
    return this.billingProfileStoragePortForServer;
  }

  getRecoStoragePortForClient() {
    return this.recoStoragePortForClient;
  }

  getRecoStoragePortForServer() {
    return this.recoStoragePortForServer;
  }

  getHackathonStoragePortForClient() {
    return this.hackathonStoragePortForClient;
  }

  getHackathonStoragePortForServer() {
    return this.hackathonStoragePortForServer;
  }

  getContributorStoragePortForClient() {
    return this.contributorStoragePortForClient;
  }

  getContributorStoragePortForServer() {
    return this.contributorStoragePortForServer;
  }

  getBookmarkStoragePortForClient() {
    return this.bookmarkStoragePortForClient;
  }

  getBookmarkStoragePortForServer() {
    return this.bookmarkStoragePortForServer;
  }

  getQuestStoragePortForClient() {
    return this.questStoragePortForClient;
  }

  getQuestStoragePortForServer() {
    return this.questStoragePortForServer;
  }

  getDateKernelPort() {
    return this.dateKernelPort;
  }

  getMoneyKernelPort() {
    return this.moneyKernelPort;
  }

  getSocialKernelPort() {
    return this.socialKernelPort;
  }

  getFileKernelPort() {
    return this.fileKernelPort;
  }

  getUrlKernelPort() {
    return this.urlKernelPort;
  }

  getIdKernelPort() {
    return this.idKernelPort;
  }

  getLegalKernelPort() {
    return this.legalKernelPort;
  }

  getMarkdownKernelPort() {
    return this.markdownKernelPort;
  }

  getValidationKernelPort() {
    return this.validationKernelPort;
  }

  getStyleKernelPort() {
    return this.styleKernelPort;
  }

  getSearchStoragePortForClient() {
    return this.searchStoragePortForClient;
  }

  getSearchStoragePortForServer() {
    return this.searchStoragePortForServer;
  }

  getLeaderboardStoragePortForClient() {
    return this.leaderboardStoragePortForClient;
  }

  getLeaderboardStoragePortForServer() {
    return this.leaderboardStoragePortForServer;
  }

  public static get getBootstrap(): Bootstrap {
    if (!Bootstrap.#instance) {
      this.newBootstrap({
        meStoragePortForClient: new MeClientAdapter(new FetchHttpClient()),
        meStoragePortForServer: new MeClientAdapter(new FetchHttpClient()),
        userStoragePortForClient: new UserClientAdapter(new FetchHttpClient()),
        userStoragePortForServer: new UserClientAdapter(new FetchHttpClient()),
        programStoragePortForClient: new ProgramClientAdapter(new FetchHttpClient()),
        programStoragePortForServer: new ProgramClientAdapter(new FetchHttpClient()),
        projectStoragePortForClient: new ProjectClientAdapter(new FetchHttpClient()),
        projectStoragePortForServer: new ProjectClientAdapter(new FetchHttpClient()),
        sponsorStoragePortForClient: new SponsorClientAdapter(new FetchHttpClient()),
        sponsorStoragePortForServer: new SponsorClientAdapter(new FetchHttpClient()),
        biStoragePortForClient: new BiClientAdapter(new FetchHttpClient()),
        biStoragePortForServer: new BiClientAdapter(new FetchHttpClient()),
        currencyStoragePortForClient: new CurrencyClientAdapter(new FetchHttpClient()),
        currencyStoragePortForServer: new CurrencyClientAdapter(new FetchHttpClient()),
        depositStoragePortForClient: new DepositClientAdapter(new FetchHttpClient()),
        depositStoragePortForServer: new DepositClientAdapter(new FetchHttpClient()),
        notificationStoragePortForClient: new NotificationClientAdapter(new FetchHttpClient()),
        notificationStoragePortForServer: new NotificationClientAdapter(new FetchHttpClient()),
        languageStoragePortForClient: new LanguageClientAdapter(new FetchHttpClient()),
        languageStoragePortForServer: new LanguageClientAdapter(new FetchHttpClient()),
        countryStoragePortForClient: new CountryClientAdapter(new FetchHttpClient()),
        countryStoragePortForServer: new CountryClientAdapter(new FetchHttpClient()),
        projectCategoryStoragePortForClient: new ProjectCategoryClientAdapter(new FetchHttpClient()),
        projectCategoryStoragePortForServer: new ProjectCategoryClientAdapter(new FetchHttpClient()),
        ecosystemStoragePortForServer: new EcosystemClientAdapter(new FetchHttpClient()),
        ecosystemStoragePortForClient: new EcosystemClientAdapter(new FetchHttpClient()),
        githubStoragePortForServer: new GithubClientAdapter(new FetchHttpClient()),
        githubStoragePortForClient: new GithubClientAdapter(new FetchHttpClient()),
        contributionStoragePortForServer: new ContributionClientAdapter(new FetchHttpClient()),
        contributionStoragePortForClient: new ContributionClientAdapter(new FetchHttpClient()),
        applicationStoragePortForServer: new ApplicationClientAdapter(new FetchHttpClient()),
        applicationStoragePortForClient: new ApplicationClientAdapter(new FetchHttpClient()),
        rewardStoragePortForServer: new RewardClientAdapter(new FetchHttpClient()),
        rewardStoragePortForClient: new RewardClientAdapter(new FetchHttpClient()),
        issueStoragePortForServer: new IssueClientAdapter(new FetchHttpClient()),
        issueStoragePortForClient: new IssueClientAdapter(new FetchHttpClient()),
        billingProfileStoragePortForClient: new BillingProfileClientAdapter(new FetchHttpClient()),
        billingProfileStoragePortForServer: new BillingProfileClientAdapter(new FetchHttpClient()),
        recoStoragePortForClient: new RecoClientAdapter(new FetchHttpClient()),
        recoStoragePortForServer: new RecoClientAdapter(new FetchHttpClient()),
        hackathonStoragePortForClient: new HackathonClientAdapter(new FetchHttpClient()),
        hackathonStoragePortForServer: new HackathonClientAdapter(new FetchHttpClient()),
        contributorStoragePortForClient: new ContributorClientAdapter(new FetchHttpClient()),
        contributorStoragePortForServer: new ContributorClientAdapter(new FetchHttpClient()),
        bookmarkStoragePortForClient: new BookmarkClientAdapter(new FetchHttpClient()),
        bookmarkStoragePortForServer: new BookmarkClientAdapter(new FetchHttpClient()),
        questStoragePortForClient: new QuestClientAdapter(new FetchHttpClient()),
        questStoragePortForServer: new QuestClientAdapter(new FetchHttpClient()),
        dateKernelPort: new DateFnsAdapter(),
        moneyKernelPort: new MoneyAdapter(),
        socialKernelPort: new SocialAdapter(),
        fileKernelPort: new FileAdapter(),
        urlKernelPort: UrlAdapter,
        idKernelPort: IdAdapter,
        legalKernelPort: new LegalAdapter(),
        markdownKernelPort: new MarkdownAdapter(),
        validationKernelPort: new ValidationAdapter(),
        styleKernelPort: StyleAdapter,
        searchStoragePortForClient: new SearchClientAdapter(new FetchHttpClient()),
        searchStoragePortForServer: new SearchClientAdapter(new FetchHttpClient()),
        leaderboardStoragePortForClient: new LeaderboardClientAdapter(new FetchHttpClient()),
        leaderboardStoragePortForServer: new LeaderboardClientAdapter(new FetchHttpClient()),
      });
    }

    return Bootstrap.#instance;
  }

  public static newBootstrap(constructor: BootstrapConstructor): Bootstrap {
    Bootstrap.#instance = new Bootstrap(constructor);
    return Bootstrap.#instance;
  }
}

export const bootstrap = Bootstrap.getBootstrap;
