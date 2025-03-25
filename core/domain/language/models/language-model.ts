import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type LanguageResponse = components["schemas"]["LanguageResponse"];

export interface LanguageInterface extends LanguageResponse {}

export class Language implements LanguageInterface {
  id!: LanguageResponse["id"];
  slug!: LanguageResponse["slug"];
  name!: LanguageResponse["name"];
  logoUrl!: LanguageResponse["logoUrl"];
  bannerUrl!: LanguageResponse["bannerUrl"];
  constructor(props: LanguageResponse) {
    Object.assign(this, props);
  }
}
