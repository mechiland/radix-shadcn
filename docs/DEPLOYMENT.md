# 本地运行和静态部署

```sh
npm ci
npm run dev
```

打开 http://localhost:5173。生产预览：

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

`npm run build` 依次从共享源文件生成 registry、运行官方 `shadcn build`、TypeScript 检查及 Vite 生产构建。输出目录 `dist/` 可整体部署到静态 HTTP(S) 服务。

生产站点由 Cloudflare Pages 的 `radix-shadcn` 项目托管，线上入口为 [Create](https://radix-shadcn.dev/#create)。使用已获授权的 Wrangler 将构建产物上传到现有项目。

```sh
npm run build
npx wrangler pages deploy dist --project-name radix-shadcn --branch main
```

路由使用 URL hash：`/#components/button`、`/#examples/preview-02`、`/#install/button`。服务器无需 SPA rewrite；访问 `/` 和资源文件即可。Vite base 为 `./`，可部署在子目录；已通过 /nested/ 普通静态 HTTP 挂载验证。服务器须返回正确的 JS/CSS/JSON MIME，`/r/*.json` 不得重写成 index.html。

Registry 地址：

- `/registry.json`：索引（站点根路径下）
- `/r/radix-base.json`：整体入口
- `/r/theme.json`：主题
- `/r/button.json` 等：按组件入口

这些 JSON 内无 host-bound registryDependencies，部署后直接以真实 host 的完整 URL 安装即可。Install 页会按当前 origin 和 base 生成命令，无需改代码。

`/#create` 提供实时主题预览、分享链接和项目初始化命令。命令通过 `/create/init.mjs` 调用 shadcn CLI 创建 Vite / Base UI 项目，安装完整 registry，并写入选定的 Radix 主题、shadcn 字体及图标库。静态部署需包含 `dist/create/init.mjs`。运行命令需要 Node.js、npm、Git 和 curl，并能访问当前站点、shadcn、GitHub 及 npm registry。

```sh
# 在已有 React / Vite / Tailwind v4 项目中
npx shadcn@4.23.0 init --base base --preset nova
npx shadcn@4.23.0 add http://localhost:5173/r/button.json
# 或整体入口
npx shadcn@4.23.0 add http://localhost:5173/r/radix-base.json
```

消费者：

```tsx
import { Theme } from '@/lib/theme/theme'
import { Button } from '@/components/ui/button'

export default function App() {
  return <Theme><Button variant="classic">Next</Button></Theme>
}
```

Theme 自动载入 `./styles.css`、palette 和设计 tokens。公共 target 会按消费者 components.json 的 ui/lib/hooks 别名写入；如改过别名，相应调整上述 import。应保留 shadcn 初始化的 Tailwind semantic token 映射及 dark variant。

可选 namespace 配置（此名称只存在于本项目配置，不声称官方注册）：

```json
{"registries":{"@radix-base":"https://YOUR-ACTUAL-HOST/r/{name}.json"}}
```

直接 URL 安装不需要 namespace。重复安装相同文件会跳过；已有修改会出现官方覆盖选择。`--overwrite` 明确覆盖已有同名源码，包括传递文件；集成到已有项目时先查看差异。验证脚本实际检查了无变化重装与显式覆盖恢复。不会修改 node_modules。

重新生成：`npm run registry:build`。不要手改 public/r/*.json。`npm run verify:registry` 在临时项目运行官方 create-vite、shadcn init/add 和完整构建，需启动本站及联网下载 npm 包。临时项目位置记录在 evidence/registry/consumer-path.txt，脚本会自动启动该消费者的生产预览，运行代表性交互检查并停止其临时服务器。

独立参考环境仅用于验收：`npm ci --prefix reference`，然后 `npm run dev --prefix reference`（5174）。它不会进入生产 bundle。
