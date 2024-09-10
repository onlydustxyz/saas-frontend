import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { CreateProgramPanelProps } from "@/app/financials/[sponsorId]/_features/create-program-panel/create-program-panel.types";

import { ProgramReactQueryAdapter } from "@/core/application/react-query-adapter/program";
import { CreateSponsorProgramBody } from "@/core/domain/sponsor/sponsor-contract.types";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Input } from "@/design-system/atoms/input";
import { Accordion } from "@/design-system/molecules/accordion";
import { ImageInput } from "@/design-system/molecules/image-input";

import { SidePanelBody } from "@/shared/features/side-panels/side-panel-body/side-panel-body";
import { SidePanelFooter } from "@/shared/features/side-panels/side-panel-footer/side-panel-footer";
import { SidePanelHeader } from "@/shared/features/side-panels/side-panel-header/side-panel-header";
import { UserAutocomplete } from "@/shared/features/user/user-autocomplete/user-autocomplete";
import { Translate } from "@/shared/translation/components/translate/translate";

const validation = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
  logoUrl: z.string().optional(),
  logoFile: z.any().optional(),
  leadIds: z.array(z.number()).min(0),
});

export function CreateProgramPanel({ sponsorId }: CreateProgramPanelProps) {
  const { t } = useTranslation("financials");
  const { mutateAsync: uploadLogo } = ProgramReactQueryAdapter.client.useUploadProgramLogo();
  const { control, handleSubmit } = useForm<
    Omit<CreateSponsorProgramBody, "leadIds"> & { leadIds: number[]; logoFile?: File }
  >({
    resolver: zodResolver(validation),
  });

  async function onCreateProgram({
    logoFile,
    ...data
  }: Omit<CreateSponsorProgramBody, "leadIds"> & { leadIds: number[]; logoFile?: File }) {
    const fileUrl = logoFile ? await uploadLogo(logoFile) : undefined;

    const createProgramData: CreateSponsorProgramBody = {
      ...data,
      logoUrl: fileUrl?.url,
      // TODO REMOVE WHEN API IS FIXED
      leadIds: data.leadIds.map(id => `${id}`),
    };

    console.log("onCreateProgram", createProgramData);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onCreateProgram)} className={"flex h-full w-full flex-col gap-px"}>
        <SidePanelHeader
          title={{
            translate: { token: "financials:createProgramPanel.title" },
          }}
          canGoBack={false}
          canClose={true}
        />

        <SidePanelBody>
          <Accordion
            id={"general-information"}
            titleProps={{ translate: { token: "financials:createProgramPanel.informations.title" } }}
          >
            <div className={"flex w-full flex-col gap-md"}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    label={<Translate token={"financials:createProgramPanel.informations.name.label"} />}
                    placeholder={t("createProgramPanel.informations.name.placeholder")}
                    {...field}
                  />
                )}
              />
              <Controller
                name="url"
                control={control}
                render={({ field }) => (
                  <Input
                    label={<Translate token={"financials:createProgramPanel.informations.url.label"} />}
                    placeholder={t("createProgramPanel.informations.url.placeholder")}
                    {...field}
                  />
                )}
              />
              <Controller
                name="leadIds"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <UserAutocomplete
                    name={name}
                    label={<Translate token={"financials:createProgramPanel.informations.lead.label"} />}
                    placeholder={t("createProgramPanel.informations.lead.placeholder")}
                    onSelect={onChange}
                    selectedUser={value}
                  />
                )}
              />
              <Controller
                name="logoFile"
                control={control}
                render={({ field: { onChange, name } }) => (
                  <ImageInput
                    name={name}
                    label={<Translate token={"financials:createProgramPanel.informations.image.label"} />}
                    onChange={onChange}
                    buttonProps={{
                      children: <Translate token={"financials:createProgramPanel.informations.image.buttonLabel"} />,
                    }}
                  />
                )}
              />
            </div>
          </Accordion>
        </SidePanelBody>
        <SidePanelFooter>
          <Button variant={"secondary"} type={"submit"} translate={{ token: "financials:createProgramPanel.submit" }} />
        </SidePanelFooter>
      </form>
    </>
  );
}
