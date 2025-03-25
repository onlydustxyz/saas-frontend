import { components, operations } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

import { BookmarkProject } from "./models/bookmark-project-model";

/* ------------------------------ GET BOOKMARK ------------------------------ */
export type GetBookmarkResponse = components["schemas"]["BookmarksResponse"];

type GetBookmarkModel = Omit<GetBookmarkResponse, "projects"> & {
  projects: BookmarkProject[];
};

export type GetBookmarkPortResponse = HttpStorageResponse<GetBookmarkModel>;

export type GetBookmarkPortParams = HttpClientParameters<object>;

/* ------------------------------ ADD BOOKMARK ------------------------------ */

type AddBookmarkPathParams = operations["bookmarkProject"]["parameters"]["path"];
export type AddBookmarkPortParams = HttpClientParameters<{ PathParams: AddBookmarkPathParams }>;

export type AddBookmarkPortResponse = HttpStorageResponse;

/* ---------------------------- REMOVE BOOKMARKS ---------------------------- */

type RemoveBookmarkPathParams = operations["unbookmarkProject"]["parameters"]["path"];
export type RemoveBookmarkPortParams = HttpClientParameters<{ PathParams: RemoveBookmarkPathParams }>;

export type RemoveBookmarkPortResponse = HttpStorageResponse;
