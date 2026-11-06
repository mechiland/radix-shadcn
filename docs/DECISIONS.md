# 工程决策

- 当前空工作区在 Linux 路径，用户给出的 macOS 路径不存在；使用当前 checkout，无原有应用被覆盖，无适用 AGENTS.md。
- React + TypeScript + Vite + Tailwind v4，官方 `shadcn@4.23.0 init --base base --preset nova` 和 `add --all --yes` 获取本地源码。所有直接依赖精确版本与 package-lock.json 锁定。TypeScript 固定 5.9.3，以使用其公开编译器 API 分析 registry 依赖；没有修改 CLI。
- 官网和 registry 直接共享 src/components/ui 与 src/lib/theme。交互保持 shadcn 组合 API，以扩展 variants/scale/data attributes 迁移设计；不实现 Radix API 替换层。
- Radix Colors 12 阶及 alpha 12 阶是数据源。accent、gray、surface、space、radius、typography、shadow、motion 再映射到 shadcn semantic tokens；`--primary` 是强调色 9，`--accent` 是中性轻交互面。明亮强调色采用固定 Radix contrast 前景。
- 缩放通过 --scaling、--space-*、字体和组件尺寸计算实现，没有页面 zoom/transform。圆角区分按钮 full、输入框、卡片、thumb 和弹层。
- Portal 使用 Base UI 的公开 container 属性，由 Theme 内的 portal host 和 React context 传递；嵌套主题有独立 host，局部主题弹层不会退回 body 默认色。
- CLI 原始 command 使用 cmdk，间接带入 Radix Dialog。已替换成 Base Autocomplete inline + Base Dialog 的组合；不重写键盘/焦点行为。当前生产与干净消费者依赖树只有 @radix-ui/colors，没有 @radix-ui/react-*。
- Tooltip 在固定版本的本地模板缺少描述关联；通过公开 role/id/aria-describedby 与 React useId 补齐，不读取或依赖库生成的 ID。Tabs.List 通过公开 activateOnFocus 匹配原版自动激活。
- 组件生命周期采用 Base data-starting-style/data-ending-style 和 CSS transitions；Dialog 200ms enter / 100ms exit / overlay 160ms exit；Tooltip 700ms delay / 140ms enter。Base Select 首次交互后保留隐藏 DOM，测试验证它的退出帧和最终隐藏，不能错误要求物理移除。
- Registry 单组件 JSON 打包其传递源码和主题文件，避免固化 localhost、未来域名或假设已注册 namespace。registryDependencies 为显式空数组，因为本地闭包文件已包含；npm dependencies 单独精确声明。整体入口为 registry:base，主题入口 registry:theme，组件 registry:ui。使用官方 build/schema。
- registry 文件 target 使用 @ui/@lib/@hooks 公共占位符，已在非默认别名消费者中验证。Theme 自动导入同目录 CSS；显式 CSS import 也可使用。资源仅需系统字体及安装的颜色包。
- create 页面保留官方组件结构和示例内容，原七列画布在此站改为响应式 1–3 列。无 Radix 对应的组件/组合统一标注为风格扩展。没有仿制生成器、帐号或付费服务。
- 示例中的无处理器操作增加明确的本地演示反馈，不覆盖原有事件或 Base 焦点行为；复制、下载、表单提交和文件选择有具体效果。聊天例子使用官方 scripted mock transport，不连接模型服务。日期固定为 2026-11-06，图表为本地数据；波形噪声使用确定性正弦函数。
- 不允许用时间作为裁剪理由。清单中未删除任何行；目前没有功能范围裁剪项。Base 的弹层定位/滚动策略与 Radix 不同，作为适配差异保留证据，绝不称像素完全相同。

- 完整 68 页扫描后，修复模板的表单/图标命名、真正 listitem、装饰分隔线、Combobox 触发器、Sidebar 列表与嵌套 logo、Command 集合和空状态语义。默认 Gray 列明确使用 HC；普通 gray-9 等原版低对比选择保留供 API/视觉参考，不声称所有原版配色均达 AA。Destructive 语义扩展采用高对比前景与背景色阶。
- Source animations.css 与实际 reference 确认：默认 item-aligned Select 不加动画；Popper 模式 160/100ms，按 side 位移 4px、缩放 .97；Tooltip 140ms 进入、无退出动画。

