# Vben Admin 主题与视觉参考

> 供本项目后续 AI 开发使用。视觉参考来自 Vben Admin 在线“分析页”，技术实现仍统一使用 React、TypeScript、Tailwind CSS 与 shadcn/ui。

## 参考来源与使用原则

- 页面：`https://vben.pro/#/dashboard/analytics`
- 在线构建版本：`5.7.0`
- 采集日期：`2026-08-01`
- 精确值：来自在线构建加载的 `bootstrap-CpoiEN2h.css` 与公开偏好配置。
- 观察值：来自 Chrome 中 1586 × 768 的“分析页”截图，用于记录布局、字号和组件观感。
- 本文是视觉参考快照，不要求复制 Vben 的 Vue 组件、品牌素材或业务数据。

后续开发必须优先使用语义 token，例如 `bg-background`、`bg-card`、`text-foreground`、`text-muted-foreground`、`border-border` 和 `text-primary`。业务组件中不要散落十六进制颜色；十六进制值仅用于阅读和设计核对。

## 整体视觉特征

- 冷中性灰阶配单一高辨识度蓝色强调色，信息密度中等偏高。
- 浅色模式以白色侧栏、白色 Header、白色卡片和浅灰蓝页面画布建立层级。
- 深色模式不是纯黑反相：主背景为深灰蓝，内容画布更深，边框和悬浮态逐级提亮。
- 卡片主要依靠背景差、1px 边框和极轻阴影分层，不使用大面积渐变或强阴影。
- 品牌色、成功色、警告色和图表色在切换亮暗模式时保持色相，主要调整明度、背景和文字对比度。

## 默认主题色

Vben 在线构建的默认主题参数：

| 用途 | CSS 值 | 便于核对的 HEX |
| --- | --- | --- |
| 主色 `primary` | `hsl(212 100% 45%)` | `#006be6` |
| 主色前景 | `hsl(0 0% 98%)` | `#fafafa` |
| 危险色 | `hsl(359.33 100% 65.1%)` | 约 `#ff4e50` |
| 成功色 | `hsl(144 57% 58%)` | 约 `#5bd98d` |
| 警告色 | `hsl(42 84% 61%)` | 约 `#efbd48` |
| 圆角 | `0.5rem` | `8px`（默认根字号下） |

主色在浅色和默认深色模式中保持一致。不要在深色模式把主色改为白色；只有选择 zinc、neutral、slate 等特定内置主题时才可能使用独立的深色主色。

## 浅色语义色

以下为在线构建 `:root` 的精确值：

| Token | HSL / 透明度 | HEX / 说明 | 建议用途 |
| --- | --- | --- | --- |
| `--background` | `0 0% 100%` | `#ffffff` | 默认组件背景 |
| `--background-deep` | `216 20.11% 95.47%` | `#f1f3f6` | 页面主画布、内容区底色 |
| `--foreground` | `210 6% 21%` | `#323639` | 正文、菜单、常规图标 |
| `--card` | `0 0% 100%` | `#ffffff` | 卡片 |
| `--card-foreground` | `222.2 84% 4.9%` | `#020817` | 卡片标题和重点数字 |
| `--popover` | `0 0% 100%` | `#ffffff` | 下拉菜单、Popover |
| `--popover-foreground` | `222.2 84% 4.9%` | `#020817` | 浮层文字 |
| `--muted` | `240 4.8% 95.9%` | `#f4f4f5` | 次级背景、禁用或弱化区域 |
| `--muted-foreground` | `240 3.8% 46.1%` | `#71717a` | 辅助文案、次级标签 |
| `--secondary` | `240 5% 96%` | `#f4f4f5` | 次级按钮背景 |
| `--secondary-foreground` | `240 6% 10%` | `#18181b` | 次级按钮文字 |
| `--accent` | `240 5% 96%` | `#f4f4f5` | Hover、选中项的中性底色 |
| `--accent-dark` | `216 14% 93%` | 浅灰蓝 | 较明显 Hover |
| `--accent-darker` | `216 11% 91%` | 浅灰蓝 | 按下或更强选中态 |
| `--accent-lighter` | `240 0% 98%` | `#fafafa` | 最浅层次背景 |
| `--border` | `240 5.9% 90%` | `#e4e4e7` | 卡片、Header、侧栏边界 |
| `--input` | `240 5.88% 90%` | `#e4e4e7` | 输入框边框 |
| `--input-placeholder` | `217 10.6% 65%` | `#9ca4af` | Placeholder |
| `--input-background` | `0 0% 100%` | `#ffffff` | 输入框背景 |
| `--sidebar` | `0 0% 100%` | `#ffffff` | 左侧导航 |
| `--sidebar-deep` | `0 0% 100%` | `#ffffff` | 侧栏深层区域 |
| `--header` | `0 0% 100%` | `#ffffff` | 顶栏和页签栏 |
| `--overlay` | `0 0% 0% / 45%` | 黑色 45% | Dialog、Sheet 遮罩 |

