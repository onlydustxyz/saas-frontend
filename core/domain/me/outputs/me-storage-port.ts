import {
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyPayoutPreferencesPortParams,
  GetMyPayoutPreferencesPortResponse,
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  GetMyProjectsAsContributorPortParams,
  GetMyProjectsAsContributorPortResponse,
  GetMyProjectsAsMaintainerPortParams,
  GetMyProjectsAsMaintainerPortResponse,
  LogoutMeResponsePortParams,
  LogoutMeResponsePortResponse,
  ReplaceMyProfilePortParams,
  ReplaceMyProfilePortResponse,
  SetMePortParams,
  SetMePortResponse,
  SetMyPayoutPreferenceForProjectPortParams,
  SetMyPayoutPreferenceForProjectPortResponse,
  SetMyProfilePortParams,
  SetMyProfilePortResponse,
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
}
