import Link from "next/link";

import { MeReactQueryAdapter } from "@/core/application/react-query-adapter/me";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Skeleton } from "@/shared/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { TypographyMuted, TypographyP } from "@/shared/ui/typography";

export function PayoutPreferencesTable() {
  const { data, isLoading, isError } = MeReactQueryAdapter.client.useGetMyPayoutPreferences({});

  if (isLoading) {
    return <Skeleton className="h-96" />;
  }

  if (isError) {
    return <TypographyMuted>Failed to load payout preferences</TypographyMuted>;
  }

  if (!data) {
    return <TypographyMuted>No payout preferences found</TypographyMuted>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Billing profile</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(payoutPreference => (
            <TableRow key={payoutPreference.project.id}>
              <TableCell>
                <Link
                  href={NEXT_ROUTER.users.details.root(payoutPreference.project.id)}
                  className="flex w-fit items-center gap-2"
                >
                  <Avatar>
                    <AvatarImage src={payoutPreference.project.logoUrl} alt={payoutPreference.project.name} />
                    <AvatarFallback>{payoutPreference.project.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <TypographyP>{payoutPreference.project.name}</TypographyP>
                  </div>
                </Link>
              </TableCell>

              <TableCell>{payoutPreference.billingProfile?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
