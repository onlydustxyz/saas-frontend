import { useMemo } from "react";

import { LanguageReactQueryAdapter } from "@/core/application/react-query-adapter/language";

import { Avatar, AvatarImage } from "@/shared/ui/avatar";
import { Combobox, ComboboxProps } from "@/shared/ui/combobox";

import { LanguagesFilterProps } from "./languages-filter.types";

export function LanguagesFilter({ languagesIds, onSelect, fullWidth = false }: LanguagesFilterProps) {
  const { data: data } = LanguageReactQueryAdapter.client.useGetLanguages({});

  const options: ComboboxProps<string>["options"] = useMemo(() => {
    return (
      data?.languages?.map(language => ({
        value: language.id,
        label: language.name,
        keywords: [language.name],
        startContent: (
          <Avatar className="size-4">
            <AvatarImage src={language.logoUrl} />
          </Avatar>
        ),
      })) ?? []
    );
  }, [data]);

  return (
    <Combobox
      options={options}
      value={languagesIds}
      onChange={onSelect}
      selectedLabel="languages"
      placeholder="Select languages"
      fullWidth={fullWidth}
    />
  );
}
