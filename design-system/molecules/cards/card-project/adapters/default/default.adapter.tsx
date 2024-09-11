import { CodeXml, Folder, Tag, User } from "lucide-react";
import { ElementType } from "react";

import { Avatar } from "@/design-system/atoms/avatar";
import { Badge, BadgePort } from "@/design-system/atoms/badge";
import { Button } from "@/design-system/atoms/button/variants/button-default";
import { Paper } from "@/design-system/atoms/paper";
import { Typo } from "@/design-system/atoms/typo";

import { InfoDropdown } from "@/shared/features/info-dropdown/info-dropdown";
import { cn } from "@/shared/helpers/cn";

import { CardProjectPort } from "../../card-project.types";
import { CardProjectDefaultVariants } from "./default.variants";

function Languages({ languages }: { languages: Array<BadgePort<"div">> }) {
  const formattedLanguages = languages.map(language => ({
    ...language,
    icon: { component: CodeXml },
  }));

  if (formattedLanguages.length < 3) {
    return formattedLanguages.map((t, key) => <Badge key={key} color="grey" size="xs" {...t} />);
  }

  return (
    <InfoDropdown
      label={{ token: "common:languages", count: formattedLanguages.length }}
      icon={{ component: CodeXml }}
      items={formattedLanguages}
    />
  );
}

function Categories({ categories }: { categories: Array<BadgePort<"div">> }) {
  const formattedCategories = categories.map(category => ({
    ...category,
    icon: { component: Tag },
  }));

  if (formattedCategories.length < 3) {
    return formattedCategories.map((t, key) => <Badge key={key} color="grey" size="xs" {...t} />);
  }

  return (
    <InfoDropdown
      label={{ token: "common:categories", count: formattedCategories.length }}
      icon={{ component: Tag }}
      items={formattedCategories}
    />
  );
}

function ProjectCount({ projectCount }: { projectCount?: string }) {
  if (projectCount) {
    return (
      <Badge color="grey" size="xs" icon={{ component: Folder }}>
        {projectCount}
      </Badge>
    );
  }

  return null;
}

function UserCount({ userCount }: { userCount?: string }) {
  if (userCount) {
    return (
      <Badge color="grey" size="xs" icon={{ component: User }}>
        {userCount}
      </Badge>
    );
  }

  return null;
}

export function CardProjectDefaultAdapter<C extends ElementType = "div">({
  as,
  classNames,
  htmlProps,
  title,
  description,
  logoUrl,
  languages = [],
  categories = [],
  projectCount,
  userCount,
  buttonProps,
  onClick,
  size = "xl",
  background = "secondary",
  border = "primary",
}: CardProjectPort<C>) {
  const slots = CardProjectDefaultVariants({ clickable: Boolean(onClick) });

  return (
    <Paper
      as={as}
      htmlProps={htmlProps}
      size={size}
      background={background}
      border={border}
      classNames={{ base: cn(slots.base(), classNames?.base) }}
      onClick={onClick}
    >
      <Avatar src={logoUrl} shape={"squared"} size="s" />

      <div className="flex w-full flex-col gap-3 overflow-hidden">
        <div className="flex items-start justify-between gap-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Typo size="sm" weight="medium" color={"primary"}>
                {title}
              </Typo>
            </div>
            <Typo size="xs" color={"secondary"}>
              {description}
            </Typo>
          </div>

          {buttonProps && <Button {...buttonProps} size="xs" variant="secondary" />}
        </div>

        <div className="flex w-full flex-wrap gap-1">
          <Languages languages={languages} />
          <Categories categories={categories} />
          <ProjectCount projectCount={projectCount} />
          <UserCount userCount={userCount} />
        </div>
      </div>
    </Paper>
  );
}
