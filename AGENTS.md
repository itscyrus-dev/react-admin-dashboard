# AGENTS.md

## 项目概述

通用管理后台（Admin Dashboard）模板，基于现代前端技术栈构建，旨在为各类中后台项目提供开箱即用的基础设施与开发规范。

## 技术栈

- **框架**: React 18+
- **语言**: TypeScript
- **构建工具**: Vite
- **UI 组件**: shadcn/ui（基于 Radix UI + Tailwind CSS）
- **包管理器**: pnpm
- **代码规范**: ESLint + Prettier（建议）

## 项目结构

```text
src/
├── components/          # 全局通用组件
│   └── ui/             # shadcn/ui 组件（勿手动修改，通过 CLI 管理）
├── pages/              # 页面/视图层
├── layouts/            # 布局组件（侧边栏、头部等）
├── router/             # 路由配置
├── hooks/              # 自定义 Hooks
├── lib/                # 工具函数与第三方库封装
├── services/           # API 请求与数据层
├── store/              # 状态管理（如 Zustand / Redux Toolkit）
├── types/              # TypeScript 类型定义
├── assets/             # 静态资源
└── styles/             # 全局样式与 Tailwind 配置
```

## 开发规范

### 组件开发
- 使用 **函数组件** + **Hooks**，禁止使用 Class 组件。
- 组件命名使用 **PascalCase**，文件名与组件名保持一致。
- 优先使用 shadcn/ui 组件；自定义组件需保持无状态或状态最小化。
- 事件处理函数命名以 `handle` 开头，如 `handleClick`、`handleSubmit`。

### 类型安全
- 避免使用 `any`，优先使用 `interface` 或 `type` 明确定义。
- API 响应数据必须定义类型，禁止直接操作未定义类型的数据。
- 组件 Props 必须显式定义类型，导出供外部复用。

### 样式规范
- 优先使用 Tailwind CSS 原子类；复杂样式使用 `clsx` 或 `tailwind-merge` 合并。
- 避免内联 `style`，除非动态计算必要。
- 遵循移动优先（Mobile First）响应式设计。

### 状态管理
- 局部状态使用 `useState` / `useReducer`。
- 跨组件状态使用 Context 或轻量级状态库（推荐 Zustand）。
- 服务端状态使用 TanStack Query（React Query）或 SWR。

### 路由与代码分割
- 使用 React Router v6+。
- 路由组件使用 `React.lazy` + `Suspense` 进行代码分割。
- 路由路径使用 kebab-case，如 `/user-management`。

## 管理后台页面布局规范

本节以 Vben Admin 的“分析页”为信息架构参考，约束后续 AI 开发时的页面布局、组件边界和视觉一致性。参考其成熟的后台组织方式，但不复制 Vue 实现、品牌资源或具体业务数据；本项目统一使用 React、TypeScript、React Router、shadcn/ui 和 Tailwind CSS。

### 设计定位

- 页面类型：桌面优先、移动端可用的通用管理后台。
- 使用人群：需要高效浏览数据、切换模块和执行操作的运营或管理人员。
- 视觉风格：克制、清晰、中等偏高信息密度；浅色中性背景配单一品牌强调色。
- 设计目标：稳定的信息层级优先于装饰效果，交互反馈优先于复杂动画。
- 不使用玻璃拟态、霓虹外发光、大面积渐变、无意义动效或过度悬浮卡片。

### 页面整体骨架

```text
AdminAppShell
├── AppSidebar                 # 左侧主导航，桌面固定，支持折叠
│   ├── Brand                 # Logo + 产品名称
│   ├── SidebarNav            # 分组菜单、二级菜单、权限过滤
│   └── SidebarFooter         # 折叠按钮或辅助信息
└── MainShell
    ├── AppHeader             # 顶部工具栏，固定在主内容顶部
    │   ├── SidebarTrigger
    │   ├── Breadcrumbs
    │   ├── GlobalSearch
    │   └── HeaderActions     # 主题、语言、通知、全屏、用户菜单等
    ├── RouteTabs             # 已打开页面页签，位于 Header 下方
    └── ContentViewport       # 唯一主要纵向滚动区域
        └── PageContainer
            └── Outlet        # React Router 子路由页面
```

布局关系必须满足：

