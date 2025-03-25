import { CountryInterface } from "@/core/domain/country/models/country-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";
import {
  HttpClientParameters,
  HttpStorageResponse,
} from "@/core/infrastructure/marketplace-api-client-adapter/http/http-client/http-client.types";

/* --------------------------------- Get Countries -------------------------------- */

export type GetCountriesResponse = components["schemas"]["CountriesResponse"];

type GetCountriesModel = Omit<GetCountriesResponse, "countries"> & {
  countries: CountryInterface[];
};

export type GetCountriesPortResponse = HttpStorageResponse<GetCountriesModel>;

export type GetCountriesPortParams = HttpClientParameters<object>;
