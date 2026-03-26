import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authClient } from "./auth.client";

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="p-4 text-sm text-muted-foreground">Loading session...</div>;
  }

  if (!data?.session || !data.user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};
