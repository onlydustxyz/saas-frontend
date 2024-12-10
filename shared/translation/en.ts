import { enSplashTranslation } from "@/app/(splash)/_translations/splash.translate";
import { enDataTranslation } from "@/app/data/_translations/data.translate";
import { enExploreTranslation } from "@/app/explore/_translations/explore.translate";
import { enFinancialsTranslation } from "@/app/financials/_translations/financials.translate";
import { enManageProjectsTranslation } from "@/app/manage-projects/_translations/manage-projects.translate";
import { enMyDashboardTranslation } from "@/app/my-dashboard/_translations/my-dashboard.translate";
import { enProgramsTranslation } from "@/app/programs/_translations/programs.translate";
import { enProjectRecommendationTranslation } from "@/app/project-recommendation/_translations/project-recommendation.translate";

import { enDateRangePickerTranslation } from "@/design-system/atoms/date-range-picker/translations/date-range-picker.translate";
import { enCardTranslations } from "@/design-system/molecules/cards/_translations/cards.translate";
import { enItemNavTranslation } from "@/design-system/molecules/item-nav/_translations/item-nav.translate";
import { enTableFilterTranslation } from "@/design-system/molecules/table-filter/translations/table-filter.translate";
import { enTableGroupByTranslation } from "@/design-system/molecules/table-group-by/translations/table-group-by.translate";
import { enTableSearchTranslation } from "@/design-system/molecules/table-search/translations/table-search.translate";
import { enTableNavTranslation } from "@/design-system/organisms/table-nav/translations/table-nav.translate";

import { enComponentsTranslations } from "@/shared/components/_translations/components.translate";
import { enMutationTranslations } from "@/shared/components/mutation/_translations/mutation.translate";
import { enFeaturesTranslations } from "@/shared/features/_translations/features.translate";
import { enFeedbackDrawerTranslate } from "@/shared/features/feedback-drawer/_translations/feedback-drawer.translate";
import { enPrimaryNavigationTranslation } from "@/shared/features/navigation/primary-navigation/_translations/primary-navigation.translate";
import { enModalsTranslation } from "@/shared/modals/_translations/modals.translate";
import { enPanelsTranslation } from "@/shared/panels/_translations/panels.translate";
import common from "@/shared/translation/translations/common/common.en.json";
import enProjectTagsTranslation from "@/shared/translation/translations/projects/project-tags.en.json";
import error from "@/shared/translation/translations/error/error.en.json";
import notFound from "@/shared/translation/translations/not-found/not-found.en.json";
import stories from "@/shared/translation/translations/stories/stories.en.json";

export const en = {
  common,
  notFound,
  error,
  stories,
  ...enPrimaryNavigationTranslation,
  ...enFeedbackDrawerTranslate,
  ...enProgramsTranslation,
  ...enProjectRecommendationTranslation,
  ...enFinancialsTranslation,
  ...enDataTranslation,
  ...enManageProjectsTranslation,
  ...enMyDashboardTranslation,
  ...enExploreTranslation,
  ...enDateRangePickerTranslation,
  ...enCardTranslations,
  ds: {
    ...enItemNavTranslation,
  },
  table: {
    ...enTableFilterTranslation,
    ...enTableGroupByTranslation,
    ...enTableNavTranslation,
    ...enTableSearchTranslation,
  },
  ...enFeaturesTranslations,
  ...enComponentsTranslations,
  ...enPanelsTranslation,
  ...enSplashTranslation,
  ...enModalsTranslation,
  ...enMutationTranslations,
  projects: {
    ...enProjectTagsTranslation,
  },
};
