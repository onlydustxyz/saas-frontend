"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Children, PropsWithChildren, ReactElement, createContext, useContext, useEffect } from "react";

import { handleLoginWithRedirect } from "@/core/application/auth0-client-adapter/helpers";
import { useClientBootstrapAuth } from "@/core/bootstrap/auth/use-client-bootstrap-auth";

import { Button } from "@/design-system/atoms/button/variants/button-default";

import { NEXT_ROUTER } from "@/shared/constants/router";
import { useAuthUser } from "@/shared/hooks/auth/use-auth-user";

import { useForcedOnboarding } from "../hooks/flags/use-forced-onboarding";

interface AuthContext {
  isAuthenticated: boolean;
  redirectToSignup(): void;
  handleLogin(): void;
  redirectToApp(): void;
  isLoading: boolean;
}

const initialAuthContext: AuthContext = {
  isAuthenticated: false,
  redirectToSignup: () => {},
  handleLogin: () => {},
  redirectToApp: () => {},
  isLoading: true,
};

const AuthContext = createContext<AuthContext>(initialAuthContext);

const REDIRECT_TO_KEY = "redirectTo";

function setRedirectTo(url: string) {
  window.localStorage.setItem(REDIRECT_TO_KEY, url);
}

function getRedirectTo() {
  return window.localStorage.getItem(REDIRECT_TO_KEY) ?? NEXT_ROUTER.home.root;
}

function clearRedirectTo() {
  window.localStorage.removeItem(REDIRECT_TO_KEY);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useClientBootstrapAuth();
  const router = useRouter();

  function redirectToSignup() {
    if (!isAuthenticated && !isLoading && !error) {
      setRedirectTo(window.location.href);
      router.push(NEXT_ROUTER.signup.root);
    }
  }

  function redirectToApp() {
    // Keep as local var
    const redirectTo = getRedirectTo();
    clearRedirectTo();
    router.push(redirectTo);
  }

  function handleLogin() {
    if (!isAuthenticated && !isLoading && !error && loginWithRedirect) {
      handleLoginWithRedirect(loginWithRedirect);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, redirectToSignup, handleLogin, redirectToApp, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

export function withAuthenticated<P extends object>(Component: React.ComponentType<P>) {
  return function WithAuthenticatedComponent(props: P) {
    const { isAuthenticated, redirectToSignup, isLoading } = useAuthContext();

    useEffect(() => {
      if (!isAuthenticated) {
        redirectToSignup();
      }
    }, [isAuthenticated, redirectToSignup]);

    if (!isAuthenticated || isLoading) {
      return (
        <div className="flex size-full items-center justify-center">
          <Loader2 className="size-12 animate-spin text-foreground" />
        </div>
      );
    }

    return <Component {...props} />;
  };
}

export function withSignup<P extends object>(Component: React.ComponentType<P>) {
  return function WithSignupComponent(props: P) {
    const router = useRouter();
    const { redirectToApp } = useAuthContext();
    const { user } = useAuthUser();
    const isForcedOnboarding = useForcedOnboarding();

    useEffect(() => {
      if (user) {
        if (!user.hasAcceptedLatestTermsAndConditions) {
          router.push(NEXT_ROUTER.signup.termsAndConditions.root);
          return;
        }

        if (isForcedOnboarding && !user.hasCompletedOnboarding) {
          router.push(NEXT_ROUTER.signup.onboarding.root);
          return;
        }

        redirectToApp();
      }
    }, [router, user]);

    return <Component {...props} />;
  };
}

export function IsAuthenticated({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuthContext();
  const array = Children.toArray(children) as ReactElement[];

  const findAuthenticated = array.find(c => c.type === IsAuthenticated.Yes);
  const findNotAuthenticated = array.find(c => c.type === IsAuthenticated.No);

  if (findAuthenticated && isAuthenticated) {
    return findAuthenticated.props.children;
  }

  if (findNotAuthenticated && !isAuthenticated) {
    return findNotAuthenticated.props.children;
  }

  return null;
}

IsAuthenticated.Yes = function Yes({ children }: PropsWithChildren) {
  return children;
};

IsAuthenticated.No = function No({ children }: PropsWithChildren) {
  return children;
};

export function SignInButton({ children }: PropsWithChildren) {
  const { redirectToSignup } = useAuthContext();
  return <Button onClick={redirectToSignup}>{children ?? "Sign in"}</Button>;
}

export function withOnboarding<P extends object>(Component: React.ComponentType<P>) {
  return function WithOnboardingComponent(props: P) {
    const router = useRouter();
    const { redirectToApp } = useAuthContext();
    const { user } = useAuthUser();

    useEffect(() => {
      if (user) {
        if (user.hasCompletedOnboarding) {
          redirectToApp();
          return;
        }
      }
    }, [router, user]);

    return <Component {...props} />;
  };
}
