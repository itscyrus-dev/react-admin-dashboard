import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  IconChevronDown,
  IconChevronsLeft,
  IconChevronsRight,
  IconLayoutDashboard,
  IconPinned,
  IconSparkles,
} from "@tabler/icons-react";
import {
  SIDEBAR_MINI_WIDTH,
  SHELL_FONT_SIZE,
  type NavigationGroup,
} from "@/config/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  isMini: boolean;
  onMiniChange: (isMini: boolean) => void;
}

export function AppSidebar({ groups, isLoading, isMini, onMiniChange }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [flyoutGroupId, setFlyoutGroupId] = useState<string | null>(null);
  const [flyoutTop, setFlyoutTop] = useState(0);
  const closeTimerRef = useRef<number | null>(null);
  const firstGroupId = groups[0]?.id ?? null;
  const effectiveOpenGroupId = hasInteracted ? openGroupId : firstGroupId;

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleGroupToggle = (groupId: string, isOpen: boolean) => {
    setHasInteracted(true);
    setOpenGroupId(isOpen ? groupId : null);
  };

  const closeOverlays = () => {
    setOpenMobile(false);
    setFlyoutGroupId(null);
  };

  const handleFlyoutNavigate = (path: string) => {
    closeOverlays();
    navigate(path);
  };

  const handleMiniIconEnter = (
    event: React.MouseEvent<HTMLButtonElement>,
    groupId: string
  ) => {
    setFlyoutTop(event.currentTarget.getBoundingClientRect().top);
    setFlyoutGroupId(groupId);
  };

  const scheduleFlyoutClose = () => {
    if (isPinned) return;
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(
      () => setFlyoutGroupId(null),
      150
    );
  };

  const cancelFlyoutClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const flyoutGroup = groups.find((group) => group.id === flyoutGroupId) ?? null;

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="h-11 justify-center px-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn("h-9", isMini && "justify-center px-0")}
              tooltip="Admin Dashboard"
            >
              <Link to="/dashboard" onClick={closeOverlays}>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <IconLayoutDashboard />
                </span>
                {!isMini && (
                  <span className="truncate text-base font-bold">Admin Dashboard</span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-0 py-1">
        {isMini ? (
          <div
            className="flex flex-col items-center gap-1 py-2"
            onMouseLeave={scheduleFlyoutClose}
          >
            {groups.map((group) => {
              const GroupIcon = group.icon;
              const isGroupActive = group.items.some(
                (item) => location.pathname === item.path
              );

              return (
                <button
                  key={group.id}
                  type="button"
                  onMouseEnter={(event) => handleMiniIconEnter(event, group.id)}
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-md transition-colors",
                    isGroupActive
                      ? "bg-primary/10 text-primary"
                      : "text-sidebar-foreground hover:bg-muted"
                  )}
                  aria-label={group.title}
                  title={group.title}
                >
                  <GroupIcon className="size-5" />
                </button>
              );
            })}
          </div>
        ) : (
          <>
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
                                      <Link to={item.path} onClick={closeOverlays}>
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
          </>
        )}
      </SidebarContent>

      {isMini && flyoutGroup
        ? createPortal(
            <div
              className="fixed z-50 w-52 rounded-lg border bg-popover p-1.5 shadow-lg"
              style={{ left: SIDEBAR_MINI_WIDTH, top: flyoutTop }}
              onMouseEnter={cancelFlyoutClose}
              onMouseLeave={scheduleFlyoutClose}
            >
              <p className="truncate px-2 py-1.5 text-xs font-medium text-muted-foreground">
                {flyoutGroup.title}
              </p>
              {flyoutGroup.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => handleFlyoutNavigate(item.path)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-muted",
                      isActive && "bg-primary/10 font-medium text-primary"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="truncate">{item.title}</span>
                  </button>
                );
              })}
            </div>,
            document.body
          )
        : null}

      <SidebarFooter>
        <div
          className={cn(
            "flex items-center py-1",
            isMini ? "justify-center" : "justify-between px-2"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            className="size-7 shrink-0 p-0"
            onClick={() => onMiniChange(!isMini)}
            aria-label={isMini ? "展开侧栏" : "折叠为图标栏"}
            title={isMini ? "展开侧栏" : "折叠为图标栏"}
          >
            {isMini ? <IconChevronsRight /> : <IconChevronsLeft />}
          </Button>
          {!isMini && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "size-7 shrink-0 p-0",
                isPinned && "bg-primary/10 text-primary"
              )}
              onClick={() => setIsPinned((value) => !value)}
              aria-label="固定侧栏"
              title="固定侧栏"
            >
              <IconPinned />
            </Button>
          )}
        </div>
      </SidebarFooter>
      {!isMini && <SidebarRail />}
    </Sidebar>
  );
}
