"use client";

import { PropsWithChildren } from "react";

export default function OnboardingLayout({ children }: PropsWithChildren) {
  // TODO matchpath for terms and conditions, global info, personalize

  return <div className={"flex w-full max-w-2xl flex-col gap-6"}>{children}</div>;
}
