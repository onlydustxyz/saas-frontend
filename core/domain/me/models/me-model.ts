import { bootstrap } from "@/core/bootstrap";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type MeResponse = components["schemas"]["GetMeResponse"];

export interface MeInterface extends MeResponse {
  isMe(id: string): boolean;
  isNewContributor(): boolean;
}

export class Me implements MeInterface {
  avatarUrl!: MeResponse["avatarUrl"];
  createdAt!: MeResponse["createdAt"];
  email!: MeResponse["email"];
  firstName!: MeResponse["firstName"];
  githubUserId!: MeResponse["githubUserId"];
  hasAcceptedLatestTermsAndConditions!: MeResponse["hasAcceptedLatestTermsAndConditions"];
  hasCompletedOnboarding!: MeResponse["hasCompletedOnboarding"];
  hasCompletedVerificationInformation!: MeResponse["hasCompletedVerificationInformation"];
  id!: MeResponse["id"];
  isAdmin!: MeResponse["isAdmin"];
  isAuthorizedToApplyOnGithubIssues!: MeResponse["isAuthorizedToApplyOnGithubIssues"];
  lastName!: MeResponse["lastName"];
  login!: MeResponse["login"];
  missingPayoutPreference!: MeResponse["missingPayoutPreference"];
  pendingApplications!: MeResponse["pendingApplications"];
  projectsLed!: MeResponse["projectsLed"];
  sponsors!: MeResponse["sponsors"];
  programs!: MeResponse["programs"];

  constructor(props: MeResponse) {
    Object.assign(this, props);
  }

  isMe(id: string) {
    return this.id === id;
  }

  isNewContributor() {
    const dateKernelPort = bootstrap.getDateKernelPort();
    return dateKernelPort?.isBefore(new Date(this.createdAt), dateKernelPort?.addHours(new Date(), 24));
  }
}
