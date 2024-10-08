import { PropsWithChildren } from "react";

export function ImageMetadataBackground({ children }: PropsWithChildren) {
  const backgroundUrl = `${process.env.NEXT_PUBLIC_METADATA_ASSETS_S3_BUCKET}/metadata_background.png`;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: `url(${backgroundUrl})`,
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