- `AppSidebar` 与 `MainShell` 并列，侧栏不参与主内容区滚动。
- `AppHeader` 和 `RouteTabs` 在主区域顶部保持可见，层级明确且不遮挡弹层。
- `ContentViewport` 是页面主要滚动容器，避免卡片内部再出现无必要的纵向滚动。
- `PageContainer` 统一控制页面内边距和模块间距，业务页面不得自行改变整个应用外壳。
- 页面背景使用 `bg-muted/30` 或等价语义主题色，卡片使用 `bg-card`，不直接写死白色或 Slate 色值。

### 桌面端尺寸与节奏

参考值用于保持一致性，可通过主题 token 统一调整：

| 区域 | 建议尺寸 | 说明 |
| --- | --- | --- |
| 展开侧栏 | `w-56` 至 `w-64` | 菜单文字完整显示 |
| 折叠侧栏 | `w-16` | 仅显示图标，菜单项必须有 Tooltip |
| 顶栏 | `h-14` 至 `h-16` | 面包屑和操作区垂直居中 |
| 页签栏 | `h-10` | 与顶栏分层，支持横向滚动 |
| 页面内边距 | `p-4 lg:p-5 xl:p-6` | 所有页面统一 |
| 模块间距 | `gap-4` 或 `gap-6` | 同一页面只使用一套主要间距 |
| 卡片圆角 | 使用主题 `--radius` | 不在业务页面随意混用圆角 |

### 左侧导航结构

- 顶部品牌区固定显示 Logo 与产品名；折叠状态只显示 Logo。
- 菜单使用“分组标题 + 菜单项 + 可折叠子菜单”的层级，最多建议三级。
- 当前路由项必须有明确的背景、文字和图标状态，不能只依赖颜色细微变化。
- 展开/收起状态由布局层或全局 UI Store 管理，并可持久化；业务页面不得直接控制侧栏。
- 权限过滤在生成导航树时完成，禁止先渲染无权限菜单再隐藏。
- 菜单配置与路由元数据共用稳定的 `id`、`path`、`title`、`icon`、`permission` 字段，避免维护两套不一致的数据。
- 桌面端使用 shadcn/ui `Sidebar`、`Collapsible`、`ScrollArea` 和 `Tooltip` 组合；若项目尚未安装对应组件，先通过 pnpm 的 shadcn CLI 添加。
- 小于 `lg` 时隐藏固定侧栏，使用 `Sheet` 展示移动端导航；点击菜单项后自动关闭。

### 顶部工具栏结构

- 左侧依次放置侧栏折叠按钮和 `Breadcrumb`，面包屑由当前路由元数据生成。
- 中间或靠右放置全局搜索入口，优先表现为 `Command` 快捷入口，支持 `⌘/Ctrl + K`。
- 右侧操作按“全局工具 -> 通知 -> 用户”排序；低频功能进入 `DropdownMenu`，避免堆满图标。
- 所有纯图标按钮使用 `Button` 的 `ghost`/`icon` 变体，并提供可访问名称和 `Tooltip`。
- 用户入口使用 `Avatar`、`AvatarImage`、`AvatarFallback` 与 `DropdownMenu` 组合。
- Header 仅承载全局操作；新增、导出、筛选等页面级操作应放在页面标题区或对应卡片内。

### 多页签导航

- `RouteTabs` 表示已打开的业务路由，不与内容区域中的数据筛选 `Tabs` 混用。
- 当前页签使用强调色或浅色背景；非当前页签保持弱化状态。
- 固定首页不可关闭，其他页签可关闭；关闭当前页签后切换到最近访问的相邻页签。
- 页签过多时横向滚动，并提供刷新、关闭当前、关闭其他等上下文操作。
- 页签标题和唯一键来自路由元数据，禁止从页面 DOM 文本反向推导。
- 若项目暂未实现路由缓存，页签只承担导航作用，不承诺保留组件内部状态。

### 分析页内容组织

Vben 分析页对应的 React 页面应按以下顺序组织：

```text
AnalyticsPage
├── PageHeader                         # 可选：标题、说明、页面级操作
├── MetricGrid                        # 4 个核心指标卡
│   ├── MetricCard: 用户量
│   ├── MetricCard: 访问量
│   ├── MetricCard: 下载量
│   └── MetricCard: 使用量
├── TrafficTrendCard                  # 主趋势区域
│   ├── Tabs: 流量趋势 / 月访问量
│   └── AreaChart                     # 主图占据完整卡片宽度
└── InsightGrid                       # 3 个等权辅助分析卡
    ├── VisitCountCard                # 雷达图或多维比较图
    ├── TrafficSourceDonutCard        # 环形图
    └── TrafficSourceRoseCard         # 玫瑰图或分类占比图
```

