import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type SuggestResponse = components["schemas"]["SuggestResponse"];

export interface SuggestInterface extends SuggestResponse {}

export class Suggest implements SuggestInterface {
  value!: SuggestResponse["value"];

  constructor(props: SuggestResponse) {
    Object.assign(this, props);
  }
}
