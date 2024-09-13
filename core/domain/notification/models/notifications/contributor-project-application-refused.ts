import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { MARKETPLACE_ROUTER } from "@/shared/constants/router";
import { marketplaceRouting } from "@/shared/helpers/marketplace-routing";

export class ContributorProjectApplicationRefused implements NotificationInterface {
  data: components["schemas"]["NotificationContributorProjectApplicationRefused"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorProjectApplicationRefused;
  }

  getId() {
    return this.notification.id;
  }

  getTimestamp() {
    return this.notification.timestamp;
  }

  getStatus() {
    return this.notification.status;
  }

  hasRead() {
    return this.notification.status === NotificationStatus.READ;
  }

  getTitle() {
    return "Your application has been refused";
  }

  getDescription() {
    const { issueName } = this.data || {};
    return `Your application for ${issueName} has been refused.`;
  }

  getUrl() {
    return marketplaceRouting(MARKETPLACE_ROUTER.applications.all);
  }
}
