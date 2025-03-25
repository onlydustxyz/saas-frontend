import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BillingProfileCoworkerResponse = components["schemas"]["BillingProfileCoworkersPageItemResponse"];

export type ActionType = "cancel" | "delete" | "none";

export interface BillingProfileCoworkerInterface extends BillingProfileCoworkerResponse {
  hasPendingInvitation(): boolean;
  canBeRemoved(): boolean;
  actionType(): ActionType;
  isSelf(githubUserId: number): boolean;
  canManageCoworker(githubUserId: number): boolean;
}

export class BillingProfileCoworker implements BillingProfileCoworkerInterface {
  githubUserId!: BillingProfileCoworkerResponse["githubUserId"];
  login!: BillingProfileCoworkerResponse["login"];
  avatarUrl!: BillingProfileCoworkerResponse["avatarUrl"];
  isRegistered!: BillingProfileCoworkerResponse["isRegistered"];
  id!: BillingProfileCoworkerResponse["id"];
  role!: BillingProfileCoworkerResponse["role"];
  joinedAt!: BillingProfileCoworkerResponse["joinedAt"];
  invitedAt!: BillingProfileCoworkerResponse["invitedAt"];
  removable!: BillingProfileCoworkerResponse["removable"];

  constructor(props: BillingProfileCoworkerResponse) {
    Object.assign(this, props);
  }

  hasPendingInvitation(): boolean {
    return !this.joinedAt;
  }

  canBeRemoved(): boolean {
    return this.removable || false;
  }

  actionType(): ActionType {
    if (this.hasPendingInvitation() && this.canBeRemoved()) {
      return "cancel";
    }
    if (!this.hasPendingInvitation() && this.canBeRemoved()) {
      return "delete";
    }
    return "none";
  }

  isSelf(githubUserId: number): boolean {
    return this.githubUserId === githubUserId;
  }

  canManageCoworker(githubUserId: number): boolean {
    return this.actionType() !== "none" && !this.isSelf(githubUserId);
  }
}
