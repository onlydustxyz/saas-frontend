import { HackathonStoragePort } from "@/core/domain/hackathon/outputs/hackathon-storage-port";
import { mockHttpStorageResponse } from "@/core/infrastructure/marketplace-api-client-adapter/http/mock-http-client/mock-http-storage-response";

export class HackathonClientAdapterMock implements HackathonStoragePort {
  constructor() {}

  routes = {};

  getHackathons = mockHttpStorageResponse<HackathonStoragePort["getHackathons"]>;

  getHackathonBySlug = mockHttpStorageResponse<HackathonStoragePort["getHackathonBySlug"]>;

  getHackathonEvents = mockHttpStorageResponse<HackathonStoragePort["getHackathonEvents"]>;
}