import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ProjectLinkV2Response = components["schemas"]["ProjectShortResponseV2"];

interface ProjectLinkV2Interface extends ProjectLinkV2Response {}

export class ProjectLinkV2 implements ProjectLinkV2Interface {
  id!: ProjectLinkV2Response["id"];
  slug!: ProjectLinkV2Response["slug"];
  name!: ProjectLinkV2Response["name"];
  logoUrl!: ProjectLinkV2Response["logoUrl"];
  shortDescription!: ProjectLinkV2Response["shortDescription"];
  contributorCount!: ProjectLinkV2Response["contributorCount"];
  starCount!: ProjectLinkV2Response["starCount"];
  forkCount!: ProjectLinkV2Response["forkCount"];
  availableIssueCount!: ProjectLinkV2Response["availableIssueCount"];
  goodFirstIssueCount!: ProjectLinkV2Response["goodFirstIssueCount"];
  categories!: ProjectLinkV2Response["categories"];
  tags!: ProjectLinkV2Response["tags"];
  languages!: ProjectLinkV2Response["languages"];
  ecosystems!: ProjectLinkV2Response["ecosystems"];
  odHackStats!: ProjectLinkV2Response["odHackStats"];
  contributorStats!: ProjectLinkV2Response["contributorStats"];

  constructor(props: ProjectLinkV2Response) {
    Object.assign(this, props);
  }
}
