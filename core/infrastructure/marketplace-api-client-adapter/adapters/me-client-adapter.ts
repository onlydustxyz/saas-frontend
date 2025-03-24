import { bootstrap } from "@/core/bootstrap";
import { BillingProfileShort } from "@/core/domain/billing-profile/models/billing-profile-short-model";
import {
  ContinueChatPortParams,
  ContinueChatResponse,
  GetMeResponse,
  GetMyApplicationsResponse,
  GetMyGetStartedResponse,
  GetMyHackathonRegistrationResponse,
  GetMyNotificationSettingsForProjectResponse,
  GetMyNotificationSettingsResponse,
  GetMyPayoutPreferencesResponse,
  GetMyProfileResponse,
  GetMyProjectsAsContributorResponse,
  GetMyProjectsAsMaintainerResponse,
  GetUpdateGithubProfileResponse,
  LogoutMeResponse,
  PostMyApplicationBody,
  PostMyOnboardingAnswersBody,
  ReplaceMyProfileBody,
  SetMeBody,
  SetMyNotificationSettingsBody,
  SetMyNotificationSettingsForProjectBody,
  SetMyPayoutPreferenceForProjectBody,
  SetMyProfileBody,
  StartChatPortResponse,
  StartChatResponse,
  UploadProfilePictureResponse,
} from "@/core/domain/me/me-contract.types";
import { MeApplications } from "@/core/domain/me/models/me-application";
import { MeContributorProjects } from "@/core/domain/me/models/me-contributor-projects-model";
import { MeGetStarted } from "@/core/domain/me/models/me-get-started-model";
import { MeHackathonRegistration } from "@/core/domain/me/models/me-hackathon-registration-model";
import { MeMaintainerProjects } from "@/core/domain/me/models/me-maintainer-projects-model";
import { Me } from "@/core/domain/me/models/me-model";
import { MeNotificationForProject } from "@/core/domain/me/models/me-notification-for-project";
import { MeNotificationSettings } from "@/core/domain/me/models/me-notification-settings-model";
import { MeProfile } from "@/core/domain/me/models/me-profile-model";
import { MeStoragePort } from "@/core/domain/me/outputs/me-storage-port";
import { ProjectShort } from "@/core/domain/project/models/project-short-model";
import { HttpClient } from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client";
import { AnyType, FirstParameter } from "@/core/kernel/types";

export class MeClientAdapter implements MeStoragePort {
  constructor(private readonly client: HttpClient) {}

  routes = {
    logoutMe: "me/logout",
    getMe: "me",
    setMe: "me",
    getMyProfile: "me/profile",
    setMyProfile: "me/profile",
    replaceMyProfile: "me/profile",
    getMeProjects: "me/projects",
    getMyProjectsAsMaintainer: "me/as-maintainer/projects",
    getMyProjectsAsContributor: "me/as-contributor/projects",
    getMyPayoutPreferences: "me/payout-preferences",
    setMyPayoutPreferenceForProject: "me/payout-preferences",
    postMyApplication: "me/applications",
    getMyHackathonRegistration: "me/hackathons/:hackathonId/registrations",
    registerToHackathon: "me/hackathons/:hackathonId/registrations",
    getUpdateGithubProfile: "me/profile/github",
    uploadProfilePicture: "me/profile/avatar",
    getMyNotificationSettings: "me/notification-settings",
    setMyNotificationSettings: "me/notification-settings",
    setMyNotificationSettingsForProject: "me/notification-settings/projects/:projectId",
    getMyNotificationSettingsForProject: "me/notification-settings/projects/:projectId",
    startChat: "me/reco/chats",
    continueChat: "me/reco/chats/:chatId",
    getMyApplications: "me/applications",
    postMyOnboardingAnswers: "me/onboarding/answers",
    getMyGetStarted: "me/get-started",
  } as const;

  logoutMe = () => {
    const path = this.routes["logoutMe"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });

    const request = () =>
      this.client.request<LogoutMeResponse>({
        path,
        method,
        tag,
      });

