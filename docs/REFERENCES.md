# 固定参考

参考日期：2026-11-06（Asia/Taipei）。执行起始检查了官方页面、npm 元数据、官方 CLI 和对应 Git 源码；后续固定以下版本，不随上游新增内容扩大范围。

| 参考 | 固定值 | 用途 |
|---|---|---|
| Radix Themes | npm 3.3.0；themes commit `1faff10ac26ae17f09944d418c6949b93fc6b566` | tokens、组件视觉、尺寸和动效研究 |
| Radix 官网 | website commit `402e749613ab2e7ab7139c65b0029842b0360f07`；package.json 使用 Themes 3.3.0 | Playground 原始 45 区段清单 |
| shadcn/ui | CLI 4.23.0；ui commit `8a3536678a528cc012b9e62484290e79d0be410f` | Base UI 本地组件、create 示例结构、registry schema |
| Base UI | @base-ui/react 1.9.0 | 所有主要交互原语、Portal、动画生命周期 |
| Radix Colors | @radix-ui/colors 3.0.0 | 官方色彩设计数据，浅深色及 alpha 色阶 |

直接参考：

- [Radix Playground](https://www.radix-ui.com/themes/playground)
- [Radix getting started](https://www.radix-ui.com/themes/docs/overview/getting-started)
- [Radix Colors 安装说明](https://www.radix-ui.com/colors/docs/overview/installation)
- [shadcn/create](https://ui.shadcn.com/create?base=base)
- [shadcn CLI](https://ui.shadcn.com/docs/cli)
- [Registry schema](https://ui.shadcn.com/docs/registry/registry-item-json)
- [Base UI 动画生命周期](https://base-ui.com/react/handbook/animation)
- [Base UI Select](https://base-ui.com/react/components/select)

create 清单依据固定源码 `getAllItems`、`ALLOWED_ITEM_TYPES` 和 PreviewSwitcher：排除生成器和 component-example；保留可导航的组件示例，以及 PreviewSwitcher 的 preview-02、preview 两张组合页。仅通过区块目录中带数字名称访问的登录/仪表盘/侧边栏区块不是当时 create 导航入口，因此不将整个 shadcn Blocks 网站误计入本次 create 范围。原始清单、源码路径和 SHA-256 保存在 inventory.json；531 个命名子场景/卡片见 coverage.json。

环境的内嵌浏览器不可用。官方服务内容通过网页抓取和实际官方源码交叉确认；浏览器交互、计算样式及截图使用本地 Chromium。参考组件运行于独立 reference/package.json 和独立依赖树，生产 Vite 入口没有导入 Radix Themes 或其整套 CSS。

保留的字体规则：Radix 系统字体栈及其本地字体别名，不下载/依赖 Google Fonts。两侧视觉测试在相同 Linux/Chromium 上解析为相同字体。跨操作系统字体渲染不作为本次像素对照结论。
