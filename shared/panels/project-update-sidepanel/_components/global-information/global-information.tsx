import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { DatePicker } from "@/design-system/atoms/date-picker";
import { FieldContainer } from "@/design-system/atoms/field-container";
import { Input } from "@/design-system/atoms/input";
import { Switch } from "@/design-system/atoms/switch";
import { Textarea } from "@/design-system/atoms/textarea";
import { Typo } from "@/design-system/atoms/typo";
import { Accordion } from "@/design-system/molecules/accordion";
import { ImageInput } from "@/design-system/molecules/image-input";
import { MenuItemPort } from "@/design-system/molecules/menu-item";
import { Select } from "@/design-system/molecules/select";

import { CategoryAutocomplete } from "@/shared/features/autocompletes/category-autocomplete/category-autocomplete";
import { EcosystemsAutocomplete } from "@/shared/features/autocompletes/ecosystems-autocomplete/ecosystems-autocomplete";
import { GlobalInformationProps } from "@/shared/panels/project-update-sidepanel/_components/global-information/global-information.types";
import {
  EditProjectFormData,
  rewardsSettingsTypes,
} from "@/shared/panels/project-update-sidepanel/project-update-sidepanel.types";
import { Translate } from "@/shared/translation/components/translate/translate";

export function GlobalInformation({ project }: GlobalInformationProps) {
  const { t } = useTranslation("panels");
  const { control } = useFormContext<EditProjectFormData>();
  const rewardsSettingsItems: MenuItemPort[] = useMemo(
    () => [
      {
        id: rewardsSettingsTypes.CodeReviews,
        label: t("projectUpdate.globalInformation.rewardsSettings.items.codeReviews"),
      },
      {
        id: rewardsSettingsTypes.PullRequests,
        label: t("projectUpdate.globalInformation.rewardsSettings.items.pullRequests"),
      },
      {
        id: rewardsSettingsTypes.Issue,
        label: t("projectUpdate.globalInformation.rewardsSettings.items.issue"),
      },
    ],
    []
  );

  const initialEcosystemsItems: MenuItemPort[] = useMemo(
    () =>
      project.ecosystems.map(ecosystem => ({
        id: ecosystem.id,
        label: ecosystem.name,
        searchValue: ecosystem.name,
        avatar: { src: ecosystem.logoUrl },
      })),
    [project]
  );

  return (
    <Accordion
      defaultSelected={["global-information"]}
      id={"global-information"}
      titleProps={{ translate: { token: "panels:projectUpdate.globalInformation.title" } }}
    >
      <div className={"flex w-full flex-col gap-md"}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label={<Translate token={"panels:projectUpdate.globalInformation.name.label"} />}
              placeholder={t("projectUpdate.globalInformation.name.placeholder")}
              {...field}
            />
          )}
        />
        <Controller
          name="shortDescription"
          control={control}
          render={({ field }) => (
            <Input
              label={<Translate token={"panels:projectUpdate.globalInformation.shortDescription.label"} />}
              placeholder={t("projectUpdate.globalInformation.shortDescription.placeholder")}
              {...field}
            />
          )}
        />
        <Controller
          name="longDescription"
          control={control}
          render={({ field }) => (
            <Textarea
              label={<Translate token={"panels:projectUpdate.globalInformation.longDescription.label"} />}
              placeholder={t("projectUpdate.globalInformation.longDescription.placeholder")}
              {...field}
            />
          )}
        />
        <Controller
          name="logoFile"
          control={control}
          render={({ field: { onChange, name } }) => (
            <ImageInput
              name={name}
              value={project?.logoUrl}
              label={<Translate token={"panels:projectUpdate.globalInformation.logo.label"} />}
              onChange={onChange}
              buttonProps={{
                children: <Translate token={"panels:projectUpdate.globalInformation.logo.buttonLabel"} />,
              }}
            />
          )}
        />
        <Controller
          name="ecosystemIds"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <EcosystemsAutocomplete
              name={name}
              label={<Translate token={"panels:projectUpdate.globalInformation.ecosystems.label"} />}
              placeholder={t("projectUpdate.globalInformation.ecosystems.placeholder")}
              onSelect={onChange}
              selectedEcosystems={value}
              initialEcosystems={initialEcosystemsItems}
              isMultiple={true}
            />
          )}
        />
        <Controller
          name="categoryIds"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <CategoryAutocomplete
              name={name}
              label={<Translate token={"panels:projectUpdate.globalInformation.categories.label"} />}
              placeholder={t("projectUpdate.globalInformation.categories.placeholder")}
              onSelect={onChange}
              selectedCategories={value}
              isMultiple={true}
            />
          )}
        />
        <FieldContainer
          name={"rewardSettingsArrays"}
          label={<Translate token={"panels:projectUpdate.globalInformation.rewardsSettings.label"} />}
        >
          <div className={"flex flex-row items-center justify-start gap-md"}>
            <Controller
              name="rewardSettingsArrays"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Select
                  name={name}
                  selectedIds={value}
                  onSelect={onChange}
                  items={rewardsSettingsItems}
                  isMultiple={true}
                />
              )}
            />
            <Typo size={"xs"} translate={{ token: "panels:projectUpdate.globalInformation.rewardsSettings.since" }} />
            <DatePicker value={new Date()} onChange={() => {}} />
          </div>
        </FieldContainer>
        <FieldContainer
          name={"rewardSettingsArrays"}
          label={<Translate token={"panels:projectUpdate.globalInformation.hiring.label"} />}
        >
          <Controller
            name="isLookingForContributors"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Switch
                onChange={onChange}
                isSelected={value}
                label={{ token: "panels:projectUpdate.globalInformation.hiring.switch" }}
              />
            )}
          />
        </FieldContainer>
      </div>
    </Accordion>
  );
}
