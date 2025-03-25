import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { ProjectCategoryInterface } from "../../project-category/models/project-category-model";
import { ProjectListItemV2 } from "../../project/models/project-list-item-model-v2";

type HackathonProjectListItemResponseV2 = components["schemas"]["ProjectShortResponseV2"];

export interface HackathonProjectListItemInterfaceV2 extends HackathonProjectListItemResponseV2 {
  categories: ProjectCategoryInterface[];
}

export class HackathonProjectListItemV2 extends ProjectListItemV2 implements HackathonProjectListItemInterfaceV2 {
  constructor(props: HackathonProjectListItemResponseV2) {
    super(props);
  }
}
