type profileLevel = "junior" | "senior" | "expert";

export interface QuestList {
  id: string;
  bannerUrl?: string;
  projectId: string;
  projectSlug: string;
  name: string;
  shortDescription: string;
  requiredSkills: string[];
  status: "started" | "application-open";
  startDate: string;
  endDate: string;
  wantedProfiles: {
    [key in profileLevel]?: {
      provided: number[];
      wanted: number;
    };
  };
  longDescription: {
    title: string;
    description: string;
    requirements?: string[];
    warning?: string;
    links?: string[];
  };
  issues: number[];
  maintainers: number[];
}
