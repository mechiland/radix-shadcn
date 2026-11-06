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
