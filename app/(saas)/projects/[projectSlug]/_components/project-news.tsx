import { useQuery } from "@tanstack/react-query";
import { Calendar, Megaphone, Target } from "lucide-react";
import { useEffect, useMemo } from "react";

import { Submission } from "@/app/api/fillout/forms/[formId]/submissions/route";

import { bootstrap } from "@/core/bootstrap";
import { OdNewsModel } from "@/core/domain/fillout/models/od-news-model";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Card } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { TypographyH4, TypographyMuted, TypographyP } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

const filloutId = process.env.NEXT_PUBLIC_OD_NEWS_FORM_ID ?? "";

const fetchSubmissions = async ({ queryParams }: { queryParams: Record<string, string> }): Promise<OdNewsModel[]> => {
  const url = new URL(NEXT_ROUTER.api.fillout.forms.submissions.root(filloutId), window.location.origin);

  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString());

  const data = await response.json();

  return data?.data?.map((n: Submission) => new OdNewsModel(n)) ?? [];
};

function useGetOdNews({ projectId, limit = "10" }: { projectId?: string; limit?: string }) {
  return useQuery({
    queryKey: ["od-news", projectId, limit],
    queryFn: () => fetchSubmissions({ queryParams: { search: projectId ?? "", limit, sort: "desc" } }),
    staleTime: 5000,
    enabled: Boolean(projectId),
  });
}

export function ProjectNews({ projectId }: { projectId?: string }) {
  const dateKernelPort = bootstrap.getDateKernelPort();

  const { data, isLoading, isError } = useGetOdNews({ projectId, limit: "1" });
  const { capture } = usePosthog();

  const news = useMemo(() => data?.[0], [data]);

  useEffect(() => {
    if (projectId && news) {
      capture("project_latest_news_viewed", {
        projectId,
        newsId: news.submissionId,
        lastUpdatedAt: news.lastUpdatedAt,
      });
    }
  }, [projectId, news]);

  const textColor = {
    "text-indigo-500": news?.display.color === "1",
    "text-pink-500": news?.display.color === "2",
    "text-emerald-500": news?.display.color === "3",
  };

  function renderIcon() {
    let Icon;

    switch (news?.display.icon) {
      case "megaphone":
        Icon = Megaphone;
        break;
      case "calendar":
        Icon = Calendar;
        break;
      case "target":
        Icon = Target;
        break;
      default:
        return null;
    }

    return <Icon className={cn("size-5", textColor)} />;
  }

  if (isLoading) {
    return <Skeleton className="h-[98px] w-full" />;
  }

  if (isError || !news) {
    return null;
  }

  return (
    <Card
      className={cn("flex flex-col gap-2 p-4", {
        "border-indigo-500/50": news.display.color === "1",
        "border-pink-500/50": news.display.color === "2",
        "border-emerald-500/50": news.display.color === "3",
      })}
    >
      <header className={"flex items-center justify-between gap-2"}>
        <div className={"flex items-center gap-2"}>
          {renderIcon()}

          <TypographyH4 className={cn(textColor)}>{news.display.title}</TypographyH4>
        </div>

        <TypographyMuted className="text-xs">
          {dateKernelPort.formatDistanceToNow(new Date(news.lastUpdatedAt))}
        </TypographyMuted>
      </header>

      <TypographyP>{news.response.news}</TypographyP>
    </Card>
  );
}
