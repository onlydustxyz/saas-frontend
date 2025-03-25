"use client";

import { createContext, useContext, useState } from "react";

import { ProjectProgramListItemInterface } from "@/core/domain/project/models/project-program-list-item";

import { AmountSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/amount-selection/amount-selection";
import { useAmountSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/amount-selection/amount-selection.hooks";
import { ProgramSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/program-selection/program-selection";
import { useProgramSelection } from "@/shared/panels/_flows/ungrant-flow/_panels/program-selection/program-selection.hooks";
import {
  UngrantFlowContextInterface,
  UngrantFlowContextProps,
} from "@/shared/panels/_flows/ungrant-flow/ungrant-flow.types";

const UngrantFlowContext = createContext<UngrantFlowContextInterface>({
  projectId: "",
  program: undefined,
  selectProgram: () => {},
  open: () => {},
});

export function UngrantFlowProvider({ projectId = "", children }: UngrantFlowContextProps) {
  const [program, setProgram] = useState<ProjectProgramListItemInterface>();
  const { open: openProgramSelection } = useProgramSelection();
  const { open: openAmountSelection } = useAmountSelection();

  function open() {
    openProgramSelection();
  }

  function selectProgram(program: ProjectProgramListItemInterface) {
    setProgram(program);

    openAmountSelection();
  }

  return (
    <UngrantFlowContext.Provider
      value={{
        projectId,
        program,
        selectProgram,
        open,
      }}
    >
      {children}

      <ProgramSelection />
      <AmountSelection />
    </UngrantFlowContext.Provider>
  );
}

export function useUngrantFlow() {
  const context = useContext(UngrantFlowContext);

  if (!context) {
    throw new Error("UngrantFlowContext must be used inside a UngrantFlowContextProvider");
  }

  return context;
}
