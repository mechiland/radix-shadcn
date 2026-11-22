**English** | [简体中文](README.zh-CN.md)

# Radix / Base UI (`radix-shadcn`)

Radix Themes' visual design language and 12-step Radix Colors, rebuilt on official `shadcn/ui` Base UI (`@base-ui/react`) components and Tailwind CSS v4.

The Vite playground and static shadcn registry share the exact same component and theme source—with **zero `@radix-ui/react-*` or `@radix-ui/themes` runtime dependencies** (only `@radix-ui/colors`).

- **Live Theme Creator & Playground:** [https://radix-shadcn.dev/#create](https://radix-shadcn.dev/#create)
- **Registry Index:** `https://radix-shadcn.dev/registry.json`

## Why `radix-shadcn`?

- **Active Base UI foundation, Radix Themes aesthetics:** As ecosystems adopt `@base-ui/react` and Tailwind CSS v4, you keep Radix Themes' refined variants (`classic`, `solid`, `soft`, `surface`, `outline`, `ghost`), sizes (`1`–`4`), scaling, radii, and 12-step + alpha color scales—while owning every line of source code in your repo.
- **No Tailwind v4 CSS specificity fights:** Base and variant styles live in `@layer components`, so standard Tailwind utility classes override cleanly following shadcn conventions.
- **Scoped Portal theming:** Nested `<Theme>` sections provide their own portal hosts via React context, so dialogs, menus, popovers, and tooltips inherit local accent/gray/appearance tokens instead of falling back to `body`.
- **Self-contained static registry:** Every item bundles its transitive local file closure using `@ui` / `@lib` / `@hooks` target placeholders, compatible with custom project aliases without host-bound dependency URLs.
- **Comprehensive parity & visual evidence:** Covers **45 Radix Themes sections**, **68 create pages**, **531 named scenes/cards**, and all **6 `radix-ui.com` homepage showcases** (Dashboard, Ecommerce, Music in light and dark mode) with side-by-side diffs.

## Quick Install

In an existing React / Vite / Tailwind CSS v4 project:

```sh
npx shadcn@4.23.0 init --base base --preset nova
# Install individual components
npx shadcn@4.23.0 add https://radix-shadcn.dev/r/button.json
# Or install the complete design system entry
npx shadcn@4.23.0 add https://radix-shadcn.dev/r/radix-base.json
```

Or install from your locally running playground:

```sh
npx shadcn@4.23.0 init --base base --preset nova
npx shadcn@4.23.0 add http://localhost:5173/r/button.json
# Full entry
npx shadcn@4.23.0 add http://localhost:5173/r/radix-base.json
```

```tsx
import { Theme } from '@/lib/theme/theme'
import { Button } from '@/components/ui/button'

export default function App() {
  return (
    <Theme>
      <Button variant="classic">Next</Button>
    </Theme>
  )
}
```

`<Theme>` automatically imports the installed theme CSS. Registry targets honor your consumer `components.json` `ui` / `lib` / `hooks` aliases—adjust imports accordingly if your aliases differ.

## Local Development & Build

Requires Node.js 22.12+ (Node.js 24 recommended).

```sh
npm ci
npm run dev
# http://localhost:5173
```

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

`npm run build` outputs a static bundle to `dist/` using hash routing, ready for static hosting with no SPA rewrite required.

## Documentation & Evidence

- [Coverage & Adaptations](docs/COVERAGE.md): 45 Radix sections, 68 create pages, 531 named scenes/cards.
- [Pinned References & Versions](docs/REFERENCES.md): Upstream versions and official Radix Colors installation notes.
- [Theming & Usage](docs/THEMING.md): Token mapping, local nested colors, variants, and Portals.
- [Engineering Decisions](docs/DECISIONS.md): Tokens, Portals, dependencies, motion, and registry closure strategy.
- [Running, Installation & Deployment](docs/DEPLOYMENT.md): Full/per-component entries, namespace config, and conflict handling.
- [Visual Comparison Index](evidence/index.html): Side-by-side reference, implementation, and diff viewer.
- [Validation & Evidence](docs/VALIDATION.md): Screenshots, pixel diffs, computed styles, interaction, animation, install, and build checks.
- [Attribution & Assets](docs/ATTRIBUTION.md): Upstream licenses (`Radix Themes`, `Radix Colors`, `shadcn/ui`, `Base UI`, and assets).

Primary source lives in `src/components/ui/`, `src/lib/theme/`, and `src/examples/`. `registry.json` and `public/r/` are generated from shared source (`npm run registry:build`); do not edit generated files directly. `reference/` is an isolated upstream Radix Themes comparison app excluded from production builds.

## Verification

```sh
npm run check
npm test
npm run verify:registry
# Visual checks also require: npm ci --prefix reference && npm run dev --prefix reference
npm run test:visual
node tests/gallery.mjs
node tests/animation.mjs
node tests/smoke.mjs
```

Browser checks use local Google Chrome; set `CHROMIUM_PATH` to use a different Chromium binary. Visual parity evidence was captured in a Linux / Chromium / sRGB / DPR 1 environment; Base UI's positioning, scroll-locking, and focus strategies are intentionally preserved and their differences documented.

## License

MIT — see [LICENSE](LICENSE) and [docs/ATTRIBUTION.md](docs/ATTRIBUTION.md).
