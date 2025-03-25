import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"],
  async redirects() {
    return [
      // HOME
      {
        source: "/",
        destination: "/discover",
        permanent: true,
      },
      // DATA
      {
        source: "/data",
        destination: "/data/overview",
        permanent: true,
      },
      // PROGRAMS
      {
        source: "/programs/:programId",
        destination: "/programs/:programId/projects",
        permanent: true,
      },
      // MANAGE PROJECTS
      {
        source: "/manage-projects/:projectSlug",
        destination: "/manage-projects/:projectSlug/contributors",
        permanent: true,
      },
      // MY DASHBOARD
      {
        source: "/my-dashboard",
        destination: "/my-dashboard/contributions",
        permanent: true,
      },
      // PROJECTS
      {
        source: "/projects/:projectSlug/overview",
        destination: "/projects/:projectSlug",
        permanent: true,
      },
      {
        source: "/projects/:projectSlug/issues",
        destination: "/projects/:projectSlug",
        permanent: true,
      },
      {
        source: "/projects/:projectSlug/contributors",
        destination: "/projects/:projectSlug",
        permanent: true,
      },
      {
        source: "/projects/:projectSlug/rewards",
        destination: "/projects/:projectSlug",
        permanent: true,
      },
      // OPEN-SOURCE WEEK
      {
        source: "/osw/:hackathonSlug",
        destination: "/osw/:hackathonSlug/overview",
        permanent: true,
      },
      // ECOSYSTEMS
      {
        source: "/ecosystems/:ecosystemSlug",
        destination: "/ecosystems/:ecosystemSlug/overview",
        permanent: true,
      },
      // USERS
      {
        source: "/users/:userSlug",
        destination: "/users/:userSlug/overview",
        permanent: true,
      },
      // SETTINGS
      {
        source: "/settings",
        destination: "/settings/profile",
        permanent: true,
      },
      // OLD MARKETPLACE
      {
        source: "/p/:projectSlug",
        destination: "/projects/:projectSlug",
        permanent: true,
      },
      {
        source: "/u/:userSlug",
        destination: "/users/:userSlug",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
