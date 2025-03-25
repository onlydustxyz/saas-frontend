import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategoryInterface } from "../../project-category/models/project-category-model";
import { ProjectListItemV2 } from "../../project/models/project-list-item-model-v2";

type ContributorProjectListItemResponse = components["schemas"]["ProjectShortResponseV2"];

export interface ContributorProjectListItemInterface extends ContributorProjectListItemResponse {
  categories: ProjectCategoryInterface[];
}

export class ContributorProjectListItem extends ProjectListItemV2 implements ContributorProjectListItemInterface {
  constructor(props: ContributorProjectListItemResponse) {
    super(props);
  }
}
