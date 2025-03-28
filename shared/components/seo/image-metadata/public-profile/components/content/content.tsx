import { ContentHighlight } from "@/shared/components/seo/image-metadata/public-profile/components/content/content-highlight";
import { ContentLogo } from "@/shared/components/seo/image-metadata/public-profile/components/content/content-logo";
import { ContentUser } from "@/shared/components/seo/image-metadata/public-profile/components/content/content-user";
import { StackIcon } from "@/shared/components/seo/image-metadata/public-profile/components/stack-icon";

interface Props {
  login: string;
  title: string;
  image: string;
  rank: number;
  rankPercentile: number;
  topLanguages?: {
    name: string;
    image: string;
  };
  topEcosystem?: {
    name: string;
    image: string;
  };
}
export function OgContent({ login, title, image, topLanguages, topEcosystem, rank, rankPercentile }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "48px",
      }}
    >
      <ContentLogo />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "36px",
        }}
      >
        <ContentUser image={image} login={login} title={title} rank={rank} rankPercentile={rankPercentile} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          {topLanguages ? (
            <ContentHighlight
              name={topLanguages.name}
              image={topLanguages.image}
              icon={<StackIcon width={28} height={28} />}
              label="Top language"
            />
          ) : null}
          {topEcosystem ? (
            <ContentHighlight
              name={topEcosystem.name}
              image={topEcosystem.image}
              icon={<StackIcon width={28} height={28} />}
              label="Top ecosystem"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
