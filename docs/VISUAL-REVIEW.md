# 视觉复核记录

固定参考、截图条件、容差和抽样范围见 [VALIDATION.md](VALIDATION.md)。[对照索引](../evidence/index.html) 包含 135 组成对截图及 diff；原始计算样式保留于各 report.json。没有按差异数值设置“通过百分比”，也没有抬高容差。

本轮按区域查看了按钮及状态、Radio、Checkbox、Switch、分段控件、Tab Nav、Select 展开、卡片、Dialog、Popover 和字体样本，并据此修正共享规则：

| 项目 | 已修正 |
|---|---|
| 比较布局 | Radio 两侧统一为显式水平排布；Select 两侧位于相同稳定区域。未用整页留白降低差异 |
| 分段控件 / Tab Nav | 等宽轨道、间距、字体、分隔线、活动状态；公开 Base Indicator 承担滑动，Tab Nav 成为可安装共享组件 |
| 卡片 | 原版选取的材质与阴影设计参数、行高、Ghost 负边距、不同尺寸的圆角 |
| 字体 | Em / Quote 1.25 行高、Blockquote 缩进、Link 共享实现、Tooltip 字距 |
| Select | 项目与标签尺寸、左右留白、指示器位置/颜色、高亮前景；分离默认 item-aligned 与 Popper 动画 |
| 状态 | subtle 按钮焦点环 offset -1px；solid/classic 为 2px；选择控件边缘外焦点环。Classic active 使用原版阴影层次 |
| 独立使用 | 根 Theme 填满视口，嵌套 Theme 保持内容尺寸；安装后的深色视口与 Portal 已实测 |

## 2026-11-09 复核

本轮使用有界面的 macOS Google Chrome 156.0.8078.80 对照 Radix Themes 3.3.0 与 shadcn `base-nova`。像素比较沿用 sRGB、DPR 1、Pixelmatch `threshold: 0.1` 和 `includeAA: false`。上方仓库索引保存的是此前的 Linux 样本。

生产构建的 30 条交互测试全部通过。23 组 hover、按下与键盘焦点截图均为零差异像素。100 组组件与弹层截图中有 57 组为零差异，包括浅暗 Switch、Kbd、Progress 和两种 Select 展开方式。另采集 12 组代表主题及实际动画退出帧。零差异仅指上述 Pixelmatch 设置和对应样本。

| 范围 | 已对齐 |
|---|---|
| Button | Classic 的面层、内阴影、亮暗差异、按下时的 1–2px 内部位移和高对比状态。Solid、Soft、Surface、Outline、Ghost 按 hover、展开和按下分别使用 Radix 色阶。键盘焦点保留原材质 |
| Checkbox / Switch | Checkbox 三个尺寸的圆角和实心勾选／半选图形。Switch 使用独立轨道与滑块，轨道开关 160/120ms，按下反馈 30ms，滑块 140ms。浅暗主题、各材质和禁用状态分别计算 |
| Select / 输入框 | Select 内收 1px 的焦点环、选中标记和中性灰标签。Text Field 与 Text Area 的软色占位符、焦点环和只读配色 |
| Card / Kbd / Progress / Slider | Card 去除叠加的底板。Kbd 恢复 Radix 字重与深色阴影。Progress 的轨道阴影盖在填充段上方。Slider 对齐软色填充、滑块材质和键盘焦点层 |
| Popover / Hover Card / Tooltip | Popover、Hover Card 默认起始对齐并留 8px 间距，Hover Card 悬停开关延迟 200/150ms。Popper 进出共享缓动曲线。Tooltip 仅延迟悬停打开时播放 140ms 入场，键盘打开和退出即时完成 |

## 剩余差异

| 组件或场景 | 观察到的差异与原因 |
|---|---|
| Select / 菜单 / Hover Card 靠近视口边缘 | Base UI 与 Radix 的碰撞、翻转、滚动箭头和焦点迁移由各自原语管理。相同位置的指针在 item-aligned Select 展开时可能命中不同的选项，短暂高亮也可能不同。Popover 和 Hover Card 已通过公开属性对齐默认间距与碰撞留白 |
| Dialog / Alert Dialog | Base 管理焦点锁、回焦和退出挂载。Radix 把滚动壳包在 overlay 中，Base 适配使用独立 backdrop 和固定居中的 popup。长内容、窄视口和滚动位置可能不同。Alert Dialog 的 shadcn 描述为 14px/20px，参考为 16px/24px，当前弹层样本分别约 177px 与 185px 高 |
| Card / Tabs / Hover Card / Inset | Card 与 Tabs 的 shadcn 正文沿用 14px/20px，Radix 普通内容继承 16px/24px。Card 双行样本相差 8px，Tabs 单行正文相差 4px。Inset 通过 CardContent 槽位构建。Hover Card 样本的容器行盒和裸链接仍受各自排版与 Tailwind Preflight 影响 |
| 输入框 | 本地 Input/textarea 直接绘制背景和焦点环。Radix Text Field 的外层 wrapper 绘制材质，内部 input 的边界、文字缩进与 size 2 的 0.5px 下内边距独立计算。占位符基线、系统自动填充与日期控件仍可能有差异 |
| Slider / Segmented Control | Slider 的拖动和端点映射使用 Base UI 的 `thumbAlignment="edge"`，内部命中区域由 Base 管理。分段样式使用 Base Tabs 的 indicator 和 tab 语义，Radix 使用单选 Toggle Group。100ms 动效相同，指示条的测量方式、箭头键语义和快速连续切换的中间帧可能不同 |
| 弹层动画中断 | 正常完成的时长和变换按上游设置。Radix 使用 CSS keyframes，Base 适配使用状态驱动的 CSS transitions 来保留退出生命周期。中途反向开关时，Base 从当前插值位置折返，逐帧轨迹可能不同 |
| 图标、组合和平台 | Checkbox 与 Select 的内部勾选已换成 Radix 图形，产品图标仍由调用方提供，部分菜单保留 Lucide 图形。Ghost 按钮在 ButtonGroup、Calendar 等 shadcn 组合内保留盒模型，防止负边距造成重叠。图表、日期、聊天等扩展没有 Radix Themes 对应组件。截图覆盖当前 Chrome 和代表性主题，跨操作系统字体、Safari、Firefox 和所有主题排列未验证 |

本轮适配的是 `base-nova`。它通过 `render` 与 `data-checked`、`data-popup-open`、`data-starting-style` 等公开状态挂接。shadcn 的 Radix 基座使用 `asChild`、`data-state` 和 Radix Portal 生命周期，需要对应的选择器和组合适配。[shadcn Button](https://ui.shadcn.com/docs/components/base/button) · [Base UI 动画](https://base-ui.com/react/handbook/animation) · [Radix Themes 固定源码](https://github.com/radix-ui/themes/tree/1faff10ac26ae17f09944d418c6949b93fc6b566)

### 复跑有界面浏览器

启动实现与参考站点后，在仓库根目录执行以下命令。`RADIX_EVIDENCE_DIR` 可指定独立目录，保留历史截图。

```sh
export CHROMIUM_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
export RADIX_HEADED=1
export RADIX_EVIDENCE_DIR=/tmp/radix-visual-review
npm test -- --headed
npm run test:gallery
npm run test:states
npm run test:visual
npm run test:animation
node tests/reference-motion.mjs
```
