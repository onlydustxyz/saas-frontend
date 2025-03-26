import { escapeSearchQuery, useGlobalSearch } from "@/shared/features/global-search/global-search.context";

export function ResultHighlight({ value }: { value?: string }) {
  const { inputValue } = useGlobalSearch();

  if (!value) return null;

  const parts = value.split(new RegExp(`(${inputValue ? escapeSearchQuery(inputValue) : ""})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === (inputValue ?? "").toLowerCase() ? (
          <span key={i} className={"text-utility-brand-crystalizedviolet-800"}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
