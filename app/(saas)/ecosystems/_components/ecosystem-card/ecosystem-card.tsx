import { Folder, User } from "lucide-react";

import { Link } from "@/design-system/atoms/link";

import { Stat } from "@/shared/components/stat/stat";
import { Languages } from "@/shared/features/projects/languages/languages";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Card } from "@/shared/ui/card";
import { TypographyH3, TypographyMuted } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";

import { EcosystemCardProps } from "./ecosystem-card.types";

export function EcosystemCard({
  name,
  logoUrl,
  usersCount = 0,
  projectsCount = 0,
  description,
  languages,
  href,
}: EcosystemCardProps) {
  return (
    <Link href={href} className="text-decoration-none">
      <Card className={cn("relative z-[1] h-full hover:opacity-80", "border-border-primary bg-transparent")}>
        <div className="flex h-full w-full flex-col">
          <div className="relative z-20 flex h-full flex-col justify-between gap-8 rounded-md p-6">
            <div className="flex flex-col gap-8">
              <div className="flex flex-row items-center gap-6">
                <Avatar className="h-12 w-12 rounded-md">
                  <AvatarImage src={logoUrl} alt={name} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>

                <TypographyH3 className="truncate">{name}</TypographyH3>
              </div>

              <div className="flex flex-col gap-4 mobile:flex-row">
                <Card className="bg-glass flex-1 border-border-primary p-2">
                  <Stat
                    label="Users"
                    value={Intl.NumberFormat().format(usersCount)}
                    iconProps={{
                      component: User,
                      classNames: {
                        base: "text-utility-secondary-yellow-500",
                      },
                    }}
                  />
                </Card>

                <Card className="bg-glass flex-1 border-border-primary p-2">
                  <Stat
                    label="Projects"
                    value={Intl.NumberFormat().format(projectsCount)}
                    iconProps={{
                      component: Folder,
                      classNames: {
                        base: "text-utility-secondary-blue-500",
                      },
                    }}
                  />
                </Card>
              </div>

              {description ? <TypographyMuted className="line-clamp-3">{description}</TypographyMuted> : null}
            </div>

            <Languages languages={languages} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
