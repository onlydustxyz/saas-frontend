import { bootstrap } from "@/core/bootstrap";
import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type EcosystemEventResponse = components["schemas"]["EcosystemEventResponse"];

export interface EcosystemEventInterface extends EcosystemEventResponse {
  isComingSoon(): boolean;
  isLive(): boolean;
  isPast(): boolean;
  formatDisplayDates(): {
    startDate: string;
    startMonth: string;
    startDay: string;
    startTime: string;
    endDate: string;
    endTime: string;
  };
}

export class EcosystemEvent implements EcosystemEventInterface {
  name!: EcosystemEventResponse["name"];
  description!: EcosystemEventResponse["description"];
  location!: EcosystemEventResponse["location"];
  startDate!: EcosystemEventResponse["startDate"];
  endDate!: EcosystemEventResponse["endDate"];
  link!: EcosystemEventResponse["link"];

  constructor(props: EcosystemEventResponse) {
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
