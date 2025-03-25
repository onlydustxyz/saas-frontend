import { IconPort, RemixIconPort } from "@/design-system/atoms/icon/icon.types";

export function isRemixIcon(icon: IconPort): icon is RemixIconPort {
  return "name" in icon;
}
