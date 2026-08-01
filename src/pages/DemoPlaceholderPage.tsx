import { useLocation } from "react-router-dom";
import { getRouteMeta } from "@/config/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function DemoPlaceholderPage() {
  const location = useLocation();
  const meta = getRouteMeta(location.pathname);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{meta.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          这是 {meta.title} 的演示占位页面，用于展示后台导航与路由结构。
        </p>
      </div>
      <Separator />
      <Card className="admin-card-shadow">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg leading-7 tracking-normal">{meta.title}</CardTitle>
          <CardDescription className="text-xs">
            路由路径：{meta.path}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-2 text-sm text-muted-foreground">
          该页面内容尚未实现，可在此接入对应的业务模块。
        </CardContent>
      </Card>
    </div>
  );
}
