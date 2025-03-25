import { z } from "zod";

import { MeProfile, MeProfileInterface } from "@/core/domain/me/models/me-profile-model";
import { UserProfileContactChannel } from "@/core/domain/user/models/user.types";

import { formSchema } from "./form.types";

export const REGEX = {
  website: /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
  telegram: /^[a-zA-Z0-9_]{5,32}$/,
  whatsapp: /^\+[1-9]\d{6,14}$/,
  twitter: /^[a-zA-Z0-9_]{1,15}$/,
  discord: /^[a-zA-Z0-9_]{3,32}$/,
  linkedin: /^[a-zA-Z0-9-]{3,100}$/,
};

enum ALLOCATED_TIME {
  NONE = "NONE",
  LESS_THAN_ONE_DAY = "LESS_THAN_ONE_DAY",
  ONE_TO_THREE_DAYS = "ONE_TO_THREE_DAYS",
  GREATER_THAN_THREE_DAYS = "GREATER_THAN_THREE_DAYS",
}

const INVALID_URL = "invalidUrl";
const INVALID_USERNAME = "invalidUsername";
const INVALID_PHONE_NUMBER = "invalidPhoneNumber";

type KeyType = typeof INVALID_URL | typeof INVALID_USERNAME | typeof INVALID_PHONE_NUMBER;

export const keys: Record<KeyType, string> = {
  [INVALID_URL]: "Please enter a valid URL (e.g., https://example.com)",
  [INVALID_USERNAME]: "Please enter a valid username without @ or URL",
  [INVALID_PHONE_NUMBER]: "Please enter a valid phone number with country code (e.g., +1234567890)",
};

export function formatData(data: MeProfileInterface) {
  return {
    avatarUrl: data.avatarUrl ?? "",
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    location: data.location ?? "",
    bio: data.bio ?? "",
    website: data.website ?? "",
    weeklyAllocatedTime: data.allocatedTimeToContribute as ALLOCATED_TIME,
    lookingForAJob: data.isLookingForAJob ?? false,
    telegram: data.getFormContactInfo(UserProfileContactChannel.telegram),
    whatsapp: data.getFormContactInfo(UserProfileContactChannel.whatsapp),
    twitter: data.getFormContactInfo(UserProfileContactChannel.twitter),
    discord: data.getFormContactInfo(UserProfileContactChannel.discord),
    linkedin: data.getFormContactInfo(UserProfileContactChannel.linkedin),
  };
}

function createContact({
  channel,
  contact,
  isPublic,
  prefixUrl,
}: {
  contact: string;
  isPublic: boolean;
  channel: UserProfileContactChannel;
  prefixUrl?: string;
}): {
  channel: UserProfileContactChannel;
  contact: string;
  visibility: "public" | "private";
} {
  const buildContact = MeProfile.buildContact({
    channel,
    contact,
    visibility: isPublic ? "public" : "private",
  });

  return { ...buildContact, contact: `${prefixUrl || ""}${buildContact.contact}` };
}

export function formatToSchema(data: z.infer<typeof formSchema>) {
  const { firstName, lastName, avatarUrl, location, bio, website, telegram, whatsapp, twitter, discord, linkedin } =
    data;

  const contacts = [
    telegram?.contact
      ? createContact({
          channel: UserProfileContactChannel.telegram,
          contact: telegram.contact,
          isPublic: telegram.isPublic,
          prefixUrl: "https://t.me/",
        })
      : null,
    whatsapp?.contact
      ? createContact({
          channel: UserProfileContactChannel.whatsapp,
          contact: whatsapp.contact,
          isPublic: whatsapp.isPublic,
        })
      : null,
    twitter?.contact
      ? createContact({
          channel: UserProfileContactChannel.twitter,
          contact: twitter.contact,
          isPublic: twitter.isPublic,
          prefixUrl: "https://x.com/",
        })
      : null,
    discord?.contact
      ? createContact({
          channel: UserProfileContactChannel.discord,
          contact: discord.contact,
          isPublic: discord.isPublic,
        })
      : null,
    linkedin?.contact
      ? createContact({
          channel: UserProfileContactChannel.linkedin,
          contact: linkedin.contact,
          isPublic: linkedin.isPublic,
          prefixUrl: "https://www.linkedin.com/in/",
        })
      : null,
  ].filter((contact): contact is NonNullable<typeof contact> => contact !== null);

  return {
    firstName,
    lastName,
    avatarUrl,
    location,
    bio,
    website,
    contacts,
  };
}
