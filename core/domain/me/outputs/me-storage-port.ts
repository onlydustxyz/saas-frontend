import {
  GetMeProjectsPortParams,
  GetMeProjectsPortResponse,
  GetMeResponsePortParams,
  GetMeResponsePortResponse,
  GetMyProfilePortParams,
  GetMyProfilePortResponse,
  LogoutMeResponsePortParams,
  LogoutMeResponsePortResponse,
  ReplaceMyProfilePortParams,
  ReplaceMyProfilePortResponse,
  SetMePortParams,
  SetMePortResponse,
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
  getMeProjects(params: GetMeProjectsPortParams): GetMeProjectsPortResponse;
}