具体规则：

- 核心指标优先出现在首屏，桌面端四列，平板两列，手机单列。
- `MetricCard` 只包含标题、当前值、辅助累计值、趋势或语义图标，不塞入复杂操作。
- 主趋势卡独占一行，使用 `Tabs` 切换同类时间维度；`TabsTrigger` 必须位于 `TabsList` 内。
- 辅助图表在 `xl` 为三列，在 `md` 至 `lg` 可为两列，手机为单列。
- 图表卡标题放在 `CardHeader`，图表放在 `CardContent`；必要的说明、图例或操作也归属于明确的 Header/Content/Footer 区域。
- 图表容器必须有稳定高度和宽高约束，使用 `ResponsiveContainer` 或 shadcn `ChartContainer`，避免加载前后布局跳动。
- 页面展示的统计数字如果是模拟数据，必须在数据源或注释中标记为 mock，不得伪装成真实业务指标。

### 推荐组件与文件组织

```text
src/
├── layouts/
│   └── admin/
│       ├── AdminLayout.tsx            # 仅负责应用外壳和 Outlet
│       ├── AppSidebar.tsx
│       ├── AppHeader.tsx
│       ├── RouteTabs.tsx
│       └── MobileSidebar.tsx
├── components/
│   ├── navigation/
│   │   ├── Breadcrumbs.tsx
│   │   ├── GlobalSearch.tsx
│   │   └── UserMenu.tsx
│   ├── dashboard/
│   │   ├── MetricCard.tsx
│   │   ├── MetricGrid.tsx
│   │   ├── TrafficTrendCard.tsx
│   │   └── InsightGrid.tsx
│   ├── charts/
│   │   ├── AreaTrendChart.tsx
│   │   ├── RadarMetricChart.tsx
│   │   ├── SourceDonutChart.tsx
│   │   └── SourceRoseChart.tsx
│   └── ui/                             # shadcn CLI 管理的基础组件
├── config/
│   ├── navigation.ts                  # 菜单树与权限元数据
│   └── routes.ts                      # 路由标题、图标、是否固定页签等
├── pages/
│   └── analytics/
│       ├── AnalyticsPage.tsx          # 只负责页面模块编排
│       ├── analytics.mock.ts          # 开发期模拟数据
│       └── analytics.types.ts
├── services/
│   └── analytics.ts                   # API 调用和响应适配
└── store/
    └── ui.ts                          # 侧栏、主题、路由页签等全局 UI 状态
```

新增文件时遵循以下边界：

- `AdminLayout` 不获取分析页业务数据，不包含业务卡片。
- `AnalyticsPage` 负责请求状态和模块编排，不直接堆叠大段图表配置。
- `MetricCard`、图表组件通过显式 Props 接收数据，不直接读取全局 Store。
- API 原始响应先在 `services` 层转换为页面需要的 ViewModel，再交给组件。
- 菜单与路由元数据放在 `config`，不要硬编码在 Header、Sidebar 或 Breadcrumb 组件中。
- 只有多个页面复用的组件进入 `src/components`；页面私有组件可放在对应页面目录下。

### shadcn/ui 组件映射

| 页面需求 | 优先使用 |
| --- | --- |
| 侧栏导航 | `Sidebar`、`Collapsible`、`ScrollArea`、`Tooltip` |
| 移动端侧栏 | `Sheet` |
| 面包屑 | `Breadcrumb` |
| 全局搜索 | `Command` + `Dialog` |
| 顶栏操作 | `Button`、`DropdownMenu`、`Tooltip` |
| 用户信息 | `Avatar` + `DropdownMenu` |
| 路由页签/图表切换 | `Tabs` |
| 指标与图表容器 | `Card` |
| 图表 | `Chart`/`ChartContainer`，底层可使用 Recharts |
| 状态标识 | `Badge` |
| 加载状态 | `Skeleton` |
| 空状态 | `Empty` |
| 错误提示 | `Alert` |
| 区域分隔 | `Separator` |

使用 shadcn/ui 时必须遵守：

