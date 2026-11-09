# Radix / Base UI

Radix Themes 的视觉语言，基于官方 shadcn/ui Base UI 本地组件构建。独立 Vite Playground 和静态 shadcn registry 直接共用组件与主题源码。

[线上 Create](https://radix-shadcn.dev/#create)

```sh
npm ci
npm run dev
# http://localhost:5173
```

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

构建结果在 `dist/`，可整体静态部署。Hash 路由可直接由静态服务器提供。

从正在运行的网站安装：

```sh
npx shadcn@4.23.0 init --base base --preset nova
npx shadcn@4.23.0 add http://localhost:5173/r/button.json
# 整体入口
npx shadcn@4.23.0 add http://localhost:5173/r/radix-base.json
```

```tsx
import { Theme } from '@/lib/theme/theme'
import { Button } from '@/components/ui/button'

export default function App() {
  return <Theme><Button variant="classic">Next</Button></Theme>
}
```

Theme 自动导入安装的主题 CSS。Registry target 遵循消费者 ui/lib/hooks 别名，按项目配置调整 import；上述命令用于已有 React / Vite / Tailwind v4 项目。

- [完整覆盖与适配清单](docs/COVERAGE.md)：45 个 Radix 区段、68 个 create 入口，531 个命名场景/卡片。
- [固定参考和版本](docs/REFERENCES.md)：包含你指定的官方 Radix Colors 安装文档。
- [主题与组件使用](docs/THEMING.md)：token 映射、局部颜色、变体与 Portal。
- [工程决策](docs/DECISIONS.md)：tokens、Portal、依赖、动画、registry 文件闭包策略。
- [运行、安装和部署](docs/DEPLOYMENT.md)：整体/单组件入口、namespace、已有文件冲突说明。
- [可视对照索引](evidence/index.html)：原版、实现及差异图并排查看。
- [验收和证据](docs/VALIDATION.md)：截图、diff、计算样式、交互、动画、安装与构建。
- [上游署名与资源](docs/ATTRIBUTION.md)。

- Showcase：radix-ui.com 首页的 6 个示例，用本系统的 shadcn/Base UI 组件重建（`#showcase/dashboard-light` 等）；原版在 reference 应用 `?home=dashboard-light`，可并排对照。

主要源码：`src/components/ui/`、`src/lib/theme/`、`src/examples/`。`registry.json` 与 `public/r/` 由共享源生成，请勿单独修改生成文件。`reference/` 是隔离的 Radix Themes 对照应用，不进入生产构建。

```sh
npm run check
npm test
npm run verify:registry
# 视觉测试还需 npm ci --prefix reference && npm run dev --prefix reference
npm run test:visual
node tests/gallery.mjs
node tests/animation.mjs
node tests/smoke.mjs
```

测试使用本地 Google Chrome；可用 `CHROMIUM_PATH` 指定另一个已安装的 Chromium 可执行文件。当前证据来自同一 Linux / Chromium / sRGB / DPR 1 环境，不能据此声称所有操作系统或所有主题排列均像素相同。Base 的弹层定位、滚动和焦点策略保留，其差异已记录。
