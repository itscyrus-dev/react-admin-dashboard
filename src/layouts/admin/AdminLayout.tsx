import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "@/layouts/admin/AppHeader";
import { AppSidebar } from "@/layouts/admin/AppSidebar";
import { RouteTabs } from "@/layouts/admin/RouteTabs";
import {
  getRouteMeta,
  navigationGroups,
  type NavigationGroup,
  type RouteMeta,
} from "@/config/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth";

export function AdminLayout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const location = useLocation();
  const navigate = useNavigate();
  const [visibleGroups, setVisibleGroups] = useState<NavigationGroup[]>([]);
  const [isNavigationLoading, setIsNavigationLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadNavigation = async () => {
      const routes = navigationGroups.flatMap((group) => group.items);
      const accessResults = await Promise.all(
        routes.map(async (route) => ({
          path: route.path,
          allowed: await hasPermission(
            route.permission.resource,
            route.permission.action
          ),
        }))
      );

      if (cancelled) return;

      const allowedPaths = new Set(
        accessResults.filter((result) => result.allowed).map((result) => result.path)
      );
      setVisibleGroups(
        navigationGroups
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => allowedPaths.has(item.path)),
          }))
          .filter((group) => group.items.length > 0)
      );
      setIsNavigationLoading(false);
    };

    void loadNavigation();
    return () => {
      cancelled = true;
    };
  }, [hasPermission, user?.id]);

  const availableRoutes = useMemo<RouteMeta[]>(
    () => visibleGroups.flatMap((group) => group.items),
    [visibleGroups]
  );
  const currentRoute = getRouteMeta(location.pathname);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "11.5rem",
          "--sidebar-width-icon": "3rem",
        } as CSSProperties
      }
    >
      <AppSidebar groups={visibleGroups} isLoading={isNavigationLoading} />
      <SidebarInset className="h-[100dvh] min-w-0 overflow-hidden bg-page">
        <AppHeader
          currentRoute={currentRoute}
          availableRoutes={availableRoutes}
          user={user}
          onLogout={handleLogout}
        />
        <RouteTabs availableRoutes={availableRoutes} />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1600px] p-3 lg:p-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
