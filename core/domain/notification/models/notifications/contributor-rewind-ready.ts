import { Notification } from "@/core/domain/notification/models/notification-model";
import { NotificationInterface } from "@/core/domain/notification/models/notification.types";
import { NotificationStatus } from "@/core/domain/notification/notification-constants";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export class ContributorRewindReady implements NotificationInterface {
  data: components["schemas"]["NotificationContributorRewindReady"] | undefined;
  constructor(private notification: Notification) {
    this.data = notification.data.contributorRewindReady;
  }

  getType() {
    return this.notification.type;
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
    return "Your ODRewind is ready";
  }

  getDescription() {
    const { year } = this.data || {};
    return `Your ODRewind for ${year} is ready!`;
  }

  getUrl() {
    return "https://rewind.onlydust.com";
  }
}
