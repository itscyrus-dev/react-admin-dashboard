import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Clock3, CreditCard, Download, Eye, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/auth";

interface Metric {
  title: string;
  value: string;
  totalLabel: string;
  totalValue: string;
  icon: LucideIcon;
}

interface TrafficPoint {
  label: string;
  visits: number;
  conversions: number;
}

const metrics: Metric[] = [
  {
    title: "用户量",
    value: "2,000",
    totalLabel: "总用户量",
    totalValue: "120,000",
    icon: Users,
  },
  {
    title: "访问量",
    value: "20,000",
    totalLabel: "总访问量",
    totalValue: "500,000",
    icon: Eye,
  },
  {
    title: "下载量",
    value: "8,000",
    totalLabel: "总下载量",
    totalValue: "120,000",
    icon: Download,
  },
  {
    title: "使用量",
    value: "5,000",
    totalLabel: "总使用量",
    totalValue: "50,000",
    icon: Clock3,
  },
];

const dailyTraffic: TrafficPoint[] = [
  { label: "06:00", visits: 400, conversions: 120 },
  { label: "07:00", visits: 1600, conversions: 240 },
  { label: "08:00", visits: 5200, conversions: 600 },
  { label: "09:00", visits: 16000, conversions: 2600 },
  { label: "10:00", visits: 33000, conversions: 5200 },
  { label: "11:00", visits: 55000, conversions: 8800 },
  { label: "12:00", visits: 64000, conversions: 20000 },
  { label: "13:00", visits: 33000, conversions: 4200 },
  { label: "14:00", visits: 18000, conversions: 1100 },
  { label: "15:00", visits: 36000, conversions: 12500 },
  { label: "16:00", visits: 70000, conversions: 22000 },
  { label: "17:00", visits: 42000, conversions: 11000 },
  { label: "18:00", visits: 23000, conversions: 2500 },
  { label: "19:00", visits: 13000, conversions: 1800 },
  { label: "20:00", visits: 8000, conversions: 900 },
  { label: "21:00", visits: 4200, conversions: 420 },
  { label: "22:00", visits: 1800, conversions: 180 },
  { label: "23:00", visits: 800, conversions: 90 },
];

const monthlyTraffic: TrafficPoint[] = [
  { label: "1月", visits: 360000, conversions: 86000 },
  { label: "2月", visits: 420000, conversions: 105000 },
  { label: "3月", visits: 390000, conversions: 92000 },
  { label: "4月", visits: 520000, conversions: 140000 },
  { label: "5月", visits: 610000, conversions: 180000 },
  { label: "6月", visits: 570000, conversions: 160000 },
  { label: "7月", visits: 690000, conversions: 215000 },
  { label: "8月", visits: 740000, conversions: 236000 },
  { label: "9月", visits: 680000, conversions: 201000 },
  { label: "10月", visits: 820000, conversions: 268000 },
  { label: "11月", visits: 760000, conversions: 245000 },
  { label: "12月", visits: 910000, conversions: 304000 },
];

const visitCountData = [
  { subject: "网页", visits: 76, trend: 58 },
  { subject: "移动端", visits: 94, trend: 72 },
  { subject: "平板", visits: 48, trend: 62 },
  { subject: "客户端", visits: 88, trend: 51 },
  { subject: "第三方", visits: 62, trend: 78 },
  { subject: "其他", visits: 42, trend: 55 },
];

const trafficSourceData = [
  { source: "search", value: 38, fill: "var(--color-search)" },
  { source: "direct", value: 24, fill: "var(--color-direct)" },
  { source: "email", value: 21, fill: "var(--color-email)" },
  { source: "ads", value: 17, fill: "var(--color-ads)" },
];

const regionData = [
  { region: "east", value: 86, fill: "var(--color-east)" },
  { region: "south", value: 72, fill: "var(--color-south)" },
  { region: "north", value: 58, fill: "var(--color-north)" },
  { region: "west", value: 44, fill: "var(--color-west)" },
];