- 最终视觉复核统一修正 Radio fixture 的水平布局；Select 对照放在距顶部相同的稳定区域，碰撞边界行为另以交互检查。卡片的选取材质 token 保留在 card-material.css；Ghost IconButton、Em/Quote 行高、Blockquote 缩进及 Select 指示器使用共享规则。
- Tabs 的默认分段样式由公开 Tabs.Indicator 及 active-tab CSS variables 驱动，不读 DOM 几何自行定位。TabNav 与 Link 进入共享源码，Code 视图按真实适配关系读取源码。
- 附件示例使用声明式 React context/state 移除和恢复；仅演示包装携带本地反馈，不污染 registry 组件。补齐原模板 Card/OTP 的表单关联，以及本地表单的字段名称和 submit 类型。片段/示例占位链接提供明确反馈，不跳走当前 Playground。

## 第二轮像素修正（2026-11-06）

- 层叠顺序：按钮的基础/变体样式移入 `@layer components`，使用者 `className` 中的 Tailwind utilities（`justify-start`、`w-12`、`rounded-full`、`absolute`…）按 shadcn 语义覆盖 Radix 默认值；站点元素重置移入 `@layer base`，不再压过组件的 `text-sm`。Button 允许调用方覆盖 `data-slot`（carousel/dialog 的按钮因此能被主题识别）。
- 字号：主题根与 `.radix-themes` 一致（16px/1.5、antialiased）；shadcn 容器 Card、TabsContent、Popover、HoverCard、Dialog 描述统一为 text-sm = Radix size 2（14px/20px），Card 标题为 Heading size 3。Radix 中这些容器继承 16px，因此组件页的 Card/AlertDialog/Tabs/HoverCard 对照图会出现 14 vs 16 的文字差异，这是为 shadcn 语法和正文统一做的有意取舍。Radix 首页 Showcase 在其范围内恢复 Radix 的继承。
- Text/Link：未指定 size/color 时继承（与 Radix 相同）；Text 应用对应字号的 letter-spacing；彩色文字里的无色 Link 为 accent-12 并常显下划线；新增 `underline="hover"`。
- Ghost 按钮：独立使用时保留 Radix 的负 margin 修边；在 shadcn 组合组件（Calendar、Pagination、InputGroup、ButtonGroup、Sidebar、Carousel 等）内恢复为普通盒子，避免 hover/选中溢出与重叠。Ghost 文字按钮为 regular 字重；带显式尺寸的图标（Radix icons、`size-*`）不再被强制改为 16px。
- Tabs/TabNav：采用 Radix 的“可见标签 + 隐藏的 medium 字重标签”结构，选中不再改变宽度；下划线 Tabs 使用 Radix 内层 hover 底色与 2px 指示条；新增竖排分段样式。
- 灰色强调色：`color="gray"` 跟随主题灰阶（slate、mauve…），与 Radix 相同。
- shadcn 扩展组件的 Radix 化：ButtonGroup 相邻无缝；Calendar 格子内 hover/选中、导航垂直居中；Command 重写为 TextField 搜索 + 32px 菜单项 + 实心强调色高亮；Combobox/InputGroup 焦点环画在整组上；NativeSelect/Select 使用 Radix 9px 实心箭头并为其预留空间；Tooltip 内 Kbd 为半透明反色；Slider 默认 surface 变体；InputGroup 支持 `variant="soft"`。
- Examples 页按 shadcn/create 的 nova 结构渲染（`style-nova` 变体生效，包括 Portal 内容），宽度不足时横向滚动而不是压缩。主题面板在所有宽度下都可展开/收起。
- Showcase：radix-ui.com 首页的 6 个展示（Dashboard/Ecommerce/Music × 亮/暗）。原版位于 `reference/src/home/`（`?home=<id>`），移植版位于 `src/showcase/`（`#showcase/<id>`，独立渲染 `?showcase=<id>`，`&bg=0` 去掉背景）。图片本地化到 `public/images/radix-home/`；图标以内联 SVG 复制，主应用不依赖 `@radix-ui/react-icons`。2000px 宽、无背景时与原版的像素差异：Dashboard 0.02%，Music 约 1.3%，Ecommerce 约 1.8%。
