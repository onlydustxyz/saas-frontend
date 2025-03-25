import { bootstrap } from "@/core/bootstrap";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { HackathonStatus } from "./hackathon.types";

type HackathonListItemResponse = components["schemas"]["HackathonsListItemResponse"];

export interface HackathonListItemInterface extends HackathonListItemResponse {
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  getStatus(): HackathonStatus;
  formatDisplayDates(): {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  };
}

export class HackathonListItem implements HackathonListItemInterface {
  endDate!: HackathonListItemResponse["endDate"];
  githubLabels!: HackathonListItemResponse["githubLabels"];
  id!: HackathonListItemResponse["id"];
  index!: HackathonListItemResponse["index"];
  issueCount!: HackathonListItemResponse["issueCount"];
  location!: HackathonListItemResponse["location"];
  openIssueCount!: HackathonListItemResponse["openIssueCount"];
  projects!: HackathonListItemResponse["projects"];
  slug!: HackathonListItemResponse["slug"];
  startDate!: HackathonListItemResponse["startDate"];
  subscriberCount!: HackathonListItemResponse["subscriberCount"];
  title!: HackathonListItemResponse["title"];

  constructor(props: HackathonListItemResponse) {
    Object.assign(this, props);
  }

  protected dateKernelPort = bootstrap.getDateKernelPort();

  isComingSoon() {
    return this.dateKernelPort.isFuture(new Date(this.startDate));
  }

  isLive() {
    return this.dateKernelPort.isPast(new Date(this.startDate)) && this.dateKernelPort.isFuture(new Date(this.endDate));
  }

  isPast() {
    return this.dateKernelPort.isPast(new Date(this.endDate));
  }

  getStatus(): HackathonStatus {
    if (this.isLive()) {
      return HackathonStatus.Live;
    }

    if (this.isComingSoon()) {
      return HackathonStatus.Open;
    }

    return HackathonStatus.Closed;
  }

  formatDisplayDates() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    return {
      startDate: this.dateKernelPort.format(startDate, "d MMM. yyyy"),
      endDate: this.dateKernelPort.format(endDate, "d MMM. yyyy"),
      startTime: this.dateKernelPort.format(startDate, "h:mmaa (OOO)"),
      endTime: this.dateKernelPort.format(endDate, "h:mmaa (OOO)"),
    };
  }
}
