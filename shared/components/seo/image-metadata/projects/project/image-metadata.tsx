import { ImageMetadataBackground } from "../../commons/background/background";
import { ImageMetadataContent } from "../../commons/content/content";
import { ProjectImageMetadataProps } from "./image-metadata.types";

export function ProjectImageMetadata({ name, description, imageUrl }: ProjectImageMetadataProps) {
  const image = imageUrl || `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/project-placeholder.png`;
  const _description =
    description ||
    "Contribute to innovative projects, refine your skills and create a lasting impact in the developer community.";

  return (
    <ImageMetadataBackground>
      <ImageMetadataContent title={`Join ${name} on OnlyDust`} description={_description} />
      <img
        src={image}
        alt="project-logo"
        width="300"
        height="300"
        style={{
          position: "absolute",
          objectFit: "cover",
          right: 30,
          top: 160,
          border: "24px solid #232338",
          borderRadius: 100,
        }}
      />
    </ImageMetadataBackground>
  );
}
