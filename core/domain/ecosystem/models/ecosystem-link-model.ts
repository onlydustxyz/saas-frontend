import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type EcosystemLinkResponse = components["schemas"]["EcosystemLinkResponse"];

interface EcosystemLinkInterface extends EcosystemLinkResponse {}

export class EcosystemLink implements EcosystemLinkInterface {
  id!: EcosystemLinkInterface["id"];
  name!: EcosystemLinkInterface["name"];
  url!: EcosystemLinkInterface["url"];
  logoUrl!: EcosystemLinkInterface["logoUrl"];
  bannerUrl!: EcosystemLinkInterface["bannerUrl"];
  slug!: EcosystemLinkInterface["slug"];
  hidden!: EcosystemLinkInterface["hidden"];

  constructor(props: EcosystemLinkResponse) {
    Object.assign(this, props);
  }
}
