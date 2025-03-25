import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import {
  SearchRessourceType,
  SearchRessourceTypeMapping,
  SearchRessourceTypeMappingInverse,
} from "../models/search.types";

export type SearchBody = Omit<components["schemas"]["SearchPostRequest"], "pageSize" | "pageIndex">;

interface SearchDtoInterface extends SearchBody {
  toBody(): SearchBody;
}

export class SearchDto implements SearchDtoInterface {
  keyword!: SearchBody["keyword"];
  type!: SearchBody["type"];
  languages?: SearchBody["languages"];
  ecosystems?: SearchBody["ecosystems"];
  categories?: SearchBody["categories"];

  constructor(props: SearchBody & { uuid?: string }) {
    Object.assign(this, props);
  }

  toBody(): SearchBody {
    return {
      keyword: this.keyword ?? undefined,
      type: this.type,
      languages: this.languages,
      ecosystems: this.ecosystems,
      categories: this.categories,
    };
  }

  static typeStringToRessourceType(type: string): SearchRessourceType {
    return SearchRessourceTypeMapping[type];
  }

  static ressourceTypeToString(type: SearchRessourceType): string {
    return SearchRessourceTypeMappingInverse[type];
  }
}
