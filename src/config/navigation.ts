import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  FormInput,
  LayoutGrid,
  LineChart,
} from "lucide-react";

export interface RouteMeta {
  path: string;
  title: string;
  section: string;
  icon: LucideIcon;
  permission: {
    resource: string;
    action: string;
  };
  pinned?: boolean;
}

export interface NavigationGroup {
  id: string;
  title: string;
  icon: LucideIcon;
  items: RouteMeta[];
}

export const routeMeta: RouteMeta[] = [
  {
    path: "/dashboard",
    title: "分析页",
    section: "概览",
    icon: LineChart,
    permission: { resource: "/dashboard", action: "GET" },
    pinned: true,
  },
  {
    path: "/dashboard/forms",
    title: "表单示例",
    section: "功能演示",
    icon: FormInput,
    permission: { resource: "/dashboard/forms", action: "GET" },
  },
  {
    path: "/dashboard/charts",
    title: "图表示例",
    section: "功能演示",
    icon: BarChart3,
    permission: { resource: "/dashboard/charts", action: "GET" },
  },
];

export const navigationGroups: NavigationGroup[] = [
  {
    id: "overview",
    title: "概览",
    icon: LayoutGrid,
    items: routeMeta.filter((item) => item.section === "概览"),
  },
  {
    id: "demos",
    title: "功能演示",
    icon: LayoutGrid,
    items: routeMeta.filter((item) => item.section === "功能演示"),
  },
];

export function getRouteMeta(pathname: string): RouteMeta {
  return routeMeta.find((item) => item.path === pathname) ?? routeMeta[0];
}
