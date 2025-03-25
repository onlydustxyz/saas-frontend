import { OGActivityGraph } from "./components/activity/activity-graph";
import { OgContent } from "./components/content/content";
import { Wrapper } from "./components/wrapper";
import { PublicProfileImageMetadataProps } from "./image-metadata.types";

export function PublicProfileImageMetadata({
  title,
  login,
  image,
  data,
  rank,
  rankPercentile,
  topLanguages,
  rewardsCount,
  contributionCount,
  topEcosystem,
}: PublicProfileImageMetadataProps) {
  return (
    <Wrapper>
      <OgContent
        image={image}
        login={login}
        title={title}
        topLanguages={topLanguages}
        topEcosystem={topEcosystem}
        rank={rank}
        rankPercentile={rankPercentile}
      />
      <OGActivityGraph data={data} rewards={rewardsCount} contribution={contributionCount} />
    </Wrapper>
  );
}
