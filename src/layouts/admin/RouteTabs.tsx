import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MoreHorizontal, RefreshCw, X } from "lucide-react";
import type { RouteMeta } from "@/config/navigation";
import { getRouteMeta } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface RouteTabsProps {
  availableRoutes: RouteMeta[];
}

export function RouteTabs({ availableRoutes }: RouteTabsProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openPaths, setOpenPaths] = useState<string[]>(["/dashboard"]);
  const availablePaths = useMemo(
    () => new Set(availableRoutes.map((route) => route.path)),
    [availableRoutes]
  );

  useEffect(() => {
    if (!availablePaths.has(location.pathname)) return;
    setOpenPaths((paths) =>
      paths.includes(location.pathname) ? paths : [...paths, location.pathname]
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
    setOpenPaths(["/dashboard", location.pathname].filter((path, index, paths) => paths.indexOf(path) === index));
  };

  const handleCloseAll = () => {
    setOpenPaths(["/dashboard"]);
    navigate("/dashboard");
  };

  return (
    <div className="flex h-8 shrink-0 items-center border-b bg-header text-header-foreground">
      <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <div
              key={tab.path}
              className={cn(
                "flex h-7 shrink-0 items-center rounded-md border border-transparent",
                isActive && "border-primary/10 bg-primary/10 text-primary"
              )}
            >
              <Link
                to={tab.path}
                className="flex h-full items-center gap-1.5 px-2.5 text-xs font-normal"
              >
                <Icon className="size-3.5" />
                <span>{tab.title}</span>
              </Link>
              {!tab.pinned ? (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-1 size-5 hover:bg-primary/10 hover:text-primary"
                  onClick={() => handleClose(tab.path)}
                  aria-label={`关闭${tab.title}`}
                >
                  <X />
                </Button>
              ) : null}
            </div>
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
          <RefreshCw />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-7" aria-label="页签操作">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleCloseOthers}>关闭其他页签</DropdownMenuItem>
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
