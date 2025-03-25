import { ActivityGraphLevel } from "@/shared/components/seo/image-metadata/public-profile/image-metadata.types";

export function getLevelFromCount(range: { [key in ActivityGraphLevel]: number }, count: number): ActivityGraphLevel {
  if (count < range[1]) {
    return 1;
  } else if (count < range[2]) {
    return 2;
  } else if (count < range[3]) {
    return 3;
  } else {
    return 4;
  }
}