浅色页面的层级顺序应为：`background-deep` 页面画布 → `background/card/sidebar/header` 白色表面 → `muted/accent` 交互弱背景 → `border` 细边界。

## 深色语义色

以下为在线构建 `.dark` 默认主题的精确值。未重复声明的 `primary` 继续继承主色 `hsl(212 100% 45%)`。

| Token | HSL / 透明度 | HEX / 说明 | 建议用途 |
| --- | --- | --- | --- |
| `--background` | `222.34 10.43% 12.27%` | `#1c1e23` | 组件与卡片基础背景 |
| `--background-deep` | `220 13.06% 9%` | `#14161a` | 页面主画布、内容区底色 |
| `--foreground` | `0 0% 95%` | `#f2f2f2` | 正文和常规图标 |
| `--card` | `222.34 10.43% 12.27%` | `#1c1e23` | 卡片 |
| `--card-foreground` | `210 40% 98%` | `#f8fafc` | 卡片标题和重点数字 |
| `--popover` | `0 0% 14.2%` | `#242424` | 下拉菜单、Popover |
| `--popover-foreground` | `210 40% 98%` | `#f8fafc` | 浮层文字 |
| `--muted` | `240 3.7% 15.9%` | `#27272a` | 次级背景 |
| `--muted-foreground` | `240 5% 64.9%` | `#a1a1aa` | 辅助文案 |
| `--secondary` | `240 5% 17%` | `#29292e` | 次级按钮背景 |
| `--secondary-foreground` | `0 0% 98%` | `#fafafa` | 次级按钮文字 |
| `--accent` | `216 5% 19%` | `#2e3033` | Hover 和选中背景 |
| `--accent-dark` | `240 0% 22%` | `#383838` | 较明显 Hover |
| `--accent-darker` | `240 0% 26%` | `#424242` | 按下或更强选中态 |
| `--accent-lighter` | `216 5% 12%` | 深灰蓝 | 最弱背景层次 |
| `--accent-hover` | `216 5% 24%` | `#3a3d40` | Hover |
| `--border` | `240 3.7% 22%` | `#36363a` | 卡片与区域边界 |
| `--input` | `0 0% 100% / 10%` | 白色 10% | 输入框边框 |
| `--input-background` | `0 0% 100% / 5%` | 白色 5% | 输入框背景 |
| `--input-placeholder` | `218 11% 65%` | 灰蓝 | Placeholder |
| `--sidebar` | `222.34 10.43% 12.27%` | `#1c1e23` | 左侧导航 |
| `--sidebar-deep` | `220 13.06% 9%` | `#14161a` | 侧栏深层区域 |
| `--header` | `222.34 10.43% 12.27%` | `#1c1e23` | 顶栏和页签栏 |
| `--overlay` | `0 0% 0% / 40%` | 黑色 40% | Dialog、Sheet 遮罩 |

