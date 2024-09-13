import { Typo } from "@/design-system/atoms/typo";

export function DevCountLegend({ countSum }: { countSum: number }) {
  return (
    <div className="flex gap-1">
      <Typo size={"xs"} color={"primary"}>
        {countSum}
      </Typo>
      <Typo size={"xs"} color={"primary"} translate={{ token: "data:histograms.legends.devs" }} />
    </div>
  );
}
