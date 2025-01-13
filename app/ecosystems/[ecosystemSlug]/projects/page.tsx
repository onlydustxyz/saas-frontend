import { withAuthenticationRequired } from "@auth0/auth0-react";

import { withClientOnly } from "@/shared/components/client-only/client-only";

function EcosystemProjectsPage() {
  return (
    <div className="flex-1 p-lg">
      <h1>Projects</h1>
    </div>
  );
}

export default withClientOnly(withAuthenticationRequired(EcosystemProjectsPage));
