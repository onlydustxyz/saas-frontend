import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ApplicantResponse = components["schemas"]["ApplicantResponse"];

export interface ApplicantInterface extends ApplicantResponse {}

export class Applicant implements ApplicantInterface {
  applicationId!: ApplicantResponse["applicationId"];
  avatarUrl!: ApplicantResponse["avatarUrl"];
  githubUserId!: ApplicantResponse["githubUserId"];
  login!: ApplicantResponse["login"];
  since!: ApplicantResponse["since"];

  constructor(props: ApplicantResponse) {
    Object.assign(this, props);
  }
}