    return {
      request,
      tag,
    };
  };

  getMe = () => {
    const path = this.routes["getMe"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const authProvider = bootstrap.getAuthProvider();
    const request = async () => {
      try {
        const data = await this.client.request<GetMeResponse>({
          path,
          method,
          tag,
        });
        return new Me(data);
      } catch (err) {
        if ((err as AnyType).status === 401 && authProvider?.logout) {
          authProvider?.logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
          });
        }
        throw err;
      }
    };

    return {
      request,
      tag,
    };
  };

  setMe = () => {
    const path = this.routes["setMe"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: SetMeBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  getMyProfile = () => {
    const path = this.routes["getMyProfile"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMyProfileResponse>({
        path,
        method,
        tag,
      });

      return new MeProfile(data);
    };

    return {
      request,
      tag,
    };
  };

  setMyProfile = () => {
    const path = this.routes["setMyProfile"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: SetMyProfileBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  replaceMyProfile = () => {
    const path = this.routes["replaceMyProfile"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: ReplaceMyProfileBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  getMyProjectsAsMaintainer = ({ queryParams }: FirstParameter<MeStoragePort["getMyProjectsAsMaintainer"]>) => {
    const path = this.routes["getMyProjectsAsMaintainer"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetMyProjectsAsMaintainerResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new MeMaintainerProjects(project)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getMyProjectsAsContributor = ({ queryParams }: FirstParameter<MeStoragePort["getMyProjectsAsContributor"]>) => {
    const path = this.routes["getMyProjectsAsContributor"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, queryParams });
    const request = async () => {
      const data = await this.client.request<GetMyProjectsAsContributorResponse>({
        path,
        method,
        tag,
        queryParams,
      });

      return {
        ...data,
        projects: data.projects.map(project => new MeContributorProjects(project)),
      };
    };

    return {
      request,
      tag,
    };
  };

  getMyPayoutPreferences = () => {
    const path = this.routes["getMyPayoutPreferences"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });
    const request = async () => {
      const data = await this.client.request<GetMyPayoutPreferencesResponse>({
        path,
        method,
        tag,
      });

      return data.map(item => ({
        project: new ProjectShort(item.project),
        billingProfile: item.billingProfile ? new BillingProfileShort(item.billingProfile) : undefined,
      }));
    };

    return {
      request,
      tag,
    };
  };

  setMyPayoutPreferenceForProject = () => {
    const path = this.routes["setMyPayoutPreferenceForProject"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: SetMyPayoutPreferenceForProjectBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  postMyApplication = () => {
    const path = this.routes["postMyApplication"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: PostMyApplicationBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  getMyHackathonRegistration = ({ pathParams }: FirstParameter<MeStoragePort["getMyHackathonRegistration"]>) => {
    const path = this.routes["getMyHackathonRegistration"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetMyHackathonRegistrationResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new MeHackathonRegistration(data);
    };

    return {
      request,
      tag,
    };
  };

  registerToHackathon = ({ pathParams }: FirstParameter<MeStoragePort["registerToHackathon"]>) => {
    const path = this.routes["registerToHackathon"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = () =>
      this.client.request<never>({
        path,
        method,
        tag,
        pathParams,
      });

    return {
      request,
      tag,
    };
  };

  getUpdateGithubProfile = () => {
    const path = this.routes["getUpdateGithubProfile"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = () =>
      this.client.request<GetUpdateGithubProfileResponse>({
        path,
        method,
        tag,
      });

    return {
      request,
      tag,
    };
  };

  uploadProfilePicture = () => {
    const path = this.routes["uploadProfilePicture"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: File) =>
      this.client.request<UploadProfilePictureResponse>({
        path,
        method,
        tag,
        body,
        headers: {
          "Content-Type": body.type,
        },
      });

    return {
      request,
      tag,
    };
  };

  getMyNotificationSettings = () => {
    const path = this.routes["getMyNotificationSettings"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMyNotificationSettingsResponse>({
        path,
        method,
        tag,
      });

      return new MeNotificationSettings(data);
    };

    return {
      request,
      tag,
    };
  };

  setMyNotificationSettings = () => {
    const path = this.routes["setMyNotificationSettings"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: SetMyNotificationSettingsBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  setMyNotificationSettingsForProject = ({
    pathParams,
  }: FirstParameter<MeStoragePort["setMyNotificationSettingsForProject"]>) => {
    const path = this.routes["setMyNotificationSettingsForProject"];
    const method = "PATCH";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: SetMyNotificationSettingsForProjectBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
        pathParams,
      });

    return {
      request,
      tag,
    };
  };

  getMyNotificationSettingsForProject = ({
    pathParams,
  }: FirstParameter<MeStoragePort["getMyNotificationSettingsForProject"]>) => {
    const path = this.routes["getMyNotificationSettingsForProject"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async () => {
      const data = await this.client.request<GetMyNotificationSettingsForProjectResponse>({
        path,
        method,
        tag,
        pathParams,
      });

      return new MeNotificationForProject(data);
    };

    return {
      request,
      tag,
    };
  };

  startChat(): StartChatPortResponse {
    const path = this.routes["startChat"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path });

    const request = async () =>
      this.client.request<StartChatResponse>({
        path,
        method,
        tag,
      });

    return {
      request,
      tag,
    };
  }

  continueChat({ pathParams }: FirstParameter<MeStoragePort["continueChat"]>) {
    const path = this.routes["continueChat"];
    const method = "POST";
    const tag = HttpClient.buildTag({ path, pathParams });

    const request = async (body: ContinueChatPortParams) =>
      this.client.request<ContinueChatResponse>({
        path,
        method,
        tag,
        pathParams,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  }

  getMyApplications = () => {
    const path = this.routes["getMyApplications"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMyApplicationsResponse>({
        path,
        method,
        tag,
      });

      return new MeApplications(data);
    };

    return {
      request,
      tag,
    };
  };

  postMyOnboardingAnswers = () => {
    const path = this.routes["postMyOnboardingAnswers"];
    const method = "PUT";
    const tag = HttpClient.buildTag({ path });

    const request = async (body: PostMyOnboardingAnswersBody) =>
      this.client.request<never>({
        path,
        method,
        tag,
        body: JSON.stringify(body),
      });

    return {
      request,
      tag,
    };
  };

  getMyGetStarted = () => {
    const path = this.routes["getMyGetStarted"];
    const method = "GET";
    const tag = HttpClient.buildTag({ path });

    const request = async () => {
      const data = await this.client.request<GetMyGetStartedResponse>({
        path,
        method,
        tag,
      });

      return new MeGetStarted(data);
    };

    return {
      request,
      tag,
    };
  };
}
