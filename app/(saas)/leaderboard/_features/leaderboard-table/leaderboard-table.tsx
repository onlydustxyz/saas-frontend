"use client";

import { keepPreviousData } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";

import { LeaderboardReactQueryAdapter } from "@/core/application/react-query-adapter/leaderboard";
import { LeaderboardInterface } from "@/core/domain/leaderboard/models/leaderboard-model";

import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { TypographyH4 } from "@/shared/ui/typography";

import { CalculationHelper } from "../calculation-helper/calculation-helper";
import { ContributorInfo } from "../contributor-info/contributor-info";
import { LeaderboardFilters } from "../leaderboard-filters/leaderboard-filters";
import { LoadMoreSection } from "../load-more-section/load-more-section";
import { ScoreDetailsPopover } from "../score-details-popover/score-details-popover";

export function LeaderboardTable() {
  const [pagination, setPagination] = useState({
    fromRank: 1,
    toRank: 10,
    pageSize: 10,
  });

  const { user } = useAuthUser();

  const { data: leaderboard, isLoading: loadingLeaderboard } = LeaderboardReactQueryAdapter.client.useGetLeaderboard({
    queryParams: {
      fromRank: 1,
      toRank: pagination.toRank,
    },
    options: {
      placeholderData: keepPreviousData,
    },
  });

  const { data: userLeaderboardPosition } = LeaderboardReactQueryAdapter.client.useGetLeaderboard({
    queryParams: {
      aroundContributorId: user?.githubUserId,
      aroundContributorRowCount: 3,
    },
    options: {
      enabled: !!user && !!leaderboard?.rows && !leaderboard.rows.some(row => row.githubUserId === user?.githubUserId),
    },
  });

  const handleLoadMore = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      toRank: prev.toRank + prev.pageSize,
    }));
  }, []);

  const shouldShowLoadUntilUserPosition = useCallback(() => {
    if (!user || !userLeaderboardPosition?.rows?.length) return false;

    const userPosition = userLeaderboardPosition.rows.find(row => row.githubUserId === user.githubUserId);
    if (!userPosition) return false;

    return userPosition.rank > pagination.toRank;
  }, [user, userLeaderboardPosition?.rows, pagination.toRank]);

  const handleLoadUntilUserPosition = useCallback(() => {
    if (!userLeaderboardPosition?.rows?.length) return;

    const userPosition = userLeaderboardPosition.rows.find(row => row.githubUserId === user?.githubUserId);
    if (!userPosition) return;

    setPagination(prev => ({
      ...prev,
      toRank: userPosition.rank,
    }));
  }, [userLeaderboardPosition?.rows, user?.githubUserId]);

  const renderLeaderboardRow = useCallback(
    (row: LeaderboardInterface) => (
      <TableRow key={row.id} className={row.githubUserId === user?.githubUserId ? "bg-primary/10" : ""}>
        <TableCell>
          <TypographyH4>#{row.rank}</TypographyH4>
        </TableCell>
        <TableCell>
          <ContributorInfo row={row} />
        </TableCell>
        <TableCell className="flex justify-end">
          <ScoreDetailsPopover row={row} />
        </TableCell>
      </TableRow>
    ),
    [user]
  );

  return (
    <Card>
      {/* Display when we will have more the one season */}
      {/* <CardHeader>
        <LeaderboardFilters />
      </CardHeader> */}
      <CardContent className="pt-6">
        <CalculationHelper />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Contributor</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard?.rows?.map(row => renderLeaderboardRow(row))}
            <LoadMoreSection
              leaderboard={leaderboard}
              loadingLeaderboard={loadingLeaderboard}
              showLoadUntilPosition={shouldShowLoadUntilUserPosition()}
              userLeaderboardPosition={userLeaderboardPosition}
              onLoadMore={handleLoadMore}
              onLoadUntilUserPosition={handleLoadUntilUserPosition}
            />
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