- 先检查 `components.json` 与已安装组件，再决定是否执行 `pnpm dlx shadcn@latest add <component>`。
- 优先组合已有组件和内置 `variant`，不要用普通 `div` 重写已有组件能力。
- `Card` 使用完整语义结构：`CardHeader`、`CardTitle`、`CardDescription`、`CardContent`、`CardFooter` 按需组合。
- 颜色使用 `background`、`foreground`、`card`、`muted`、`primary`、`accent`、`destructive` 等语义 token，禁止在业务组件中散落 `slate-*`、`blue-*` 等硬编码颜色。
- 组件间距使用 `gap-*`，不要使用 `space-x-*` 或 `space-y-*`。
- 条件类名使用 `cn()`；等宽高尺寸使用 `size-*`；截断文本使用 `truncate`。
- 不对 `Dialog`、`Sheet`、`DropdownMenu`、`Popover`、`Tooltip` 等覆盖层手写任意 `z-index`。
- `Dialog`、`Sheet`、`Drawer` 必须包含可访问的 Title，可使用 `sr-only` 隐藏视觉标题。
- `Avatar` 必须包含 `AvatarFallback`；`TabsTrigger` 必须放在 `TabsList` 内。
- 图标统一使用项目已配置的 `@tabler/icons-react`，图标组件以 `Icon` 前缀命名（如 `IconSearch`），类型使用导出的 `Icon` 类型；图标对象直接传给组件，不使用字符串查表。
- 位于 `Button`、`DropdownMenuItem`、`Sidebar` 等 shadcn 组件内部的图标不额外写尺寸类；按钮图标使用 `data-icon="inline-start"` 或 `data-icon="inline-end"`。
- `src/components/ui` 由 shadcn CLI 管理；定制优先通过主题变量、组件变体或外层包装组件完成。

### 主题与视觉规则

主题颜色、浅色/深色表面、字体、字号、面包屑和图表色的详细参考统一记录在 [`VBEN_THEME_REFERENCE.md`](./VBEN_THEME_REFERENCE.md)。后续 AI 在新增或修改 UI 前必须先阅读该文件；若本文与业务组件中的硬编码样式冲突，以语义 token 和该主题参考为准，并将最终实现集中维护在 `src/styles/globals.css`。

- 全局只使用一套冷中性灰阶和一个主强调色，当前建议为低饱和蓝色系。
- 亮暗主题均通过 `src/styles/globals.css` 中的 CSS 变量定义，不在组件内成对堆叠 `dark:` 颜色。
- 卡片依靠边框、背景差和轻微阴影建立层级；同一页面不得混用多套阴影和圆角。
- 数字是分析页第一视觉层级，标题第二，辅助描述第三；辅助文案使用 `text-muted-foreground`。
- 主趋势图颜色与全局强调色协调；多系列图表使用稳定的图表 token，不为每张图随意创造新配色。
- 图标承担识别和状态提示，不使用 Emoji 代替界面图标。
- 动画仅用于侧栏折叠、菜单展开、页签切换和加载反馈，优先使用简短的 `transform`/`opacity` 过渡并尊重 `prefers-reduced-motion`。
- 全局动画统一使用 **Motion**（`motion/react`，即 framer-motion 的后继包）。页面切换/打开使用 `AnimatePresence mode="wait"` + `motion.div`（按路由 key 切换）做淡入/位移过渡；侧栏分组展开/折叠使用 `AnimatePresence` + `motion.div` 的 `height: 0 → auto` 高度动画，并在展开态由 `overflow-hidden` 裁剪。单次动画时长统一 `200ms`、缓动 `easeOut`，不要在各处硬编码不同的动画实现。
- 在 `src/App.tsx` 用 `<MotionConfig reducedMotion="user">` 包裹应用，让 Motion 自动尊重 `prefers-reduced-motion`。

### 响应式规则

| 断点 | 布局行为 |
| --- | --- |
| `< md` | 隐藏固定侧栏，使用 `Sheet`；指标与图表单列；搜索折叠为图标入口；页签横向滚动 |
| `md` 至 `< lg` | 指标两列；辅助图表两列；Header 保留主要操作，低频操作进入菜单 |
| `lg` 至 `< xl` | 显示侧栏；指标四列；辅助图表两列或按可用宽度自适应 |
| `>= xl` | 展开完整侧栏；指标四列；辅助图表三列；主趋势图占满内容宽度 |

