import { SponsorStoragePort } from "@/core/domain/sponsor/outputs/sponsor-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class SponsorClientAdapterMock implements SponsorStoragePort {
  constructor() {}

  routes = {};

  getSponsor = mockHttpStorageResponse<SponsorStoragePort["getSponsor"]>;
}
