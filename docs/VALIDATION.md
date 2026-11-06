# 验收与证据

所有验证针对固定参考和当前共享源码。`reference/` 为独立 npm 项目；生产路径不导入 Radix Themes。

| 项目 | 方法与证据 |
|---|---|
| 原始覆盖 | inventory.json 固定 45 个 Radix 区段、68 个 create 页面；coverage.json 保留每行，含 531 个命名子场景/卡片 |
| 入口巡检 | `node tests/smoke.mjs`；evidence/smoke.json 逐页记录 113 个页面的内容和控制台/运行时错误 |
| 核心交互（17 项） | `npm test`；evidence/interaction-results.json 与 interaction-report/index.html；键盘、焦点、表单、弹层、主题、移动端、Command/Combobox、Sidebar、原生表单关联/提交、复制源码、附件移除/恢复/下载、只读与 HC 状态、Select 两种定位模式 |
| 主题覆盖 | 71 次配置检查，覆盖全部 26 强调色、7 灰阶选项、2 appearance、5 radius、5 scaling、2 panel 材质；evidence/theme-options.json |
| 无障碍 | 核心代表页面和全部 68 个 create 页面（含独立 Sidebar 预览）；evidence/accessibility.json、accessibility-examples.json；WCAG 2 A/AA、2.1 AA 的 serious/critical 结果逐条保留 |
| 原版对照 | `node tests/gallery.mjs`；evidence/gallery/，全部区段浅/深色，另含展开弹层、Select popper 和子菜单 |
| 主题组合视觉 | `npm run test:visual`；evidence/visual/，12 个有说明的代表性组合，含亮色强调色、深色、所有 radius/scaling/material 边界 |
| hover/active/focus | `node tests/states.mjs`；evidence/states/，23 组紧裁切的成对状态截图，保留 focus ring 外围 6px |
| 真实动画 | `node tests/animation.mjs`；evidence/animations/report.json、reference.json，真实 requestAnimationFrame 采样 opacity/transform、退出状态和最终卸载/隐藏 |
| 安装 | `npm run verify:registry`；evidence/registry/installation.json，官方 create-vite + shadcn init/add，单组件/闭包、完整入口、重装、冲突 dry-run、明确覆盖、非默认别名、类型与构建 |
| 安装后交互 | `node tests/consumer.mjs`；evidence/registry/interaction.json 与 installed-consumer.png；对独立生产消费者验证视口、CSS、键盘、Select、Dialog、焦点和 Portal |
| 分发一致性 | `node scripts/audit-distribution.mjs`；evidence/distribution-audit.json，官方 schema、源码字节一致性、target、域名/绝对路径、Radix 交互依赖检查 |
| 生产静态站点 | `node tests/static.mjs`；evidence/static.json、static-subpath.json；生产 HTML/路由、4 个 registry HTTP 端点、控制台与截图；`node tests/subpath.mjs` 使用普通 HTTP 服务将原样 dist 挂在 /nested/，验证安装命令带部署前缀 |

截图规格与容差：

- Chromium 版本、视口、DPR、配置和计算样式写入每份 report.json；默认同机 Linux、sRGB、DPR 1、en-US，双方使用相同系统字体解析。
- gallery 使用组件内容的自然区域而非整页留白；组合 fixture 宽 760px；Radio 双方明确使用相同水平排列，Select 双方位于同样距顶部 100px 的位置，避免将碰撞策略混作静态样式差异；状态测试裁切组件及 6px 外围。参考、实现和 diff PNG 全部保留。
- Pixelmatch `threshold: 0.1, includeAA: false` 固定不变，用于排除细微颜色/抗锯齿噪声，数值只作诊断，不作为“还原百分比”或放宽通过门槛。尺寸、表面、字体、状态与差异图一起检查。
- 截图捕获等待有限动画稳定；gallery 仅在捕获时固定动画帧。交互测试和独立动画采样运行真实动画，不使用全局禁用动画。
- 12 组主题组合是代表矩阵，不是所有排列的穷举；全选项检查是另一个 71 配置检查集。

实际适配与边界：

- 固定原版默认 item-aligned Select 的 `animation-name` 为 none、duration 为 0；本实现对应模式也不添加淡入。Popper Select 则使用 160ms enter / 100ms exit。Select 首次交互后保留隐藏 DOM，最终隐藏而非物理卸载才是正确验收条件。
- Dialog 使用原版 200ms enter / 100ms exit、overlay 160ms exit；Popper 160/100ms、位移方向按实际 side、scale .97；Tooltip 延迟 700ms、进入 140ms，原版无退出动画。Base 的碰撞定位、滚动和异步焦点 guard 策略保持其原生实现。
- 原版普通 gray-9/red-9 白字等选择本身不总达到 WCAG AA 小字号对比度。为保留固定参考，这些基础 variant 没有被悄悄改色；网站默认 Gray 演示列明确采用 HC，应用中的 destructive 语义扩展使用更高对比色阶。不能把本次默认主题的自动扫描结果说成所有原版颜色组合的 AA 认证。
- 命令面板使用 Base Autocomplete 的声明式 items/filteredItems 和原生键盘行为；ItemGroup 保留真正的 list/listitem 包装，装饰分隔线隐藏于可访问性树；额外命名直接写入示例源码，不查询库生成 ID 或修补运行时 DOM。
- 无 Radix 对应的部件为风格扩展。代码高亮使用官方 Shiki high-contrast 主题，并限制 dim token 的透明度；明确保留在扩展组件范围，不伪称 Radix 原版。
- 当前证据是单浏览器、单操作系统验证；保留所有测量差异，无未经测量的“99% 还原”结论。静态网站不连接业务后端，源码中的动作明确为本地演示。

[人工复核记录](VISUAL-REVIEW.md) 说明已修正的区域与仍保留的差异。对照图可通过 evidence/index.html 并排浏览。最终文件哈希及验收状态见 evidence/release.json。Vite 正常报告个别大 chunk（主要为语法高亮页面与首屏依赖）；构建成功，未抬高警告阈值，代码示例按路由延迟加载。

运行验证前需启动主站 5173；视觉验证另需 reference 5174；生产测试另需 preview 4173。`CHROMIUM_PATH` 可指定安装的 Chromium。证据目录里的安装消费者临时路径是验证记录，不会写进 registry 项目。
