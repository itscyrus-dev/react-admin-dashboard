import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from "@/layouts/admin/AppHeader";
import { AppSidebar } from "@/layouts/admin/AppSidebar";
import { RouteTabs } from "@/layouts/admin/RouteTabs";
import {
  getRouteMeta,
  navigationGroups,
  SIDEBAR_MINI_WIDTH,
  type NavigationGroup,
  type RouteMeta,
} from "@/config/navigation";
import { AnimatePresence, motion } from "motion/react";
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
  const [isMini, setIsMini] = useState(false);

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
        isMini
          ? ({ "--sidebar-width": SIDEBAR_MINI_WIDTH } as CSSProperties)
          : undefined
      }
    >
      <AppSidebar
        groups={visibleGroups}
        isLoading={isNavigationLoading}
        isMini={isMini}
        onMiniChange={setIsMini}
      />
      <SidebarInset className="h-[100dvh] min-w-0 overflow-hidden bg-page">
        <AppHeader
          currentRoute={currentRoute}
          availableRoutes={availableRoutes}
          user={user}
          onLogout={handleLogout}
        />
        <RouteTabs availableRoutes={availableRoutes} />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              className="w-full p-[18px]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
