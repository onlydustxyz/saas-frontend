import { ChevronRight, Folder, User } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Typo } from "@/design-system/atoms/typo";
import { Tabs } from "@/design-system/molecules/tabs/tabs";

import { Translate } from "@/shared/translation/components/translate/translate";

const CONTRIBUTOR = "contributor";
const PROJECTS = "projects";

export function HistogramSection() {
  const [toggleDataViews, setToggleDataViews] = useState<typeof CONTRIBUTOR | typeof PROJECTS>(CONTRIBUTOR);

  const renderDataView = useMemo(() => {
    if (toggleDataViews === CONTRIBUTOR) {
      return <div>contributor</div>;
    }

    return <div>project</div>;
  }, [toggleDataViews]);

  function handleToggleDataViews(view: string) {
    setToggleDataViews(view as typeof CONTRIBUTOR | typeof PROJECTS);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Typo size={"xs"} weight={"medium"} variant={"heading"} translate={{ token: "data:details.content.title" }} />
        <div className="flex max-w-full flex-1 items-center justify-between gap-2">
          <Tabs
            onTabClick={handleToggleDataViews}
            variant={"solid"}
            tabs={[
              {
                id: CONTRIBUTOR,
                children: <Translate token={"data:details.histogram.tabs.contributor"} />,
                startIcon: { component: User },
              },
              {
                id: PROJECTS,
                children: <Translate token={"data:details.histogram.tabs.project"} />,
                startIcon: { component: Folder },
              },
            ]}
            selectedId={toggleDataViews}
          />
          <div className={"flex items-center gap-lg"}>
            <Button
              variant={"primary"}
              endIcon={{ component: ChevronRight }}
              isTextButton
              size={"md"}
              translate={{ token: "data:details.histogram.buttons.deepDive" }}
              classNames={{
                base: "max-w-full overflow-hidden",
                label: "whitespace-nowrap text-ellipsis overflow-hidden",
              }}
              // TODO @Mehdi Handle Open DeepDive Panel
              // onClick={() => Open Deep Dive Panel}
            />
          </div>
        </div>
      </div>

      {renderDataView}
    </div>
  );
}
