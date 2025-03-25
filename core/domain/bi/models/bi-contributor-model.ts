import {
  BiContributorListItem,
  BiContributorListItemInterface,
} from "@/core/domain/bi/models/bi-contributor-list-item-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BiContributorResponse = components["schemas"]["BiContributorResponse"];

export interface BiContributorInterface extends BiContributorResponse, BiContributorListItemInterface {}

export class BiContributor extends BiContributorListItem implements BiContributorInterface {
  repos!: BiContributorResponse["repos"];

  constructor(props: BiContributorResponse) {
    super(props);
    Object.assign(this, props);
  }
}
