import { bootstrap } from "@/core/bootstrap";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

import { HackathonEventStatus } from "./hackathon.types";

type HackathonEventResponse = components["schemas"]["HackathonsEventItemResponse"];

export interface HackathonEventInterface extends HackathonEventResponse {
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  getStatus(): HackathonEventStatus;
  formatDisplayDates(): {
    startDate: string;
    startMonth: string;
    startDay: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };
}

export class HackathonEvent implements HackathonEventInterface {
  name!: HackathonEventResponse["name"];
  subtitle!: HackathonEventResponse["subtitle"];
  iconSlug!: HackathonEventResponse["iconSlug"];
  startDate!: HackathonEventResponse["startDate"];
  endDate!: HackathonEventResponse["endDate"];
  links!: HackathonEventResponse["links"];

  constructor(props: HackathonEventResponse) {
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

  getStatus() {
    if (this.isLive()) {
      return HackathonEventStatus.Highlight;
    }

    if (this.isPast()) {
      return HackathonEventStatus.Terminated;
    }

    return HackathonEventStatus.Planned;
  }

  formatDisplayDates() {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    return {
      startDate: this.dateKernelPort.format(startDate, "d MMM. yyyy"),
      startMonth: this.dateKernelPort.format(startDate, "MMM."),
      startDay: this.dateKernelPort.format(startDate, "d"),
      startTime: this.dateKernelPort.format(startDate, "haa (OOO)"),
      endDate: this.dateKernelPort.format(endDate, "d MMM. yyyy"),
      endTime: this.dateKernelPort.format(endDate, "haa (OOO)"),
    };
  }
}
