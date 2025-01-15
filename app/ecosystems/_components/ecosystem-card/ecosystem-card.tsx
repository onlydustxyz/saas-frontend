import { Folder, User } from "lucide-react";
import { ElementType, useRef } from "react";

import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";
import { AvatarLabelSingle } from "@/design-system/molecules/avatar-label-single/variants/avatar-label-single-default";
import { HoverEffect } from "@/design-system/molecules/cards/card-project-marketplace/_components/hover-effect/hover-effect";

import { Stat } from "@/shared/components/stat/stat";
import { Languages } from "@/shared/features/projects/languages/languages";

import { EcosystemCardProps } from "./ecosystem-card.types";

export function EcosystemCard<C extends ElementType = "div">({
  as,
  htmlProps,
  name,
  logoUrl,
  usersCount = 0,
  projectsCount = 0,
  description,
  languages,
}: EcosystemCardProps<C>) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Paper as={as} htmlProps={htmlProps} size="none" background="transparent" border="primary">
      <div ref={cardRef} className="flex h-full w-full flex-col">
        <HoverEffect cardRef={cardRef} />

        <div className="relative z-20 flex h-full flex-col justify-between gap-2lg rounded-md border-border-primary p-xl">
          <div className="flex flex-col gap-2lg">
            <AvatarLabelSingle
              avatar={{
                src: logoUrl,
                alt: name,
              }}
              size="xl"
              shape="squared"
              title={{
                variant: "heading",
                size: "xs",
                weight: "medium",
                children: name,
              }}
            />

            <div className="flex flex-col gap-md mobile:flex-row">
              <Paper size="md">
                <Stat
                  label={{ token: "hackathon:shared.stats.registered" }}
                  value={Intl.NumberFormat().format(usersCount)}
                  iconProps={{
                    component: User,
                    classNames: {
                      base: "text-utility-secondary-yellow-500",
                    },
                  }}
                />
              </Paper>

              <Paper size="md">
                <Stat
                  label={{ token: "hackathon:shared.stats.projects" }}
                  value={Intl.NumberFormat().format(projectsCount)}
                  iconProps={{
                    component: Folder,
                    classNames: {
                      base: "text-utility-secondary-blue-500",
                    },
                  }}
                />
              </Paper>
            </div>

            {description ? (
              <Typo size="sm" color="tertiary" classNames={{ base: "line-clamp-3" }}>
                {description}
              </Typo>
            ) : null}
          </div>

          <Languages languages={languages} />
        </div>
      </div>
    </Paper>
  );
}
