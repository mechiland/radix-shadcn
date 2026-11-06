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

仍保留的差异及限制：

- Base UI 采用自己的定位、滚动箭头、碰撞和焦点 guard 策略。靠近视口边缘时，Select 的滚动/定位和 Radix 不相同；不修改内部实现去消除此差异。
- Lucide 的细线 Check/Chevron 与 Radix 的实心小图标形状不同；Checkbox 等紧裁切状态图会放大这些像素差异。Kbd 的细节和 Tab/分段文本的保留宽度仍有细微差异，原图和测量未隐藏。
- Tooltip、菜单、Dialog 等图像只比较稳定状态；真实进入/退出、快速开关、焦点与 reduced motion 另有行为/逐帧证据。不能用稳定截图证明动画已验证。
- 12 组主题组合并非所有选项排列的截图穷举。所有主题选项另有 71 配置 token/几何检查。当前未做 Safari、Firefox 或跨操作系统像素认证。
- create 组合及其专用图表、日期、聊天等组件属于风格扩展，没有对应的 Radix 原版整页可进行 1:1 对照。原始盘点的 45 / 68 行均保留，没有以删项实现完成。
