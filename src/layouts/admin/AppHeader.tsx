import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconBell,
  IconLifebuoy,
  IconLogout,
  IconMoon,
  IconSearch,
  IconSettings,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import type { User as AuthUser } from "@/types";
import { SHELL_FONT_SIZE, type RouteMeta } from "@/config/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUiPreferences } from "@/hooks/use-ui-preferences";

interface AppHeaderProps {
  currentRoute: RouteMeta;
  availableRoutes: RouteMeta[];
  user: AuthUser | null;
  onLogout: () => void;
}

export function AppHeader({
  currentRoute,
  availableRoutes,
  user,
  onLogout,
}: AppHeaderProps) {
  const navigate = useNavigate();
  const { preferences, updatePreference } = useUiPreferences();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleThemeToggle = () => {
    updatePreference("darkMode", !preferences.darkMode);
  };

  const handleRouteSelect = (path: string) => {
    setCommandOpen(false);
    navigate(path);
  };

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "AD";

  return (
    <header className="sticky top-0 z-20 flex h-11 shrink-0 items-center gap-2 border-b bg-header px-3 text-header-foreground">
      <SidebarTrigger className="size-8" />
      <Separator orientation="vertical" className="h-4" />

      <Breadcrumb className="hidden min-w-0 md:block">
        <BreadcrumbList className={`flex-nowrap ${SHELL_FONT_SIZE}`}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-primary hover:text-primary/80">
              <Link to="/dashboard">{currentRoute.section}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="min-w-0">
            <BreadcrumbPage className="truncate">{currentRoute.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1">
        <Button
          variant="outline"
          className="hidden h-8 min-w-40 justify-start rounded-md bg-background text-xs font-normal text-muted-foreground shadow-none md:flex xl:min-w-52"
          onClick={() => setCommandOpen(true)}
        >
          <IconSearch data-icon="inline-start" />
          <span>搜索页面</span>
          <span className="ml-auto rounded border bg-muted px-1.5 py-0.5 text-[11px]">⌘ K</span>
        </Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 md:hidden"
              onClick={() => setCommandOpen(true)}
              aria-label="搜索页面"
            >
              <IconSearch />
            </Button>
          </TooltipTrigger>
          <TooltipContent>搜索页面</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={handleThemeToggle}
              aria-label={preferences.darkMode ? "切换到浅色主题" : "切换到深色主题"}
            >
              {preferences.darkMode ? <IconSun /> : <IconMoon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{preferences.darkMode ? "浅色主题" : "深色主题"}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="relative size-8" aria-label="通知">
              <IconBell />
              <Badge className="absolute right-0 top-0 size-4 justify-center rounded-full p-0 text-[10px]">
                3
              </Badge>
            </Button>
          </TooltipTrigger>
          <TooltipContent>通知</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 rounded-full" aria-label="用户菜单">
              <Avatar className="size-7">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">{user?.username ?? "Admin"}</p>
                <p className="truncate text-xs leading-none text-muted-foreground">
                  {user?.email ?? "admin@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUser />
                <span>个人资料</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconSettings />
                <span>系统设置</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconLifebuoy />
                <span>帮助中心</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onLogout}>
                <IconLogout />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
        <DialogContent className="overflow-hidden p-0">
          <DialogTitle className="sr-only">全局页面搜索</DialogTitle>
          <DialogDescription className="sr-only">
            输入页面名称并选择要打开的管理后台页面。
          </DialogDescription>
          <Command>
            <CommandInput placeholder="输入页面名称..." />
            <CommandList>
              <CommandEmpty>没有找到匹配页面。</CommandEmpty>
              <CommandGroup heading="页面导航">
                {availableRoutes.map((route) => {
                  const Icon = route.icon;
                  return (
                    <CommandItem key={route.path} onSelect={() => handleRouteSelect(route.path)}>
                      <Icon />
                      <span>{route.title}</span>
                      <CommandShortcut>{route.section}</CommandShortcut>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </header>
  );
}
