import { ActivityGraphLevel } from "@/shared/components/seo/image-metadata/public-profile/image-metadata.types";

export function getLevelRange(counts: number[]): { [key in ActivityGraphLevel]: number } {
  const min = Math.min(...counts);
  const max = Math.max(...counts);

  return {
    1: min,
    2: Math.round((max - min) / 3 + min),
    3: Math.round(((max - min) / 3) * 2 + min),
    4: max,
  };
}
