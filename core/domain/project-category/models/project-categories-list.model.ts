import { ProjectCategory } from "@/core/domain/project-category/models/project-category-model";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectCategoriesListResponse = components["schemas"]["ProjectCategoriesResponse"];

interface ProjectCategoriesListInterface extends ProjectCategoriesListResponse {}

export class ProjectCategoriesList implements ProjectCategoriesListInterface {
  categories!: ProjectCategoriesListResponse["categories"];

  constructor(props: ProjectCategoriesListResponse) {
    Object.assign(this, props);

    this.categories = props.categories.map(category => new ProjectCategory(category));
  }
}
