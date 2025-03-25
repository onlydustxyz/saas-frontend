import { ImageMetadataBackground } from "../commons/background/background";
import { ImageMetadataContent } from "../commons/content/content";
import { HackathonImageMetadataProps } from "./image-metadata.types";

export function HackathonImageMetadata({ name, description }: HackathonImageMetadataProps) {
  const image = `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/cards.png`;

  function getDescription(description: string | undefined) {
    if (!description)
      return "Join the Open Source Week, refine your skills and create a lasting impact in the developer community.";

    if (description.length < 160) return description;

    return `${description.slice(0, 160)}...`;
  }

  return (
    <ImageMetadataBackground>
      <ImageMetadataContent title={`Join ${name || "Open Source Week"} on OnlyDust`} description={getDescription(description)} />
      <img
        src={image}
        alt="cards"
        width="359"
        height="600"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
    </ImageMetadataBackground>
  );
}
