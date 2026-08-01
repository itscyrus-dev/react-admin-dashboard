import type { Icon } from "@tabler/icons-react";
import {
  IconBell,
  IconChartBar,
  IconChartLine,
  IconComponents,
  IconForms,
  IconLayoutDashboard,
  IconNotebook,
  IconSettings,
  IconShieldCheck,
  IconTable,
  IconUpload,
} from "@tabler/icons-react";

export const SHELL_FONT_SIZE = "text-sm";

export interface RouteMeta {
  path: string;
  title: string;
  section: string;
  icon: Icon;
  permission: {
    resource: string;
    action: string;
  };
  pinned?: boolean;
}

export interface NavigationGroup {
  id: string;
  title: string;
  icon: Icon;
  items: RouteMeta[];
}

export const routeMeta: RouteMeta[] = [
  {
    path: "/dashboard",
    title: "分析页",
    section: "概览",
    icon: IconChartLine,
    permission: { resource: "/dashboard", action: "GET" },
    pinned: true,
  },
  {
    path: "/dashboard/forms",
    title: "表单示例",
    section: "功能演示",
    icon: IconForms,
    permission: { resource: "/dashboard/forms", action: "GET" },
  },
  {
    path: "/dashboard/charts",
    title: "图表示例",
    section: "功能演示",
    icon: IconChartBar,
    permission: { resource: "/dashboard/charts", action: "GET" },
  },
  {
    path: "/dashboard/table",
    title: "表格示例",
    section: "功能演示",
    icon: IconTable,
    permission: { resource: "/dashboard/table", action: "GET" },
  },
  {
    path: "/dashboard/editor",
    title: "富文本编辑器",
    section: "功能演示",
    icon: IconNotebook,
    permission: { resource: "/dashboard/editor", action: "GET" },
  },
  {
    path: "/dashboard/upload",
    title: "文件上传",
    section: "功能演示",
    icon: IconUpload,
    permission: { resource: "/dashboard/upload", action: "GET" },
  },
  {
    path: "/dashboard/notification",
    title: "消息通知",
    section: "功能演示",
    icon: IconBell,
    permission: { resource: "/dashboard/notification", action: "GET" },
  },
  {
    path: "/dashboard/permission",
    title: "权限示例",
    section: "功能演示",
    icon: IconShieldCheck,
    permission: { resource: "/dashboard/permission", action: "GET" },
  },
  {
    path: "/dashboard/settings",
    title: "系统设置",
    section: "功能演示",
    icon: IconSettings,
    permission: { resource: "/dashboard/settings", action: "GET" },
  },
];

export const navigationGroups: NavigationGroup[] = [
  {
    id: "overview",
    title: "概览",
    icon: IconLayoutDashboard,
    items: routeMeta.filter((item) => item.section === "概览"),
  },
  {
    id: "demos",
    title: "功能演示",
    icon: IconComponents,
    items: routeMeta.filter((item) => item.section === "功能演示"),
  },
];

export function getRouteMeta(pathname: string): RouteMeta {
  return routeMeta.find((item) => item.path === pathname) ?? routeMeta[0];
}
