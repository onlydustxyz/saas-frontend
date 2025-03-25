import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type ContributionItemBody = components["schemas"]["RewardItemRequest"];

export interface ContributionItemDtoInterface extends ContributionItemBody {
  isEqualTo(other: ContributionItemDtoInterface): boolean;
  toBody(): ContributionItemBody;
  uuid?: string;
}

export class ContributionItemDto implements ContributionItemDtoInterface {
  type!: ContributionItemBody["type"];
  id!: ContributionItemBody["id"];
  number!: ContributionItemBody["number"];
  repoId!: ContributionItemBody["repoId"];
  uuid?: string;

  constructor(props: ContributionItemBody & { uuid?: string }) {
    Object.assign(this, props);
  }

  isEqualTo(other: ContributionItemDtoInterface): boolean {
    const isSameType = this.type === other.type;
    const isSameId = this.id === other.id;
    const isSameNumber = this.number === other.number;

    return isSameType && isSameId && isSameNumber;
  }

  toBody(): ContributionItemBody {
    return {
      type: this.type,
      id: this.id,
      number: this.number,
      repoId: this.repoId,
    };
  }
}
