# Repository Guidelines

## Project Structure

This repository ships a React, TypeScript, and Vite playground and a static shadcn registry. Both use the Base UI components in `src/components/ui/` and the Radix theme tokens and styles in `src/lib/theme/`. Demos live in `src/examples/` and `src/showcase/`, the theme creator in `src/create/`, and static images in `public/images/`. Browser checks live in `tests/`. The standalone `reference/` app provides the upstream Radix Themes comparison, with captures and reports in `evidence/`.

## Build and Development

Use Node.js 24. The package requires Node.js 22.12 or later.

- `npm ci` installs dependencies from the lockfile.
- `npm run dev` starts the playground on port 5173.
- `npm run check` runs the TypeScript checks.
- `npm run registry:build` regenerates `registry.json`, `public/registry.json`, and `public/r/` from shared source. Include the generated changes with registry source edits.
- `npm run build` rebuilds the registry, checks types, and emits `dist/`. Run `npm run preview` to serve that build locally.

## Deployment

Publish from `main` to the existing Cloudflare Pages project with authenticated Wrangler.

```sh
npm run build
npx wrangler pages deploy dist --project-name radix-shadcn --branch main
```

Verify the [production site](https://radix-shadcn.dev/#create), [initializer](https://radix-shadcn.dev/create/init.mjs), and [registry JSON](https://radix-shadcn.dev/r/radix-base.json).

## Coding Style

Use two-space indentation for new TypeScript and TSX and match surrounding formatting in existing files. Use PascalCase for React components and kebab-case for UI and example filenames, such as `toggle-group.tsx`. Use the `@/` alias for imports across `src/`. Compose existing Base UI primitives, preserve their keyboard and focus behavior, and use shared semantic theme tokens for styling. Oxlint is available through `npx oxlint`.

## Testing

Start the playground before running `npm test`. Playwright discovers `tests/**/*.spec.ts`, including axe accessibility checks. Name tests for the behavior they verify. Run one file with `npm test -- tests/create.spec.ts`. Set `CHROMIUM_PATH` to your installed Chrome or Chromium executable if needed.

For visual changes, run `npm ci --prefix reference` and start `npm run dev --prefix reference` on port 5174 before `npm run test:visual`. For registry changes, run `npm run verify:registry` with the playground running and npm network access available. Choose checks for the affected scenarios using [the coverage inventory](docs/COVERAGE.md) and [validation guide](docs/VALIDATION.md).

## Commits and Pull Requests

Write short, action-oriented commit subjects. Recent commits use prefixes such as `feat:` and `ci:`. Open pull requests against `main`, describe the change and checks run, link related issues, and attach before-and-after screenshots for visible changes.
