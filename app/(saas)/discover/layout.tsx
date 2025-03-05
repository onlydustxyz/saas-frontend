"use client";

import { withClientOnly } from "@/shared/components/client-only/client-only";

function DiscoverLayout(props: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <div>
      {props.children}
      {props.modal}
    </div>
  );
}

export default withClientOnly(DiscoverLayout);
