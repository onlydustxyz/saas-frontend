import { Badge } from "@/design-system/atoms/badge";
import { Typo } from "@/design-system/atoms/typo";

import { ResultHighlight } from "../../_features/result/_components/result-highlight/result-highlight";
import { ResultMetric } from "../../_features/result/_components/result-metric/result-metric";
import { ResultProps } from "./result.types";

export function Result({ name, description, type, tags, metrics }: ResultProps) {
  return (
    <div
      className={
        "flex w-full flex-col justify-start gap-3 rounded-md px-4 py-3 group-data-[selected=true]/item:bg-background-primary-alt-hover"
      }
    >
      <div className="flex w-full flex-col justify-start gap-2">
        <div className="flex flex-row items-center justify-start gap-2">
          <Typo size="xl" color={"primary"}>
            <ResultHighlight value={name} />
          </Typo>
          <Badge translate={{ token: `features:globalSearch.result.type.${type}` }} size="xs" />
        </div>
        {metrics?.length ? (
          <div className="flex flex-row items-center justify-start gap-2">
            {metrics.map(({ icon, count }) => (
              <ResultMetric key={icon.toString()} icon={icon} count={count} />
            ))}
          </div>
        ) : null}

        <Typo size="sm" color={"secondary"}>
          <ResultHighlight value={description} />
        </Typo>
      </div>
      {tags?.length ? (
        <div className="flex w-full flex-row justify-start gap-2">
          {tags.map(tag => (
            <Badge key={tag} size="xs" shape="squared" color="grey">
              <ResultHighlight value={tag} />
            </Badge>
          ))}
        </div>
      ) : null}
    </div>
  );
}
