import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth";
import { useEffect, useState } from "react";

const barData = [
  { name: "Product A", sales: 4000, profit: 2400 },
  { name: "Product B", sales: 3000, profit: 1398 },
  { name: "Product C", sales: 2000, profit: 9800 },
  { name: "Product D", sales: 2780, profit: 3908 },
  { name: "Product E", sales: 1890, profit: 4800 },
  { name: "Product F", sales: 2390, profit: 3800 },
];

const lineData = [
  { month: "Jan", visitors: 4000, pageviews: 2400 },
  { month: "Feb", visitors: 3000, pageviews: 1398 },
  { month: "Mar", visitors: 2000, pageviews: 9800 },
  { month: "Apr", visitors: 2780, pageviews: 3908 },
  { month: "May", visitors: 1890, pageviews: 4800 },
  { month: "Jun", visitors: 2390, pageviews: 3800 },
  { month: "Jul", visitors: 3490, pageviews: 4300 },
];

const pieData = [
  { name: "Desktop", value: 400 },
  { name: "Mobile", value: 300 },
  { name: "Tablet", value: 300 },
  { name: "Other", value: 200 },
];

const areaData = [
  { name: "Week 1", users: 4000, sessions: 2400 },
  { name: "Week 2", users: 3000, sessions: 1398 },
  { name: "Week 3", users: 2000, sessions: 9800 },
  { name: "Week 4", users: 2780, sessions: 3908 },
  { name: "Week 5", users: 1890, sessions: 4800 },
  { name: "Week 6", users: 2390, sessions: 3800 },
];

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
];

const CHART_TOOLTIP_STYLE = {
  backgroundColor: "hsl(var(--popover))",
  borderColor: "hsl(var(--border))",
  borderRadius: "var(--radius)",
  color: "hsl(var(--popover-foreground))",
  boxShadow: "0 4px 14px hsl(var(--foreground) / 0.08)",
};

const CHART_AXIS_TICK = {
  fill: "hsl(var(--muted-foreground))",
  fontSize: 12,
};

export function ChartsDemoPage() {
  const { hasPermission } = useAuthStore();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const allowed = await hasPermission("/dashboard/charts", "GET");
      setCanAccess(allowed);
    };
    checkAccess();
  }, [hasPermission]);

  if (!canAccess) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg text-muted-foreground">You don't have permission to view this page</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Charts Demo</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A collection of different chart types using Recharts library.
        </p>
      </div>
      <Separator />

      <Tabs defaultValue="bar" className="flex flex-col gap-3">
        <TabsList className="w-fit">
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          <TabsTrigger value="area">Area Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="bar" className="mt-0">
          <Card className="admin-card-shadow">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg leading-7 tracking-normal">Product Sales & Profit</CardTitle>
              <CardDescription className="text-xs">Bar chart showing sales and profit by product</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData}>
                  <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tick={CHART_AXIS_TICK} tickLine={false} axisLine={false} />
                  <YAxis tick={CHART_AXIS_TICK} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                  <Legend />
                  <Bar dataKey="sales" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line" className="mt-0">
          <Card className="admin-card-shadow">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg leading-7 tracking-normal">Website Traffic</CardTitle>
              <CardDescription className="text-xs">Line chart showing visitors and pageviews over time</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={lineData}>
                  <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" tick={CHART_AXIS_TICK} tickLine={false} axisLine={false} />
                  <YAxis tick={CHART_AXIS_TICK} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" stroke="hsl(var(--chart-1))" strokeWidth={2} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="pageviews" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="mt-0">
          <Card className="admin-card-shadow">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg leading-7 tracking-normal">Device Distribution</CardTitle>
              <CardDescription className="text-xs">Pie chart showing user device types</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="hsl(var(--chart-1))"
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="area" className="mt-0">
          <Card className="admin-card-shadow">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg leading-7 tracking-normal">User Activity</CardTitle>
              <CardDescription className="text-xs">Area chart showing users and sessions over weeks</CardDescription>
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-0">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={areaData}>
                  <CartesianGrid stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tick={CHART_AXIS_TICK} tickLine={false} axisLine={false} />
                  <YAxis tick={CHART_AXIS_TICK} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                  <Legend />
                  <Area type="monotone" dataKey="users" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.42} />
                  <Area type="monotone" dataKey="sessions" stackId="1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.4} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