const trafficChartConfig = {
  visits: { label: "访问量", color: "hsl(var(--chart-1))" },
  conversions: { label: "转化量", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

const visitCountChartConfig = {
  visits: { label: "访问", color: "hsl(var(--chart-1))" },
  trend: { label: "趋势", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

const sourceChartConfig = {
  search: { label: "搜索引擎", color: "hsl(var(--chart-1))" },
  direct: { label: "直接访问", color: "hsl(var(--chart-2))" },
  email: { label: "邮件营销", color: "hsl(var(--chart-3))" },
  ads: { label: "联盟广告", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

const regionChartConfig = {
  east: { label: "华东", color: "hsl(var(--chart-1))" },
  south: { label: "华南", color: "hsl(var(--chart-2))" },
  north: { label: "华北", color: "hsl(var(--chart-3))" },
  west: { label: "西部", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.icon;

  return (
    <Card className="admin-card-shadow">
      <CardHeader className="flex-row items-start justify-between gap-4 p-4 pb-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <CardDescription>{metric.title}</CardDescription>
          <CardTitle className="text-2xl leading-8 tabular-nums tracking-tight">
            {metric.value}
          </CardTitle>
        </div>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="size-4" />
        </span>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="flex items-center justify-between gap-4 border-t pt-3 text-xs">
          <span className="text-muted-foreground">{metric.totalLabel}</span>
          <span className="font-medium tabular-nums">{metric.totalValue}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function TrafficTrendChart({ data }: { data: TrafficPoint[] }) {
  return (
    <ChartContainer
      config={trafficChartConfig}
      className="aspect-auto h-[320px] w-full"
      role="img"
      aria-label="访问量与转化量趋势图"
    >
      <AreaChart accessibilityLayer data={data} margin={{ left: 0, right: 12 }}>
        <defs>
          <linearGradient id="visits-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-visits)" stopOpacity={0.48} />
            <stop offset="95%" stopColor="var(--color-visits)" stopOpacity={0.04} />
          </linearGradient>
          <linearGradient id="conversions-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-conversions)" stopOpacity={0.45} />
            <stop offset="95%" stopColor="var(--color-conversions)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} minTickGap={24} />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={44}
          tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="visits"
          type="monotone"
          fill="url(#visits-gradient)"
          stroke="var(--color-visits)"
          strokeWidth={2}
        />
        <Area
          dataKey="conversions"
          type="monotone"
          fill="url(#conversions-gradient)"
          stroke="var(--color-conversions)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

function TrafficTrendCard() {
  return (
    <Card className="admin-card-shadow">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg leading-7 tracking-normal">流量趋势</CardTitle>
        <CardDescription className="text-xs">查看不同时段的访问量和转化量变化。</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <Tabs defaultValue="daily">
          <TabsList className="h-8 p-0.5">
            <TabsTrigger value="daily" className="h-7 px-3 py-1 text-xs">
              流量趋势
            </TabsTrigger>
            <TabsTrigger value="monthly" className="h-7 px-3 py-1 text-xs">
              月访问量
            </TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            <TrafficTrendChart data={dailyTraffic} />
          </TabsContent>
          <TabsContent value="monthly">
            <TrafficTrendChart data={monthlyTraffic} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function VisitCountCard() {
  return (
    <Card className="admin-card-shadow">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg leading-7 tracking-normal">访问数量</CardTitle>
        <CardDescription className="text-xs">不同终端的访问表现对比。</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <ChartContainer
          config={visitCountChartConfig}
          className="aspect-auto h-[280px] w-full"
          role="img"
          aria-label="不同终端访问数量雷达图"
        >
          <RadarChart accessibilityLayer data={visitCountData} outerRadius="70%">
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" tickLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Radar
              dataKey="trend"
              fill="var(--color-trend)"
              fillOpacity={0.2}
              stroke="var(--color-trend)"
            />
            <Radar
              dataKey="visits"
              fill="var(--color-visits)"
              fillOpacity={0.5}
              stroke="var(--color-visits)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function TrafficSourceCard() {
  return (
    <Card className="admin-card-shadow">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg leading-7 tracking-normal">访问来源</CardTitle>
        <CardDescription className="text-xs">各来源渠道占全部访问的比例。</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <ChartContainer
          config={sourceChartConfig}
          className="aspect-auto h-[280px] w-full"
          role="img"
          aria-label="访问来源占比环形图"
        >
          <PieChart accessibilityLayer>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={trafficSourceData}
              dataKey="value"
              nameKey="source"
              innerRadius={54}
              outerRadius={86}
              paddingAngle={3}
              strokeWidth={0}
            >
              {trafficSourceData.map((entry) => (
                <Cell key={entry.source} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="source" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function RegionSourceCard() {
  return (
    <Card className="admin-card-shadow">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg leading-7 tracking-normal">地区来源</CardTitle>
        <CardDescription className="text-xs">主要业务区域的访问热度。</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <ChartContainer
          config={regionChartConfig}
          className="aspect-auto h-[280px] w-full"
          role="img"
          aria-label="主要业务区域访问热度径向图"
        >
          <RadialBarChart
            accessibilityLayer
            data={regionData}
            innerRadius="26%"
            outerRadius="92%"
            startAngle={90}
            endAngle={-270}
          >
            <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="region" />} />
            <RadialBar dataKey="value" background cornerRadius={8} />
            <ChartLegend content={<ChartLegendContent nameKey="region" />} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-label="正在加载分析页">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Skeleton key={metric.title} className="h-36 w-full" />
        ))}
      </div>
      <Skeleton className="h-[408px] w-full" />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <Skeleton className="h-[368px] w-full" />
        <Skeleton className="h-[368px] w-full" />
        <Skeleton className="h-[368px] w-full" />
      </div>
    </div>
  );
}

export function DashboardPage() {
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const [canViewAnalytics, setCanViewAnalytics] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkAnalyticsPermission = async () => {
      const allowed = await hasPermission("/dashboard", "GET");
      if (!cancelled) setCanViewAnalytics(allowed);
    };

    void checkAnalyticsPermission();
    return () => {
      cancelled = true;
    };
  }, [hasPermission]);

  if (canViewAnalytics === null) {
    return <DashboardSkeleton />;
  }

  if (!canViewAnalytics) {
    return (
      <Card className="admin-card-shadow mx-auto max-w-xl">
        <CardHeader>
          <CardTitle>无法访问分析页</CardTitle>
          <CardDescription>
            当前账号没有查看分析数据的权限，请联系管理员为账号分配相应角色。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3 text-sm text-muted-foreground">
          <CreditCard className="size-5" />
          <span>所需权限：GET /dashboard</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <section aria-label="核心指标" className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} metric={metric} />
        ))}
      </section>

      <section aria-label="流量趋势">
        <TrafficTrendCard />
      </section>

      <section aria-label="辅助分析" className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <VisitCountCard />
        <TrafficSourceCard />
        <RegionSourceCard />
      </section>
    </div>
  );
}
