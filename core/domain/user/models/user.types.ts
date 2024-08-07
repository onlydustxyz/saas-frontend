import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

export enum UserProfileContactChannel {
  discord = "DISCORD",
  linkedin = "LINKEDIN",
  telegram = "TELEGRAM",
  twitter = "TWITTER",
  whatsapp = "WHATSAPP",
}

export interface UserProfileContact {
  channel: `${UserProfileContactChannel}`;
  contact?: string;
  visibility: "public" | "private";
}

export type UserJoiningReason = components["schemas"]["UserProfileUpdateRequest"]["joiningReason"];