深色模式不要使用 `#000` 作为大面积背景。相邻表面的明度差应小而可见：页面画布 `#14161a`，卡片/Header/侧栏 `#1c1e23`，Hover `#2e3033`，边框 `#36363a`。

## 字体与字号

### 字体族

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  "Helvetica Neue",
  Arial,
  "Noto Sans",
  sans-serif,
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "Noto Color Emoji";
```

默认根字号为 `16px`，菜单字号公式为 `calc(var(--font-size-base) * 0.875)`，即默认 `14px`。在线偏好设置会同时更新 `--font-size-base` 和 `--menu-font-size`，因此不要在菜单项内部写死像素字号。

### 字号等级

| 角色 | 字号 / 行高 | 字重 | 用途 |
| --- | --- | --- | --- |
| 极小辅助信息 | `12px / 16px` | `400` | 图表坐标、键盘提示、紧凑说明 |
| 后台主要 UI | `14px / 20px` | `400` 或 `500` | 菜单、面包屑、页签、按钮、表单 |
| 正文基准 | `16px / 24px` | `400` | 页面说明、较宽松表单内容 |
| 小标题 | `18px / 28px` | `600` | 卡片标题 |
| 模块标题 | `20px / 28px` | `600` | 页面内主要模块标题 |
| 指标数字 | `24px / 32px` 起 | `600` 或 `700` | 数据概览核心值 |
| 页面大标题 | `30px / 36px` | `600` | 仅在确有页面标题时使用 |

字重 token 为 `400 / 500 / 600 / 700`。管理后台常规文本使用 `400`，可交互标签和按钮使用 `500`，卡片标题与核心数字使用 `600`；避免让所有标题和菜单都变粗。

## 面包屑规范

Chrome 中的参考页面为“概览 / 分析页”，位于 Header 左侧、侧栏折叠按钮之后。

- 字号：`14px`，行高 `20px`，常规字重 `400`。
- 父级路由：可点击，使用常规前景色或主色；Hover 明确切换到 `text-primary`。
- 当前路由：不可点击，使用 `text-foreground`；不再额外加粗。
- 分隔符：使用 `ChevronRight`，视觉尺寸约 `12px`，颜色使用 `text-muted-foreground`。
- 图标：是否显示由路由元数据和全局偏好控制；显示时约 `14px`，与文字间距 `gap-1.5`。
- 容器：`h-10` 至 `h-12` 内垂直居中，条目间距保持紧凑，不使用胶囊背景。
- 路由变化可使用轻微位移与透明度过渡；Vben 的进入动画为 `400ms cubic-bezier(.76, 0, .24, 1)`，需要同时尊重 `prefers-reduced-motion`。

React/shadcn 建议：使用 `Breadcrumb`、`BreadcrumbList`、`BreadcrumbItem`、`BreadcrumbLink`、`BreadcrumbPage` 和 `BreadcrumbSeparator`，标题来自统一路由元数据，不读取 DOM 文本。

## 主要区域与尺寸节奏

下列为参考页面观察值，允许由统一布局 token 做小幅调整：

| 区域 | 参考值 | 视觉规则 |
| --- | --- | --- |
| 展开侧栏 | 约 `184px` | 白/深灰表面，右侧 1px 边界 |
| 品牌区 | 高约 `42px` | Logo + `16px/600` 产品名 |
| 顶部 Header | 高约 `42px` | 面包屑左、全局操作右，底部 1px 边界 |
| 路由页签栏 | 高约 `32px` | 当前页签使用浅主色背景与主色文字 |
| 页面内边距 | `16px` | 页面统一控制，业务卡片不得自行顶到外壳边缘 |
| 卡片间距 | `12px` 至 `16px` | 同一网格保持一致 |
| 卡片圆角 | `8px` | 跟随 `--radius` |
| 卡片边框 | `1px` | 使用 `border-border` |
| 图标按钮 | `32px` | 使用 ghost/icon 变体并提供 Tooltip |

侧栏当前菜单项在浅色模式使用低透明度主色/浅蓝背景和主色文字；深色模式使用 `accent` 背景配高对比文字或主色图标。当前态必须同时依靠背景与文字/图标变化，不能只改变一个细微色值。

## 图表色系

分析页使用蓝、青绿、青色、淡紫作为稳定的分类色。图表颜色独立于 UI 表面 token，但应从全局 chart token 读取。

```css
--chart-1: 201 94% 52%; /* 主蓝，趋势面积/主系列 */
--chart-2: 173 80% 40%; /* 青绿，第二系列 */
--chart-3: 258 64% 68%; /* 淡紫，分类系列 */
--chart-4: 188 70% 53%; /* 青色，分类系列 */
--chart-5: 36 92% 58%;  /* 橙色，仅作额外强调 */
```

- 面积图填充使用对应图表色的约 `35%–55%` 透明度，描边保持实色。
- 网格线使用 `border`，坐标和图例文字使用 `muted-foreground`。
- 深色模式保持系列色相，适度提高亮度；不要把图表色全部换成 UI 主色。
- 同一业务指标跨页面必须使用同一 chart token。

## shadcn/ui 语义映射

| Vben 语义 | 本项目写法 | 说明 |
| --- | --- | --- |
| `background-deep` | 新增 `--background-deep` + `bg-[hsl(var(--background-deep))]`，或统一封装 `bg-page` | 页面画布专用 |
| `background` | `bg-background` | 常规表面 |
| `foreground` | `text-foreground` | 正文 |
| `card` | `bg-card text-card-foreground` | 卡片 |
| `muted` | `bg-muted text-muted-foreground` | 次级信息 |
| `primary` | `bg-primary text-primary-foreground` | 主按钮、选中状态 |
| `accent` | `bg-accent text-accent-foreground` | Hover、轻选中态 |
| `border` | `border-border` | 统一边界 |
| `header` | 建议新增 `--header` | Header 与页签栏 |
| `sidebar` | 映射现有 `--sidebar-background` | 左侧导航 |

项目当前真正的主题实现入口仍是 `src/styles/globals.css`。若将本文精确值应用到代码，应一次性修改根语义变量和 `.dark` 变量，不要在单个页面通过 `dark:` 补丁模拟主题。

## 可直接采用的变量模板

```css
:root {
  --background: 0 0% 100%;
  --background-deep: 216 20.11% 95.47%;
  --foreground: 210 6% 21%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --primary: 212 100% 45%;
  --primary-foreground: 0 0% 98%;
  --accent: 240 5% 96%;
  --accent-foreground: 240 6% 10%;
  --border: 240 5.9% 90%;
  --input: 240 5.88% 90%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
  --header: 0 0% 100%;
  --sidebar-background: 0 0% 100%;
}

