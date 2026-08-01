import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: { resource: string; action: string };
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  const { isAuthenticated, user, hasPermission } = useAuthStore();
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAccess = async () => {
      if (!isAuthenticated || !user) {
        setPermissionChecked(true);
        setHasAccess(false);
        return;
      }

      if (requiredPermission) {
        const allowed = await hasPermission(
          requiredPermission.resource,
          requiredPermission.action
        );
        setHasAccess(allowed);
      } else {
        setHasAccess(true);
      }
      setPermissionChecked(true);
    };

    checkAccess();
  }, [isAuthenticated, user, requiredPermission, hasPermission]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!permissionChecked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-destructive">Access Denied</div>
      </div>
    );
  }

  return <>{children}</>;
}
