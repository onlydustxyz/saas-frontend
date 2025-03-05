import { PropsWithChildren, useState } from "react";

import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/shared/ui/sheet";

export function ApplicantDetailPanel({ children, applicantId }: PropsWithChildren<{ applicantId?: string }>) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col" overlayProps={{ className: "bg-transparent" }}>
        <ScrollArea className="flex-1">Content</ScrollArea>

        <SheetFooter>
          <Button variant="destructive">Reject</Button>
          <Button>Assign</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
