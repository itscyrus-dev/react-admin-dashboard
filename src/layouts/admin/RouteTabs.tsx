import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RouteMeta } from "@/config/navigation";
import { getRouteMeta, SHELL_FONT_SIZE } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { IconDots, IconRefresh, IconX } from "@tabler/icons-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface RouteTabsProps {
  availableRoutes: RouteMeta[];
}

export function RouteTabs({ availableRoutes }: RouteTabsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openPaths, setOpenPaths] = useState<string[]>(["/dashboard"]);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const availablePaths = useMemo(
    () => new Set(availableRoutes.map((route) => route.path)),
    [availableRoutes],
  );

  useEffect(() => {
    if (!availablePaths.has(location.pathname)) return;
    setOpenPaths((paths) =>
      paths.includes(location.pathname) ? paths : [...paths, location.pathname],
    );
  }, [availablePaths, location.pathname]);

  const tabs = openPaths
    .filter((path) => availablePaths.has(path) || path === "/dashboard")
    .map(getRouteMeta);

  const handleClose = (path: string) => {
    const closingIndex = openPaths.indexOf(path);
    const nextPaths = openPaths.filter((openPath) => openPath !== path);
    setOpenPaths(nextPaths);

    if (location.pathname === path) {
      const nextPath = nextPaths[Math.max(0, closingIndex - 1)] ?? "/dashboard";
      navigate(nextPath);
    }
  };

  const handleCloseOthers = () => {
    setOpenPaths(
      ["/dashboard", location.pathname].filter(
        (path, index, paths) => paths.indexOf(path) === index,
      ),
    );
  };

  const handleCloseAll = () => {
    setOpenPaths(["/dashboard"]);
    navigate("/dashboard");
  };

  return (
    <div className="flex h-10 shrink-0 items-center border-b bg-header text-header-foreground">
      <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-[18px]">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          const isPreviousActive =
            index > 0 && location.pathname === tabs[index - 1].path;
          const isPreviousHovered =
            index > 0 && hoveredTab === tabs[index - 1].path;
          return (
            <Fragment key={tab.path}>
              {index > 0 && (
                <div
                  className={cn(
                    "h-5 w-px shrink-0 bg-border",
                    (isActive ||
                      isPreviousActive ||
                      hoveredTab === tab.path ||
                      isPreviousHovered) &&
                      "invisible"
                  )}
                  aria-hidden="true"
                />
              )}
              <div
                onMouseEnter={() => setHoveredTab(tab.path)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "group flex h-10 shrink-0 items-center rounded-md border border-transparent",
                  isActive
                    ? "border-primary/10 bg-primary/10 text-primary"
                    : "hover:bg-muted",
                )}
              >
                <Link
                  to={tab.path}
                  className={cn(
                    "flex h-full items-center gap-1.5 px-2.5 font-normal",
                    SHELL_FONT_SIZE,
                  )}
                >
                  <Icon className="size-3.5 shrink-0 group-hover:animate-tab-icon-pop" />
                  <span>{tab.title}</span>
                </Link>
                {!tab.pinned ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-1 size-4 [&_svg]:size-3 hover:bg-transparent hover:text-inherit"
                    onClick={() => handleClose(tab.path)}
                    aria-label={`关闭${tab.title}`}
                  >
                    <IconX />
                  </Button>
                ) : null}
              </div>
            </Fragment>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center border-l px-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={() => window.location.reload()}
          aria-label="刷新当前页面"
        >
          <IconRefresh />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              aria-label="页签操作"
            >
              <IconDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleCloseOthers}>
                关闭其他页签
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCloseAll}>
                关闭全部页签
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