.dark {
  --background: 222.34 10.43% 12.27%;
  --background-deep: 220 13.06% 9%;
  --foreground: 0 0% 95%;
  --card: 222.34 10.43% 12.27%;
  --card-foreground: 210 40% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --accent: 216 5% 19%;
  --accent-foreground: 0 0% 98%;
  --border: 240 3.7% 22%;
  --input: 0 0% 100% / 10%;
  --header: 222.34 10.43% 12.27%;
  --sidebar-background: 222.34 10.43% 12.27%;
}
```

## 后续 AI 开发检查清单

- [ ] 开始 UI 修改前先阅读本文和 `AGENTS.md`。
- [ ] 页面画布、卡片、Header、侧栏使用不同语义表面，不写死白色或纯黑。
- [ ] 浅色与深色由根节点 `.dark` 切换，用户偏好持久化。
- [ ] 菜单和面包屑默认 `14px/20px`，正文基准 `16px/24px`。
- [ ] 面包屑来自路由元数据，当前项不可点击。
- [ ] 颜色、圆角、阴影、间距统一通过 token 管理。
- [ ] 图表使用稳定 chart token，亮暗主题下保持语义一致。
- [ ] 浅色、深色、键盘焦点、Hover、Active 和 Disabled 状态均完成视觉检查。