- 所有多列布局使用 CSS Grid，不使用复杂的百分比 Flex 计算。
- 图表和表格在窄屏应允许内容简化、横向滚动或隐藏次要信息，禁止压缩到不可读。
- 移动端触控目标不小于 44px；关键操作不能只在 hover 时出现。
- 使用 `min-h-[100dvh]` 构建应用高度，避免移动浏览器地址栏造成跳动。

### 页面状态与可访问性

每个业务页面至少考虑以下状态：

- Loading：使用与最终卡片结构一致的 `Skeleton`，避免只放一个全局 Spinner。
- Empty：使用 `Empty` 说明为什么没有数据，并提供明确的下一步操作。
- Error：使用 `Alert` 或卡片内错误状态，提供重试入口；不要只弹 Toast。
- Forbidden：权限不足时提供清晰说明和返回入口，不渲染部分敏感数据。

可访问性要求：

- 使用语义化的 `aside`、`nav`、`header`、`main` 和正确标题层级。
- 侧栏折叠后，图标菜单必须提供 Tooltip 和可访问名称。
- 所有图标按钮必须有 `aria-label` 或 `sr-only` 文本。
- 键盘可访问侧栏、页签、搜索、用户菜单和卡片操作，焦点样式不可移除。
- 图表不能只依赖颜色区分系列，应提供图例、Tooltip，并为读屏提供简短数据摘要或等价表格。
- 文本和交互控件至少满足 WCAG AA 对比度。

### AI 实现顺序

后续 AI 新增或重构后台页面时，按以下顺序工作：

1. 读取 `AGENTS.md`、`components.json`、现有路由和布局代码。
2. 确认页面属于全局应用外壳、可复用业务组件还是页面私有模块。
3. 先定义路由元数据、菜单权限和 TypeScript 数据类型。
4. 复用或安装需要的 shadcn/ui 基础组件，再创建包装组件。
5. 先完成无数据的响应式结构，再接入 mock 数据与真实服务。
6. 补齐 Loading、Empty、Error、Forbidden 状态。
7. 检查桌面、平板、手机布局以及亮暗主题。
8. 运行 `pnpm type-check` 和 `pnpm build`，确认无调试日志和类型错误。

### 布局验收清单

- [ ] 桌面端侧栏、顶栏、页签栏和内容区层级清晰且互不遮挡
- [ ] 主内容只有一个主要纵向滚动容器
- [ ] 当前菜单、当前页签和面包屑均由同一套路由元数据驱动
- [ ] 指标卡在桌面四列、平板两列、手机单列
- [ ] 主趋势图独占一行，辅助图表按断点组成三列/两列/单列
- [ ] 页面布局组件不直接获取业务数据
- [ ] 业务组件 Props 和 API 响应均有明确 TypeScript 类型
- [ ] 颜色、圆角、阴影、间距使用统一 token
- [ ] shadcn/ui 组件结构和可访问性要求完整
- [ ] Loading、Empty、Error、Forbidden 状态齐全
- [ ] 键盘导航、焦点样式、图表替代说明可用
- [ ] `pnpm type-check` 与 `pnpm build` 通过

## 登录页布局与交互规范

登录页参考 Vben Admin 的居中卡片结构，但只保留本项目实际可用的账号密码登录流程。实现入口为 `src/pages/LoginPage.tsx`，外观设置拆分到 `src/components/auth/LoginAppearanceControls.tsx`，持久化逻辑位于 `src/hooks/use-ui-preferences.ts`。

```text
LoginPageShell
├── LoginHeader
│   ├── Brand                         # 产品图标与名称
│   └── LoginAppearanceControls       # 位置、语言、主题色、亮暗模式
└── LoginMain                         # 根据 position 调整桌面端对齐
    └── LoginCard
        ├── CardHeader                # 欢迎标题与简短说明
        ├── CardContent
        │   └── CredentialForm        # 用户名、密码、错误、提交按钮
        └── CardFooter                # 简短版权信息
```

约束如下：

