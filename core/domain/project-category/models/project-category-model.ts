import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export type ProjectCategoriesResponse = components["schemas"]["ProjectCategoryResponse"];

export interface ProjectCategoryInterface extends ProjectCategoriesResponse {}

export class ProjectCategory implements ProjectCategoryInterface {
  id!: ProjectCategoriesResponse["id"];
  slug!: ProjectCategoriesResponse["slug"];
  name!: ProjectCategoriesResponse["name"];
  description!: ProjectCategoriesResponse["description"];
  iconSlug!: ProjectCategoriesResponse["iconSlug"];
  constructor(props: ProjectCategoriesResponse) {
    Object.assign(this, props);
  }
}
