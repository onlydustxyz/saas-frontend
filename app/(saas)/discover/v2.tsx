import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";
import { PageInner } from "@/shared/features/page/page-inner/page-inner";

import { IssueCard } from "./_components/issue-card/issue-card";
import { NewProjectCard } from "./_components/new-project-card/new-project-card";
import { PageCarousel } from "./_components/page-carousel/page-carousel";
import { PageHeader } from "./_features/page-header/page-header";

export default function DiscoverPageV2() {
  return (
    <PageContainer size="full">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Discover",
          },
        ]}
      />

      <div className="flex flex-col gap-16 pt-4">
        <PageHeader enoughtRecommendations={false} />
        <PageInner className="relative z-[1] flex w-full flex-col gap-14">
          <PageCarousel
            title="Recommended for you"
            count={10}
            description="Find issues to contribute to"
            resourceType="issue"
          >
            {["Issue 1", "Issue 2", "Issue 3", "Issue 4"].map(i => (
              <IssueCard
                key={i}
                title={i}
                languages={[
                  {
                    logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/typescript.png",
                  },
                  {
                    logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/javascript.png",
                  },
                ]}
                project={{
                  name: "OnlyRust",
                  repo: "repo 1",
                  logoUrl:
                    "https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/d1a4698447769f2de7e4467144024b97.png",
                }}
                issue={{
                  number: 555,
                  githubStatus: "OPEN",
                }}
                createdAt="2021-01-01"
                labels={["bug", "help wanted", "good first issue"]}
              />
            ))}
          </PageCarousel>
          <PageCarousel
            title="React projects"
            count={10}
            description="Find projects to contribute to"
            resourceType="project"
          >
            <NewProjectCard
              className="min-h-full"
              name="OnlyRust"
              logoUrl="https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/d1a4698447769f2de7e4467144024b97.png"
              description="Strapi is the next-gen headless CMS, open-source, javascript, enabling content-rich experiences to be created, managed open-source, javascript, enabling open-source, javascript, enabling"
              categories={["React", "JavaScript"]}
              languages={[
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/typescript.png",
                },
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/javascript.png",
                },
              ]}
              stars={100}
              forks={100}
              contributors={100}
            />
            <NewProjectCard
              className="min-h-full"
              name="OnlyRust"
              logoUrl="https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/d1a4698447769f2de7e4467144024b97.png"
              description="Strapi is the next-gen"
              categories={["React", "JavaScript"]}
              languages={[
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/typescript.png",
                },
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/javascript.png",
                },
              ]}
              stars={100}
              forks={100}
              contributors={100}
            />
            <NewProjectCard
              className="min-h-full"
              name="OnlyRust"
              logoUrl="https://develop-onlydust-app-images.s3.eu-west-1.amazonaws.com/d1a4698447769f2de7e4467144024b97.png"
              description="Strapi is the next-gen headless CMS, open-source, javascript, enabling content-rich experiences to be created, managed open-source, javascript, enabling open-source, javascript, enabling"
              categories={["React", "JavaScript"]}
              languages={[
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/typescript.png",
                },
                {
                  logoUrl: "https://od-languages-develop.s3.eu-west-1.amazonaws.com/background/javascript.png",
                },
              ]}
              stars={100}
              forks={100}
              contributors={100}
            />
          </PageCarousel>
        </PageInner>
      </div>
    </PageContainer>
  );
}
