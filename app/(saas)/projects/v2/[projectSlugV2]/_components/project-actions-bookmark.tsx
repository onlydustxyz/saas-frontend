import { Bookmark, BookmarkPlus } from "lucide-react";
import { useMemo } from "react";
import { toast } from "sonner";

import { BookmarkReactQueryAdapter } from "@/core/application/react-query-adapter/bookmark";

import { usePosthog } from "@/shared/tracking/posthog/use-posthog";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { cn } from "@/shared/utils";

export function ProjectActionsBookmark({ projectId = "", projectName }: { projectId?: string; projectName?: string }) {
  const { capture } = usePosthog();
  const { data } = BookmarkReactQueryAdapter.client.useGetBookmarks({
    options: {
      enabled: Boolean(projectId),
    },
  });

  const isBookMarked = useMemo(() => data?.projects?.some(bookmark => bookmark.id === projectId), [data, projectId]);

  const { mutate: addBookmark } = BookmarkReactQueryAdapter.client.useAddBookmark({
    pathParams: { projectId },
    options: {
      onSuccess: () => {
        capture("project_bookmark_added", { projectId });
        toast.success(`${projectName} added to bookmarks`);
      },
      onError: () => {
        toast.error(`Failed to add ${projectName} to bookmarks`);
      },
    },
  });

  const { mutate: removeBookmark } = BookmarkReactQueryAdapter.client.useRemoveBookmark({
    pathParams: { projectId },
    options: {
      onSuccess: () => {
        capture("project_bookmark_removed", { projectId });
        toast.success(`${projectName} removed from bookmarks`);
      },
      onError: () => {
        toast.error(`Failed to remove ${projectName} from bookmarks`);
      },
    },
  });

  function toggleBookmark() {
    (isBookMarked ? removeBookmark : addBookmark)({});
  }

  if (!projectId || !projectName) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"outline"}
          className={cn({ "bg-purple-500 hover:bg-purple-700": isBookMarked })}
          size="icon"
          onClick={toggleBookmark}
        >
          {isBookMarked ? <Bookmark className={"fill-white"} /> : <BookmarkPlus />}
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        {isBookMarked ? "Remove from bookmarks" : "Bookmark this project to access it quickly from the menu"}
      </TooltipContent>
    </Tooltip>
  );
}
