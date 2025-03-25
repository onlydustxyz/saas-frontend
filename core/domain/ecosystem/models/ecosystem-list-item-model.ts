import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type EcosystemsListItemResponse = components["schemas"]["EcosystemShortResponseV2"];

interface EcosystemsListItemInterface extends EcosystemsListItemResponse {}

export class EcosystemsListItem implements EcosystemsListItemInterface {
  id!: EcosystemsListItemResponse["id"];
  slug!: EcosystemsListItemResponse["slug"];
  name!: EcosystemsListItemResponse["name"];
  description!: EcosystemsListItemResponse["description"];
  projectCount!: EcosystemsListItemResponse["projectCount"];
  logoUrl!: EcosystemsListItemResponse["logoUrl"];
  contributorCount!: EcosystemsListItemResponse["contributorCount"];
  languages!: EcosystemsListItemResponse["languages"];

  constructor(props: EcosystemsListItemResponse) {
    Object.assign(this, props);
  }
}
