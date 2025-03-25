import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type CountryResponse = components["schemas"]["CountryResponse"];

export interface CountryInterface extends CountryResponse {}

export class Country implements CountryInterface {
  code!: CountryResponse["code"];
  name!: CountryResponse["name"];

  constructor(props: CountryResponse) {
    Object.assign(this, props);
  }
}
