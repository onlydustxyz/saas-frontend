"use client";

import { createContext, useContext, useState } from "react";

import { ProgramSponsorListItemInterface } from "@/core/domain/program/models/program-sponsor-list-item";

import { AmountSelection } from "@/shared/panels/_flows/unallocate-flow/_panels/amount-selection/amount-selection";
import { useAmountSelection } from "@/shared/panels/_flows/unallocate-flow/_panels/amount-selection/amount-selection.hooks";
import { SponsorSelection } from "@/shared/panels/_flows/unallocate-flow/_panels/sponsor-selection/sponsor-selection";
import { useSponsorSelection } from "@/shared/panels/_flows/unallocate-flow/_panels/sponsor-selection/sponsor-selection.hooks";
import {
  UnallocateFlowContextInterface,
  UnallocateFlowContextProps,
} from "@/shared/panels/_flows/unallocate-flow/unallocate-flow.types";

const UnallocateFlowContext = createContext<UnallocateFlowContextInterface>({
  programId: "",
  sponsor: undefined,
  selectSponsor: () => {},
  open: () => {},
});

export function UnallocateFlowProvider({ programId = "", children }: UnallocateFlowContextProps) {
  const [sponsor, setSponsor] = useState<ProgramSponsorListItemInterface>();
  const { open: openSponsorSelection } = useSponsorSelection();
  const { open: openAmountSelection } = useAmountSelection();

  function open() {
    openSponsorSelection();
  }

  function selectSponsor(sponsor: ProgramSponsorListItemInterface) {
    setSponsor(sponsor);

    openAmountSelection();
  }

  return (
    <UnallocateFlowContext.Provider
      value={{
        programId,
        sponsor,
        selectSponsor,
        open,
      }}
    >
      {children}

      <SponsorSelection />
      <AmountSelection />
    </UnallocateFlowContext.Provider>
  );
}

export function useUnallocateFlow() {
  const context = useContext(UnallocateFlowContext);

  if (!context) {
    throw new Error("UnallocateFlowContext must be used inside a UnallocateFlowContextProvider");
  }

  return context;
}
