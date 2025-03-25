import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProgramResponse = components["schemas"]["ProgramResponse"];

export interface ProgramInterface extends ProgramResponse {}

export class Program implements ProgramInterface {
  id!: ProgramResponse["id"];
  leads!: ProgramResponse["leads"];
  logoUrl!: ProgramResponse["logoUrl"];
  name!: ProgramResponse["name"];
  totalAvailable!: ProgramResponse["totalAvailable"];
  totalGranted!: ProgramResponse["totalGranted"];
  totalRewarded!: ProgramResponse["totalRewarded"];
  url!: ProgramResponse["url"];
  projectCount!: ProgramResponse["projectCount"];
  contributorCount!: ProgramResponse["contributorCount"];
  rewardCount!: ProgramResponse["rewardCount"];

  constructor(props: ProgramResponse) {
    Object.assign(this, props);
  }
}
