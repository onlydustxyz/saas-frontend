import { NavigationBreadcrumb } from "@/shared/features/navigation/navigation.context";
import { PageContainer } from "@/shared/features/page/page-container/page-container";

import { ContinueContributing } from "./_features/continue-contributing/continue-contributing";
import { FeaturedProjects } from "./_features/featured-projects/featured-projects";
import { IssueCategory } from "./_features/issue-category/issue-category";
import { NewIssues } from "./_features/new-issues/new-issues";
import { OdQuestBanner } from "./_features/odquest-banner/odquest-banner";
import { ProjectRecommendationBanner } from "./_features/project-recommendation-banner/project-recommendation-banner";
import { RecommendedIssues } from "./_features/recommended-issues/recommended-issues";
import { SmartSearch } from "./_features/smart-search/smart-search";

interface Issue {
  id: string;
  title: string;
  repository: string;
  author: {
    name: string;
    avatar: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
  comments: number;
  reactions: {
    thumbsUp: number;
    heart: number;
  };
  createdAt: string;
  difficulty: "easy" | "medium" | "hard";
}

interface CategorySection {
  id: string;
  title: string;
  type: "language" | "topic" | "difficulty" | "activity";
  items: Issue[];
}

export default function ExplorePage() {
  // This would typically come from an API
  const recommendedIssues: CategorySection = {
    id: "recommended",
    title: "Recommended Issues",
    type: "language",
    items: [
      {
        id: "js1",
        title: "Implement dark mode support",
        repository: "vercel/next.js",
        author: {
          name: "johndoe",
          avatar: "https://github.com/johndoe.png",
        },
        labels: [
          { name: "feature", color: "#84cc16" },
          { name: "good first issue", color: "#22c55e" },
        ],
        comments: 8,
        reactions: {
          thumbsUp: 15,
          heart: 7,
        },
        createdAt: "2024-03-14T10:00:00Z",
        difficulty: "easy",
      },
      {
        id: "js2",
        title: "Add TypeScript support to core modules",
        repository: "facebook/react",
        author: {
          name: "janedoe",
          avatar: "https://github.com/janedoe.png",
        },
        labels: [
          { name: "enhancement", color: "#3b82f6" },
          { name: "typescript", color: "#8b5cf6" },
        ],
        comments: 12,
        reactions: {
          thumbsUp: 25,
          heart: 10,
        },
        createdAt: "2024-03-13T15:30:00Z",
        difficulty: "medium",
      },
      {
        id: "js3",
        title: "Optimize bundle size for production builds",
        repository: "vuejs/vue",
        author: {
          name: "techguru",
          avatar: "https://github.com/techguru.png",
        },
        labels: [
          { name: "performance", color: "#f59e0b" },
          { name: "build", color: "#6366f1" },
        ],
        comments: 6,
        reactions: {
          thumbsUp: 18,
          heart: 5,
        },
        createdAt: "2024-03-15T09:20:00Z",
        difficulty: "hard",
      },
    ],
  };

  const categories: CategorySection[] = [
    {
      id: "javascript",
      title: "Popular in JavaScript",
      type: "language",
      items: [
        {
          id: "js1",
          title: "Implement dark mode support",
          repository: "vercel/next.js",
          author: {
            name: "johndoe",
            avatar: "https://github.com/johndoe.png",
          },
          labels: [
            { name: "feature", color: "#84cc16" },
            { name: "good first issue", color: "#22c55e" },
          ],
          comments: 8,
          reactions: {
            thumbsUp: 15,
            heart: 7,
          },
          createdAt: "2024-03-14T10:00:00Z",
          difficulty: "easy",
        },
        {
          id: "js2",
          title: "Add TypeScript support to core modules",
          repository: "facebook/react",
          author: {
            name: "janedoe",
            avatar: "https://github.com/janedoe.png",
          },
          labels: [
            { name: "enhancement", color: "#3b82f6" },
            { name: "typescript", color: "#8b5cf6" },
          ],
          comments: 12,
          reactions: {
            thumbsUp: 25,
            heart: 10,
          },
          createdAt: "2024-03-13T15:30:00Z",
          difficulty: "medium",
        },
        {
          id: "js3",
          title: "Optimize bundle size for production builds",
          repository: "vuejs/vue",
          author: {
            name: "techguru",
            avatar: "https://github.com/techguru.png",
          },
          labels: [
            { name: "performance", color: "#f59e0b" },
            { name: "build", color: "#6366f1" },
          ],
          comments: 6,
          reactions: {
            thumbsUp: 18,
            heart: 5,
          },
          createdAt: "2024-03-15T09:20:00Z",
          difficulty: "hard",
        },
      ],
    },
    {
      id: "beginner",
      title: "Good First Issues",
      type: "difficulty",
      items: [
        {
          id: "beg1",
          title: "Improve documentation examples",
          repository: "tailwindlabs/tailwindcss",
          author: {
            name: "alexsmith",
            avatar: "https://github.com/alexsmith.png",
          },
          labels: [
            { name: "documentation", color: "#06b6d4" },
            { name: "good first issue", color: "#22c55e" },
          ],
          comments: 3,
          reactions: {
            thumbsUp: 8,
            heart: 4,
          },
          createdAt: "2024-03-15T09:00:00Z",
          difficulty: "easy",
        },
        {
          id: "beg2",
          title: "Add unit tests for utility functions",
          repository: "prisma/prisma",
          author: {
            name: "sarahdev",
            avatar: "https://github.com/sarahdev.png",
          },
          labels: [
            { name: "testing", color: "#f59e0b" },
            { name: "good first issue", color: "#22c55e" },
          ],
          comments: 5,
          reactions: {
            thumbsUp: 12,
            heart: 6,
          },
          createdAt: "2024-03-14T14:20:00Z",
          difficulty: "easy",
        },
        {
          id: "beg3",
          title: "Fix typos in error messages",
          repository: "nestjs/nest",
          author: {
            name: "devhelper",
            avatar: "https://github.com/devhelper.png",
          },
          labels: [
            { name: "documentation", color: "#06b6d4" },
            { name: "good first issue", color: "#22c55e" },
          ],
          comments: 2,
          reactions: {
            thumbsUp: 5,
            heart: 2,
          },
          createdAt: "2024-03-15T11:30:00Z",
          difficulty: "easy",
        },
      ],
    },
    {
      id: "hot",
      title: "Most Active Today",
      type: "activity",
      items: [
        {
          id: "hot1",
          title: "Fix performance regression in data fetching",
          repository: "vercel/swr",
          author: {
            name: "techdev",
            avatar: "https://github.com/techdev.png",
          },
          labels: [
            { name: "bug", color: "#ef4444" },
            { name: "performance", color: "#f59e0b" },
          ],
          comments: 15,
          reactions: {
            thumbsUp: 30,
            heart: 12,
          },
          createdAt: "2024-03-15T08:00:00Z",
          difficulty: "hard",
        },
        {
          id: "hot2",
          title: "Add support for custom animations",
          repository: "shadcn/ui",
          author: {
            name: "designpro",
            avatar: "https://github.com/designpro.png",
          },
          labels: [
            { name: "feature", color: "#84cc16" },
            { name: "animation", color: "#8b5cf6" },
          ],
          comments: 10,
          reactions: {
            thumbsUp: 20,
            heart: 15,
          },
          createdAt: "2024-03-15T07:30:00Z",
          difficulty: "medium",
        },
        {
          id: "hot3",
          title: "Implement server-side caching",
          repository: "trpc/trpc",
          author: {
            name: "backendpro",
            avatar: "https://github.com/backendpro.png",
          },
          labels: [
            { name: "enhancement", color: "#3b82f6" },
            { name: "performance", color: "#f59e0b" },
          ],
          comments: 8,
          reactions: {
            thumbsUp: 16,
            heart: 8,
          },
          createdAt: "2024-03-15T10:15:00Z",
          difficulty: "hard",
        },
      ],
    },
  ];

  const cat1 = categories[0];
  const cat2 = categories[1];
  const cat3 = categories[2];

  return (
    <PageContainer size="large">
      <NavigationBreadcrumb
        breadcrumb={[
          {
            id: "root",
            label: "Explore",
          },
        ]}
      />

      <div className="flex flex-col items-center gap-16">
        {/* Smart Search Hero */}
        <SmartSearch />

        {/* Main Content */}
        <div className="max-w-[1400px] space-y-16">
          <IssueCategory
            key={recommendedIssues.id}
            title={recommendedIssues.title}
            type={recommendedIssues.type}
            items={recommendedIssues.items}
          />

          {/* Continue where you left off section */}
          <div className="relative -mx-6 px-6">
            <div className="relative">
              <ContinueContributing />
            </div>
          </div>

          {/* Project Recommendation Banner */}
          <div className="relative -mx-6 px-6">
            <ProjectRecommendationBanner />
          </div>

          <IssueCategory key={cat1.id} title={cat1.title} type={cat1.type} items={cat1.items} />
          <IssueCategory key={cat2.id} title={cat2.title} type={cat2.type} items={cat2.items} />

          {/* OdQuest Banner */}
          <div className="relative -mx-6 px-6">
            <OdQuestBanner />
          </div>

          <IssueCategory key={cat3.id} title={cat3.title} type={cat3.type} items={cat3.items} />

          <FeaturedProjects />
        </div>
      </div>
    </PageContainer>
  );
}
