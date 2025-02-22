import { MoneyFacadePort } from "./money-facade-port";

export class MoneyAdapterMock implements MoneyFacadePort {
  isFiat() {
    return false;
  }

  format() {
    return {
      amount: "-",
      code: undefined,
    };
  }

  getCurrency() {
    return {
      code: "",
      decimals: 0,
      id: "",
      logoUrl: "",
      name: "",
    };
  }

  maximumSignificantDigits = 12;
}
