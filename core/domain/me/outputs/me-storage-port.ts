import {
  ContinueChatPortParams,
  ContinueChatPortResponse,
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyApplicationsPortParams,
  GetMyApplicationsPortResponse,
  GetMyGetStartedPortParams,
  GetMyGetStartedPortResponse,
  GetMyHackathonRegistrationPortParams,
  GetMyHackathonRegistrationPortResponse,
  GetMyNotificationSettingsForProjectPortParams,
  GetMyNotificationSettingsForProjectPortResponse,
  GetMyNotificationSettingsPortParams,
  GetMyNotificationSettingsPortResponse,
  GetMyPayoutPreferencesPortParams,
  GetMyPayoutPreferencesPortResponse,
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  GetMyProjectsAsContributorPortParams,
  GetMyProjectsAsContributorPortResponse,
  GetMyProjectsAsMaintainerPortParams,
  GetMyProjectsAsMaintainerPortResponse,
  GetUpdateGithubProfilePortParams,
  GetUpdateGithubProfilePortResponse,
  LogoutMeResponsePortParams,
  LogoutMeResponsePortResponse,
  PostMyApplicationPortParams,
  PostMyApplicationPortResponse,
  PostMyOnboardingAnswersPortParams,
  PostMyOnboardingAnswersPortResponse,
  RegisterToHackathonPortParams,
  RegisterToHackathonPortResponse,
  ReplaceMyProfilePortParams,
  ReplaceMyProfilePortResponse,
  SetMePortParams,
  SetMePortResponse,
  SetMyNotificationSettingsForProjectPortParams,
  SetMyNotificationSettingsForProjectPortResponse,
  SetMyNotificationSettingsPortParams,
  SetMyNotificationSettingsPortResponse,
  SetMyPayoutPreferenceForProjectPortParams,
  SetMyPayoutPreferenceForProjectPortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
  StartChatPortParams,
  StartChatPortResponse,
  UploadProfilePicturePortParams,
  UploadProfilePicturePortResponse,
} from "@/core/domain/me/me-contract.types";

export interface MeStoragePort {
  routes: Record<string, string>;
  logoutMe(params: LogoutMeResponsePortParams): LogoutMeResponsePortResponse;
  getMe(params: GetMeResponsePortParams): GetMeResponsePortResponse;
  setMe(params: SetMePortParams): SetMePortResponse;
  getMyProfile(params: GetMyProfilePortParams): GetMyProfilePortResponse;
  setMyProfile(params: SetMyProfilePortParams): SetMyProfilePortResponse;
  replaceMyProfile(params: ReplaceMyProfilePortParams): ReplaceMyProfilePortResponse;
  getMyProjectsAsMaintainer(p: GetMyProjectsAsMaintainerPortParams): GetMyProjectsAsMaintainerPortResponse;
  getMyProjectsAsContributor(p: GetMyProjectsAsContributorPortParams): GetMyProjectsAsContributorPortResponse;
  getMyPayoutPreferences(p: GetMyPayoutPreferencesPortParams): GetMyPayoutPreferencesPortResponse;
  setMyPayoutPreferenceForProject(
    p: SetMyPayoutPreferenceForProjectPortParams
  ): SetMyPayoutPreferenceForProjectPortResponse;
  postMyApplication(p: PostMyApplicationPortParams): PostMyApplicationPortResponse;
  getMyHackathonRegistration(params: GetMyHackathonRegistrationPortParams): GetMyHackathonRegistrationPortResponse;
  registerToHackathon(params: RegisterToHackathonPortParams): RegisterToHackathonPortResponse;
  getUpdateGithubProfile(params: GetUpdateGithubProfilePortParams): GetUpdateGithubProfilePortResponse;
  uploadProfilePicture(params: UploadProfilePicturePortParams): UploadProfilePicturePortResponse;
  getMyNotificationSettings(params: GetMyNotificationSettingsPortParams): GetMyNotificationSettingsPortResponse;
  setMyNotificationSettings(params: SetMyNotificationSettingsPortParams): SetMyNotificationSettingsPortResponse;
  getMyNotificationSettingsForProject(
    params: GetMyNotificationSettingsForProjectPortParams
  ): GetMyNotificationSettingsForProjectPortResponse;
  setMyNotificationSettingsForProject(
    params: SetMyNotificationSettingsForProjectPortParams
  ): SetMyNotificationSettingsForProjectPortResponse;
  startChat(params: StartChatPortParams): StartChatPortResponse;
  continueChat(params: ContinueChatPortParams): ContinueChatPortResponse;
  getMyApplications(params: GetMyApplicationsPortParams): GetMyApplicationsPortResponse;
  postMyOnboardingAnswers(params: PostMyOnboardingAnswersPortParams): PostMyOnboardingAnswersPortResponse;
  getMyGetStarted(params: GetMyGetStartedPortParams): GetMyGetStartedPortResponse;
}
