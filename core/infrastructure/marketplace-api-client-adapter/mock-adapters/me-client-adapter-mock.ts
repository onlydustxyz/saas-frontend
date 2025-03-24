import { MeStoragePort } from "@/core/domain/me/outputs/me-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class MeClientAdapterMock implements MeStoragePort {
  constructor() {}

  routes = {};

  logoutMe = mockHttpStorageResponse<MeStoragePort["logoutMe"]>;

  getMe = mockHttpStorageResponse<MeStoragePort["getMe"]>;

  setMe = mockHttpStorageResponse<MeStoragePort["setMe"]>;

  getMyProfile = mockHttpStorageResponse<MeStoragePort["getMyProfile"]>;

  setMyProfile = mockHttpStorageResponse<MeStoragePort["setMyProfile"]>;

  replaceMyProfile = mockHttpStorageResponse<MeStoragePort["replaceMyProfile"]>;

  getMyProjectsAsMaintainer = mockHttpStorageResponse<MeStoragePort["getMyProjectsAsMaintainer"]>;

  getMyProjectsAsContributor = mockHttpStorageResponse<MeStoragePort["getMyProjectsAsContributor"]>;

  getMyPayoutPreferences = mockHttpStorageResponse<MeStoragePort["getMyPayoutPreferences"]>;

  setMyPayoutPreferenceForProject = mockHttpStorageResponse<MeStoragePort["setMyPayoutPreferenceForProject"]>;

  postMyApplication = mockHttpStorageResponse<MeStoragePort["postMyApplication"]>;

  getMyHackathonRegistration = mockHttpStorageResponse<MeStoragePort["getMyHackathonRegistration"]>;

  registerToHackathon = mockHttpStorageResponse<MeStoragePort["registerToHackathon"]>;

  getUpdateGithubProfile = mockHttpStorageResponse<MeStoragePort["getUpdateGithubProfile"]>;

  uploadProfilePicture = mockHttpStorageResponse<MeStoragePort["uploadProfilePicture"]>;

  getMyNotificationSettings = mockHttpStorageResponse<MeStoragePort["getMyNotificationSettings"]>;

  setMyNotificationSettings = mockHttpStorageResponse<MeStoragePort["setMyNotificationSettings"]>;

  getMyNotificationSettingsForProject = mockHttpStorageResponse<MeStoragePort["getMyNotificationSettingsForProject"]>;

  setMyNotificationSettingsForProject = mockHttpStorageResponse<MeStoragePort["setMyNotificationSettingsForProject"]>;

  startChat = mockHttpStorageResponse<MeStoragePort["startChat"]>;

  continueChat = mockHttpStorageResponse<MeStoragePort["continueChat"]>;

  getMyApplications = mockHttpStorageResponse<MeStoragePort["getMyApplications"]>;

  postMyOnboardingAnswers = mockHttpStorageResponse<MeStoragePort["postMyOnboardingAnswers"]>;

  getMyGetStarted = mockHttpStorageResponse<MeStoragePort["getMyGetStarted"]>;
}
