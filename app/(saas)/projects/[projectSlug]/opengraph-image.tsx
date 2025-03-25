import { Generator } from "@/shared/components/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "@/shared/components/seo/image-metadata/generic/image-metadata";
import { ProjectImageMetadata } from "@/shared/components/seo/image-metadata/projects/project/image-metadata";

export default async function Image(props: { params: { projectSlug: string } }) {
  try {
    const projectData = await fetch(
      `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}/api/v1/projects/slug/${props.params.projectSlug}`
    ).then(res => res.json());

    return Generator({
      children: (
        <ProjectImageMetadata
          name={projectData?.name}
          description={projectData?.shortDescription}
          imageUrl={projectData?.logoUrl}
        />
      ),
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
