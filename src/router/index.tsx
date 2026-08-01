import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
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

export const router = createBrowserRouter([
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
    ],
  },
]);
