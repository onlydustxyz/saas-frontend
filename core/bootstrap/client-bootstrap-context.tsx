"use client";

import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

import { bootstrap } from "@/core/bootstrap/index";
import { AuthProvider } from "@/core/infrastructure/marketplace-api-client-adapter/auth/auth-provider";
import { ImpersonationProvider } from "@/core/infrastructure/marketplace-api-client-adapter/impersonation/impersonation-provider";

interface ClientBootstrap {
  authProvider?: AuthProvider;
  impersonationProvider?: ImpersonationProvider | null;
}

const initialClientBootstrap: ClientBootstrap = {
  authProvider: bootstrap.getAuthProvider(),
  impersonationProvider: bootstrap.getImpersonationProvider(),
};

const ClientBootstrapContext = createContext<{
  clientBootstrap: ClientBootstrap;
  setClientBootstrap: Dispatch<SetStateAction<ClientBootstrap>>;
}>({
  clientBootstrap: initialClientBootstrap,
  setClientBootstrap: () => {},
});

export function ClientBootstrapProvider({ children }: PropsWithChildren) {
  const [clientBootstrap, setClientBootstrap] = useState(initialClientBootstrap);

  return (
    <ClientBootstrapContext.Provider value={{ clientBootstrap, setClientBootstrap }}>
      {children}
    </ClientBootstrapContext.Provider>
  );
}

export function useClientBootstrapContext() {
  const context = useContext(ClientBootstrapContext);

  if (context === undefined) {
    throw new Error("useClientBootstrapContext must be used within an ClientBootstrapProvider");
  }

  return context;
}
