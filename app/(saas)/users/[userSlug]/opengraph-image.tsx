import { BiContributorInterface } from "@/core/domain/bi/models/bi-contributor-model";
import { UserStatsInterface } from "@/core/domain/user/models/user-stats-model";

import { Generator } from "@/shared/components/seo/image-metadata/commons/generator/generator";
import { GenericImageMetadata } from "@/shared/components/seo/image-metadata/generic/image-metadata";
import { PublicProfileImageMetadata } from "@/shared/components/seo/image-metadata/public-profile/image-metadata";
import {
  ActivityGraphLevel,
  rankCategoryTranslationMapping,
} from "@/shared/components/seo/image-metadata/public-profile/image-metadata.types";

import { getDateFromWeekNumber } from "../../../../shared/components/seo/image-metadata/public-profile/_utils/getDateFromWeekNumber";
import { getLevelFromCount } from "../../../../shared/components/seo/image-metadata/public-profile/_utils/getLevelFromCount";
import { getLevelRange } from "../../../../shared/components/seo/image-metadata/public-profile/_utils/getLevelRange";
import { getWeekId } from "../../../../shared/components/seo/image-metadata/public-profile/_utils/getWeekId";

export default async function Image(props: { params: { userSlug: string } }) {
  try {
    const userData = await fetch(
      `https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}/api/v1/bi/contributors/${props.params.userSlug}`
    ).then((res): Promise<BiContributorInterface> => res.json());

    const githubUserId = userData?.contributor.githubUserId || 0;
    const [stats, languages, ecosystems] = await Promise.all([
      fetch(`https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}/api/v1/users/${githubUserId}/stats`).then(
        (res): Promise<UserStatsInterface> => res.json()
      ),
      fetch(`https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}/api/v1/users/${githubUserId}/languages`).then(
        res => res.json()
      ),
      fetch(`https://${process.env.NEXT_PUBLIC_ONLYDUST_API_BASEPATH}/api/v1/users/${githubUserId}/ecosystems`).then(
        res => res.json()
      ),
    ]);

    const ecosystem = ecosystems?.ecosystems?.[0];
    const language = languages?.languages?.[0];
    const activity = stats?.activity;

    const createData = () => {
      const data: {
        [key: string]: {
          level: ActivityGraphLevel;
          reward?: boolean;
        };
      } = {};

      const levelRange = getLevelRange(
        activity?.map(activity => activity.issueCount + activity.codeReviewCount + activity.pullRequestCount) || []
      );

      activity?.forEach(activity => {
        data[getWeekId(getDateFromWeekNumber(activity.year, activity.week))] = {
          level: getLevelFromCount(
            levelRange,
            activity.issueCount + activity.codeReviewCount + activity.pullRequestCount
          ),
          reward: activity.rewardCount > 0,
        };
      });
      return data;
    };

    const data = createData();

    return Generator({
      children: (
        <PublicProfileImageMetadata
          login={userData?.contributor.login}
          image={userData?.contributor.avatarUrl}
          contributionCount={userData?.contributionCount.value || 0}
          rewardsCount={userData?.rewardCount.value || 0}
          title={
            userData?.contributor.globalRankCategory
              ? rankCategoryTranslationMapping[userData?.contributor.globalRankCategory]
              : ""
          }
          rank={userData?.contributor.globalRank || 0}
          rankPercentile={userData?.contributor.globalRankPercentile || 0}
          {...(ecosystem
            ? {
                topEcosystem: {
                  name: ecosystem.ecosystem.name,
                  image: ecosystem.ecosystem.logoUrl,
                },
              }
            : {})}
          {...(language
            ? {
                topLanguages: {
                  name: language.language.name,
                  image: language.language.logoUrl,
                },
              }
            : {})}
          data={data}
        />
      ),
    });
  } catch {
    return Generator({
      children: <GenericImageMetadata />,
    });
  }
}
