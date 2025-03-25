import { components } from "@/core/infrastructure/marketplace-api-client-adapter/__generated/api";

type BiWorldMapResponse = components["schemas"]["BiWorldMapItemResponse"];

export interface BiWorldMapInterface extends BiWorldMapResponse {
  getChartFormattedData(item: BiWorldMapResponse): {
    "iso-a2": string;
    countryName: string;
    value: number;
    color: string;
  };
}

export class BiWorldMap implements BiWorldMapInterface {
  countryCode!: BiWorldMapResponse["countryCode"];
  value!: BiWorldMapResponse["value"];
  countryName!: BiWorldMapResponse["countryName"];
  scales: [number, number, number];

  constructor(props: BiWorldMapResponse, maxScale: number) {
    Object.assign(this, props);
    this.scales = [maxScale * 0.25, maxScale * 0.5, maxScale * 0.75];
  }

  private getColor(value: number): string {
    if (value < this.scales[0]) return "#510077"; // < scales[0]
    if (value < this.scales[1]) return "#7A0EBB"; // scales[0] - scales[1]
    if (value < this.scales[2]) return "#A03AE9"; // scales[1] - scales[2];
    return "#CA75FF"; // >= scales[2]
  }

  getChartFormattedData(item: BiWorldMapResponse) {
    return {
      "iso-a2": item.countryCode,
      countryName: item.countryName,
      value: item.value,
      color: this.getColor(item.value),
    };
  }
}
