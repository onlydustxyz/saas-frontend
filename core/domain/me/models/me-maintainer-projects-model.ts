import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MyProjectsAsMaintainerPageItemResponse = components["schemas"]["MyProjectsAsMaintainerPageItemResponse"];

export interface MeMaintainerProjectsInterface extends MyProjectsAsMaintainerPageItemResponse {}

export class MeMaintainerProjects implements MeMaintainerProjectsInterface {
  contributorCount!: MyProjectsAsMaintainerPageItemResponse["contributorCount"];
  id!: MyProjectsAsMaintainerPageItemResponse["id"];
  languages!: MyProjectsAsMaintainerPageItemResponse["languages"];
  leads!: MyProjectsAsMaintainerPageItemResponse["leads"];
  logoUrl!: MyProjectsAsMaintainerPageItemResponse["logoUrl"];
  name!: MyProjectsAsMaintainerPageItemResponse["name"];
  shortDescription!: MyProjectsAsMaintainerPageItemResponse["shortDescription"];
  slug!: MyProjectsAsMaintainerPageItemResponse["slug"];
  totalAvailable!: MyProjectsAsMaintainerPageItemResponse["totalAvailable"];
  totalGranted!: MyProjectsAsMaintainerPageItemResponse["totalGranted"];
  totalRewarded!: MyProjectsAsMaintainerPageItemResponse["totalRewarded"];
  visibility!: MyProjectsAsMaintainerPageItemResponse["visibility"];

  constructor(props: MyProjectsAsMaintainerPageItemResponse) {
    Object.assign(this, props);
  }
}
