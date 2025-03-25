import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ApplicationResponse = components["schemas"]["ProjectApplicationResponse"];

export interface ApplicationInterface extends ApplicationResponse {}

export class Application implements ApplicationInterface {
  id!: ApplicationResponse["id"];
  projectId!: ApplicationResponse["projectId"];
  issue!: ApplicationResponse["issue"];
  applicant!: ApplicationResponse["applicant"];
  origin!: ApplicationResponse["origin"];
  githubComment!: ApplicationResponse["githubComment"];

  constructor(props: ApplicationResponse) {
    Object.assign(this, props);
  }
}