- 登录主区域使用 `min-h-[100dvh]`；移动端始终居中，`lg` 起允许登录框居左、居中或居右。
- 顶部工具区使用 shadcn/ui `Button` 与 `DropdownMenu` 组合，所有纯图标按钮必须提供 `aria-label` 和 `title`。
- 位置支持 `left`、`center`、`right`；语言支持 `zh-CN`、`en-US`；主题色和亮暗模式统一修改全局语义 token，不在页面组件中硬编码颜色。
- 用户偏好以带版本号的 `admin-ui-preferences:v1` 存入 `localStorage`，应用启动时在 `src/main.tsx` 中恢复，保证进入后台后主题保持一致。
- 表单使用 `Form`、`FieldGroup`、`Field`、`InputGroup` 和 `FieldError`；校验控件同时设置 `data-invalid` 与 `aria-invalid`。
- 密码显隐按钮位于 `InputGroupAddon`，不得用绝对定位覆盖输入框。
- 提交期间禁用登录按钮并显示 `Spinner`；认证失败必须在表单内展示可读错误，不只依赖 Toast。
- 当前登录页不提供手机号登录、扫码登录或其他第三方登录方式，登录按钮下方不得重新加入这三类入口，除非后端已经提供对应认证能力。
- `alice / alice123` 仅是本地 mock 默认值；接入真实认证服务时应清空默认凭据，并保持 `username`、`password` 字段名和顺序稳定。
- 背景氛围只使用基于 `--login-glow` 的轻量径向渐变；不得添加玻璃拟态、装饰性动画或影响表单对比度的图片。

## Git 提交规范（AngularJS Commit Convention）

本项目遵循 [AngularJS Git Commit Message Convention](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)，提交信息必须包含 **Header**、**Body**（可选）、**Footer**（可选）。

### Header 格式
```text
<type>(<scope>): <subject>
```

#### Type（必填）
- **feat**: 新功能（feature）
- **fix**: 修复 Bug
- **docs**: 文档变更
- **style**: 代码格式（不影响代码运行的变动，如空格、格式化、分号等）
- **refactor**: 重构（既不是新增功能，也不是修复 Bug 的代码变动）
- **perf**: 性能优化
- **test**: 增加或修改测试
- **chore**: 构建过程或辅助工具的变动（如依赖更新、配置文件）
- **ci**: CI/CD 相关变更
- **revert**: 回滚提交
- **build**: 构建系统或外部依赖变更（如 webpack、npm）

#### Scope（可选）
影响范围的简要说明，如 `auth`、`router`、`components`、`api`。

#### Subject（必填）
- 使用祈使句，现在时态（如 "change" 而非 "changed" 或 "changes"）
- 首字母小写
- 结尾不加句号

### 示例
```bash
feat(auth): add JWT login functionality
fix(router): fix 404 issue on dynamic route refresh
docs(readme): update deployment documentation
chore(deps): upgrade vite to 5.0.0
refactor(components): optimize table component rendering performance
```

### Body 与 Footer
- **Body**: 详细说明修改动机与对比，每行不超过 100 字符。
- **Footer**: 用于关闭 Issue（如 `Closes #123`）或标记破坏性变更（`BREAKING CHANGE:`）。

## 包管理与脚本

使用 **pnpm** 作为包管理器：

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建产物
pnpm preview

# 添加依赖
pnpm add <package>

# 添加开发依赖
pnpm add -D <package>

# 移除依赖
pnpm remove <package>

# 执行脚本
pnpm <script>
```

## 环境变量

- 使用 `.env` 文件管理环境变量。
- 变量名必须以 `VITE_` 开头才能在客户端代码中访问。
- 敏感信息（如密钥）禁止提交到仓库，使用 `.env.local` 本地覆盖。

## 代码审查清单

提交代码前请自查：
- [ ] 代码通过 TypeScript 类型检查（`pnpm type-check`）
- [ ] 组件具有明确的 Props 类型定义
- [ ] 无 `console.log` 等调试代码
- [ ] 提交信息符合 AngularJS 规范
- [ ] 新功能包含必要的测试（如项目启用测试框架）

## 注意事项

- **shadcn/ui 组件**: 位于 `components/ui` 的代码由 CLI 生成，如需定制请通过 `components.json` 配置或创建包装组件，避免直接修改源文件。
- **路径别名**: 建议使用 `@/` 指向 `src/` 目录，在 `vite.config.ts` 与 `tsconfig.json` 中同步配置。
- **图标**: 使用 `@tabler/icons-react`，图标组件以 `Icon` 前缀命名（如 `IconSearch`），类型使用导出的 `Icon` 类型。

---

*本文件为 AI Agent 与开发者的协作指南，修改项目结构或规范时请同步更新本文档。*
