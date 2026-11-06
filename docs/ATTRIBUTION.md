# 署名、许可证与资源

- 本仓库沿用原有 LICENSE（MIT），未覆盖原许可。
- Radix Themes 设计规则、选取的字体/间距/圆角/阴影 token 与表面数据：WorkOS / Radix，MIT。[固定源码](https://github.com/radix-ui/themes/tree/1faff10ac26ae17f09944d418c6949b93fc6b566)，许可副本 LICENSE-radix-themes.txt。主题 token 有选择性提取并适配，未将原版整套组件 CSS 加入生产路径。单组件和整套 registry 均携带 lib/theme/NOTICE.txt，包含必要的 WorkOS / shadcn MIT 许可。
- Radix Colors 3.0.0：WorkOS，MIT。[安装与使用](https://www.radix-ui.com/colors/docs/overview/installation)。通过 npm 安装的官方设计数据，生成包含浅深色、实色和透明阶的可复现 palette 文件。
- shadcn/ui 本地组件与 create 示例：shadcn，MIT。[固定源码](https://github.com/shadcn-ui/ui/tree/8a3536678a528cc012b9e62484290e79d0be410f)，许可副本 LICENSE-shadcn.txt。保留示例内容和主要组合并适配到共享主题；stateless 演示操作新增本地反馈。
- Base UI 1.9.0：MUI / Base UI contributors，MIT。用于交互、ARIA、焦点、碰撞定位和 Portal 生命周期。[项目](https://base-ui.com/)。
- Lucide 图标：Lucide contributors，ISC；继承 Feather 部分 MIT。[许可证](https://lucide.dev/license)。用于产品操作与演示图标。
- 图表 Recharts、日期 react-day-picker/date-fns、carousel Embla、OTP input-otp、可调整面板 react-resizable-panels、语法高亮 Shiki/Streamdown、二维码 react-qr-code、toast Sonner：均由官方 shadcn 组件/示例使用，依赖版本和 npm 许可元数据保留于锁文件与各包。它们不替代 Base 的菜单/弹层/表单交互。
- @shadcn/helpers、ai、@ai-sdk/react：仅用于原示例的稳定 scripted mock transport，不连接真实模型或服务，不需要密钥。
- 字体只使用 Radix 系统栈和 local() 别名；没有外部字体请求或打包未经授权的字体文件。
- 示例照片继承固定上游的 Unsplash 图片来源，已下载为本地资源，URL、文件和 SHA-256 在 assets.json。遵守 [Unsplash 许可](https://unsplash.com/license)。GitHub 示例头像同样保留原来源；动态头像/几何头像用项目自制 avatar.svg 回退。Canyon 图片来自原 Radix Playground 的相同 Unsplash URL。
- 所有业务数据来自固定上游示例或本项目本地演示数据；用户、银行余额、发票和设备状态仅作演示。没有真实支付、帐号、业务后端或第三方生成调用。
