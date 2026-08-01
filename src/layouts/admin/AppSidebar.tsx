import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  IconChevronDown,
  IconCode,
  IconLayoutDashboard,
  IconSparkles,
} from "@tabler/icons-react";
import { SHELL_FONT_SIZE, type NavigationGroup } from "@/config/navigation";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  groups: NavigationGroup[];
  isLoading: boolean;
}

export function AppSidebar({ groups, isLoading }: AppSidebarProps) {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const firstGroupId = groups[0]?.id ?? null;
  const effectiveOpenGroupId = hasInteracted ? openGroupId : firstGroupId;

  const handleGroupToggle = (groupId: string, isOpen: boolean) => {
    setHasInteracted(true);
    setOpenGroupId(isOpen ? groupId : null);
  };

  const handleNavigate = () => {
    setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-11 justify-center px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-9" tooltip="Admin Dashboard">
              <Link to="/dashboard" onClick={handleNavigate}>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <IconLayoutDashboard />
                </span>
                <span className="truncate text-base font-bold">Admin Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0 py-1">
        {isLoading && groups.length === 0 ? (
          <SidebarGroup>
            <SidebarGroupLabel>正在加载</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    disabled
                    className={cn("h-10 px-3", SHELL_FONT_SIZE)}
                  >
                    <IconSparkles />
                    <span>正在加载权限</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : null}
        {groups.map((group) => {
          const GroupIcon = group.icon;
          const isGroupOpen = effectiveOpenGroupId === group.id;
          const isGroupActive = group.items.some(
            (item) => location.pathname === item.path
          );

          return (
            <Collapsible
              key={group.id}
              open={isGroupOpen}
              onOpenChange={(isOpen) => handleGroupToggle(group.id, isOpen)}
              className="group/collapsible"
            >
              <SidebarGroup className="py-1.5">
                <SidebarGroupLabel
                  asChild
                  className={cn(
                    "group/label h-10 cursor-pointer rounded-md transition-colors hover:bg-muted",
                    SHELL_FONT_SIZE,
                    "font-normal",
                    isGroupActive
                      ? "text-primary hover:text-primary"
                      : "hover:text-sidebar-foreground"
                  )}
                >
                  <CollapsibleTrigger className="flex w-full items-center gap-2">
                    <GroupIcon
                      className={cn(
                        "size-4 shrink-0 transition-all duration-200 group-hover/label:scale-125",
                        isGroupActive
                          ? "text-primary"
                          : "text-sidebar-foreground/70 group-hover/label:text-sidebar-foreground"
                      )}
                    />
                    <span className="truncate">{group.title}</span>
                    <IconChevronDown className="ml-auto size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <AnimatePresence initial={false}>
                  {isGroupOpen && (
                    <motion.div
                      key="content"
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <SidebarMenuItem key={item.path}>
                                <SidebarMenuButton
                                  asChild
                                  className={cn("h-10 pl-8 pr-3", SHELL_FONT_SIZE)}
                                  isActive={location.pathname === item.path}
                                  tooltip={item.title}
                                >
                                  <Link to={item.path} onClick={handleNavigate}>
                                    <Icon className="shrink-0 transition-all duration-200 group-hover/menu-item:scale-125" />
                                    <span>{item.title}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            );
                          })}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className={cn("h-10 px-3", SHELL_FONT_SIZE)}
              tooltip="React + shadcn/ui"
            >
              <IconCode />
              <span>React + shadcn/ui</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
