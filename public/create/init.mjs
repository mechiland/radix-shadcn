import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const [name, registry, preset, settings] = process.argv.slice(2)
if (!name || name.length > 100 || !/^[a-z0-9]+(?:[-_][a-z0-9]+)*$/.test(name)) {
  throw new Error('Use a project name with lowercase letters, digits, hyphens, or underscores.')
}
if (existsSync(name)) throw new Error(`The directory "${name}" already exists. Choose a new project name.`)
const registryUrl = new URL(registry)
if (!['http:', 'https:'].includes(registryUrl.protocol) || !registryUrl.pathname.endsWith('/r/radix-base.json')) {
  throw new Error('Pass the HTTP(S) URL of the Radix Base registry item.')
}
if (!preset || !/^[A-Za-z0-9]+$/.test(preset)) throw new Error('Pass a shadcn preset code.')
const theme = JSON.parse(settings)
if (!theme || typeof theme !== 'object' || Array.isArray(theme)) throw new Error('Pass a Radix theme object.')

// Start in an empty directory so the CLI cannot initialize the caller's project.
const workspace = mkdtempSync(join(process.cwd(), '.radix-create-'))
const project = join(workspace, name)
try {
  execFileSync('npx', [
    '--yes', 'shadcn@4.23.0', 'init', '--template', 'vite', '--base', 'base',
    '--name', name, '--preset', preset, '--yes', '--no-monorepo',
  ], { cwd: workspace, stdio: 'inherit' })
  // The Vite template ships its own Button. Install the registry after scaffolding.
  execFileSync('npx', [
    '--yes', 'shadcn@4.23.0', 'add', registryUrl.href, '--yes', '--overwrite',
  ], { cwd: project, stdio: 'inherit' })

  const config = JSON.parse(readFileSync(join(project, 'components.json'), 'utf8'))
  const css = readFileSync(join(project, 'src/index.css'), 'utf8')
  const bodyFont = css.match(/^\s*--font-sans:\s*([^;]+);/m)?.[1] ?? 'system-ui, sans-serif'
  const headingFont = css.match(/^\s*--font-heading:\s*([^;]+);/m)?.[1] ?? bodyFont
  const resolvedHeading = headingFont.replace(/var\(--font-sans\)/g, bodyFont)
  const fonts = {
    '--default-font-family': bodyFont,
    '--heading-font-family': resolvedHeading,
    '--font-heading': resolvedHeading,
  }
  const icons = {
    lucide: [`import { ArrowRightIcon as ContinueIcon } from 'lucide-react'`, '<ContinueIcon data-icon="inline-end" />'],
    tabler: [`import { IconArrowRight as ContinueIcon } from '@tabler/icons-react'`, '<ContinueIcon data-icon="inline-end" />'],
    hugeicons: [
      `import { HugeiconsIcon } from '@hugeicons/react'\nimport { ArrowRight01Icon } from '@hugeicons/core-free-icons'`,
      '<HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} data-icon="inline-end" />',
    ],
    phosphor: [`import { ArrowRightIcon as ContinueIcon } from '@phosphor-icons/react'`, '<ContinueIcon data-icon="inline-end" />'],
    remixicon: [`import { RiArrowRightLine as ContinueIcon } from '@remixicon/react'`, '<ContinueIcon data-icon="inline-end" />'],
  }
  const [iconImport, icon] = icons[config.iconLibrary] ?? icons.lucide

  writeFileSync(join(project, 'src/App.tsx'), `import type { CSSProperties } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Theme, parseTheme } from '@/lib/theme/theme'
${iconImport}

const theme = parseTheme(${JSON.stringify(theme, null, 2)})
const fonts = ${JSON.stringify(fonts, null, 2)} as CSSProperties

export default function App() {
  return (
    <Theme config={theme} style={fonts}>
      <main className="mx-auto grid min-h-svh max-w-xl items-center p-6">
        <Card variant="classic">
          <CardHeader>
            <CardTitle style={{ fontFamily: 'var(--heading-font-family)' }}>Your Radix project is ready</CardTitle>
            <CardDescription>The theme, fonts, and icons are set up for this project.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button render={<a href="https://www.radix-ui.com/themes/docs/overview/getting-started" />} nativeButton={false}>
              Radix Themes docs ${icon}
            </Button>
          </CardContent>
        </Card>
      </main>
    </Theme>
  )
}
`)

  writeFileSync(join(project, 'src/main.tsx'), `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`)

  mkdirSync(name)
  try {
    renameSync(project, name)
  } catch (error) {
    rmdirSync(name)
    throw error
  }
} finally {
  rmSync(workspace, { recursive: true, force: true })
}

console.log(`\nProject ready. Run: cd ${name} && npm run dev`)
