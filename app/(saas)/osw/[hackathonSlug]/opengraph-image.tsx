import { HackathonInterface } from "@/core/domain/hackathon/models/hackathon-model";

import { Generator } from "@/shared/components/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "@/shared/components/seo/image-metadata/generic/image-metadata";
import { HackathonImageMetadata } from "@/shared/components/seo/image-metadata/hackathons/image-metadata";

export default async function Image(props: { params: { hackathonSlug: string } }) {
  try {
    const hackathonData = await fetch(
      `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}/api/v2/hackathons/slug/${props.params.hackathonSlug}`
    ).then((res): Promise<HackathonInterface> => res.json());

    return Generator({
      children: <HackathonImageMetadata name={hackathonData?.title} description={hackathonData?.description} />,
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
