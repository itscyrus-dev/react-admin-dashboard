import { lazy, Suspense } from "react";
import { AnimatePresence, motion } from "motion/react";
import { createBrowserRouter, Navigate, Outlet, useLocation } from "react-router-dom";
import { AdminLayout } from "@/layouts/admin/AdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";

const LoginPage = lazy(() =>
  import("@/pages/LoginPage").then((module) => ({ default: module.LoginPage }))
);
const DashboardPage = lazy(() =>
  import("@/pages/DashboardPage").then((module) => ({ default: module.DashboardPage }))
);
const FormDemoPage = lazy(() =>
  import("@/pages/FormDemoPage").then((module) => ({ default: module.FormDemoPage }))
);
const ChartsDemoPage = lazy(() =>
  import("@/pages/ChartsDemoPage").then((module) => ({ default: module.ChartsDemoPage }))
);
const DemoPlaceholderPage = lazy(() =>
  import("@/pages/DemoPlaceholderPage").then((module) => ({ default: module.DemoPlaceholderPage }))
);

function RouteFallback() {
  return (
    <div className="flex flex-col gap-4 p-4" aria-label="正在加载页面">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-52 w-full" />
    </div>
  );
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{element}</Suspense>;
}

function RootLayout() {
  const location = useLocation();
  const rootKey = location.pathname.split("/")[1] || "home";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={rootKey}
        className="min-h-[100dvh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: withSuspense(<LoginPage />),
      },
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: withSuspense(<DashboardPage />),
          },
          {
            path: "forms",
            element: withSuspense(<FormDemoPage />),
          },
          {
            path: "charts",
            element: withSuspense(<ChartsDemoPage />),
          },
          {
            path: "table",
            element: withSuspense(<DemoPlaceholderPage />),
          },
          {
            path: "editor",
            element: withSuspense(<DemoPlaceholderPage />),
          },
          {
            path: "upload",
            element: withSuspense(<DemoPlaceholderPage />),
          },
          {
            path: "notification",
            element: withSuspense(<DemoPlaceholderPage />),
          },
          {
            path: "permission",
            element: withSuspense(<DemoPlaceholderPage />),
          },
          {
            path: "settings",
            element: withSuspense(<DemoPlaceholderPage />),
          },
        ],
      },
    ],
  },
]);
