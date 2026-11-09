import { lazy, Suspense, useEffect, useId, useState, type ContextType, type CSSProperties } from 'react'
import { ArrowUpRight, Copy, Link, RotateCcw, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { DemoSurface } from '@/examples/demo-surface'
import { PreviewDesignContext } from '@/examples/design-context'
import { PreviewIconContext } from '@/examples/icon-placeholder'
import { accentColors, defaultTheme, grayColors, matchingGray, radii, scalings, Theme, type ThemeConfig } from '@/lib/theme/theme'
import {
  defaultCreateOptions, fontOptions, fontStack, fontStylesheet, iconOptions, initializationCommand,
  projectNamePattern, readCreateOptions, type CreateOptions,
} from './options'
import './create.css'

const previews = {
  '01': lazy(() => import('@/examples/blocks/preview-02')),
  '02': lazy(() => import('@/examples/blocks/preview')),
}

const iconLoaders = {
  tabler: () => import('./icons/tabler'),
  hugeicons: () => import('./icons/hugeicons'),
  phosphor: () => import('./icons/phosphor'),
  remixicon: () => import('./icons/remixicon'),
}

const labelCase = (value: string) => value[0].toUpperCase() + value.slice(1)
const accentOptions = accentColors.map(value => ({ value, label: labelCase(value) }))
const radiusOptions = radii.map(value => ({ value, label: labelCase(value) }))
const scalingOptions = scalings.map(value => ({ value, label: value }))
const backgroundOptions = [
  { value: 'translucent', label: 'Translucent' },
  { value: 'solid', label: 'Solid' },
] as const
const headingOptions = [{ value: 'inherit', label: 'Same as body' } as const, ...fontOptions]

type CreatePageProps = {
  config: ThemeConfig
  onChange: (config: ThemeConfig) => void
  base: URL
  onCopy: (text: string, message?: string) => Promise<void>
}

export default function CreatePage({ config, onChange, base, onCopy }: CreatePageProps) {
  const [options, setOptions] = useState(readCreateOptions)
  const [projectName, setProjectName] = useState('my-radix-app')
  const [icons, setIcons] = useState<ContextType<typeof PreviewIconContext>>(null)

  useEffect(() => {
    const url = new URL(location.href)
    for (const [key, value] of Object.entries(options)) url.searchParams.set(key, value)
    history.replaceState(null, '', url)
  }, [options])

  useEffect(() => {
    const library = options.iconLibrary
    if (library === 'lucide') return
    let active = true
    void iconLoaders[library]().then(({ renderIcon }) => {
      if (active) setIcons({ library, renderIcon })
    })
    return () => { active = false }
  }, [options.iconLibrary])

  const updateTheme = <K extends keyof ThemeConfig>(key: K, value: ThemeConfig[K]) =>
    onChange({ ...config, [key]: value })
  const updateOptions = <K extends keyof CreateOptions>(key: K, value: CreateOptions[K]) =>
    setOptions(current => ({ ...current, [key]: value }))

  const headingFont = options.fontHeading === 'inherit' ? options.font : options.fontHeading
  const previewFonts = {
    '--default-font-family': fontStack(options.font),
    '--heading-font-family': fontStack(headingFont),
  } as CSSProperties
  const Preview = previews[options.preview]
  const command = projectNamePattern.test(projectName) ? initializationCommand(base, projectName, config, options) : null

  return (
    <main className="create-page" id="main-content">
      <div className="create-header">
        <div>
          <h1>Create a theme</h1>
          <p>Configure Radix Themes on shadcn, then start a Vite project with your settings.</p>
        </div>
        <div className="create-actions">
          <Button variant="outline" color="gray" onClick={() => void onCopy(location.href, 'Share link copied')}>
            <Link data-icon="inline-start" /> Share
          </Button>
          <Dialog>
            <DialogTrigger render={<Button />}>
              <Terminal data-icon="inline-start" /> Get code
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Initialize your project</DialogTitle>
                <DialogDescription>Run this command to create a new Vite app with the Radix registry and your configuration.</DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field data-invalid={!command || undefined}>
                  <FieldLabel htmlFor="create-project-name">Project name</FieldLabel>
                  <Input id="create-project-name" value={projectName} maxLength={100} spellCheck={false}
                    aria-invalid={!command || undefined} onChange={event => setProjectName(event.target.value)} />
                  {!command && <FieldDescription>Use lowercase letters, digits, hyphens, or underscores.</FieldDescription>}
                </Field>
                {command && <pre className="create-command" tabIndex={0} aria-label="Initialization command"><code>{command}</code></pre>}
              </FieldGroup>
              <DialogFooter>
                <Button disabled={!command} onClick={() => command && void onCopy(command, 'Initialization command copied')}>
                  <Copy data-icon="inline-start" /> Copy command
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="create-layout">
        <aside className="create-settings" aria-label="Theme settings">
          <div className="create-settings-title">
            <h2>Theme settings</h2>
            <Button variant="ghost" color="gray" size="icon-sm" aria-label="Reset Create settings"
              onClick={() => { onChange(defaultTheme); setOptions(defaultCreateOptions) }}>
              <RotateCcw />
            </Button>
          </div>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Radix Themes</FieldLegend>
              <div className="create-field-grid">
                <SettingsField label="Accent color" options={accentOptions} value={config.accentColor} onChange={value => updateTheme('accentColor', value)} />
                <SettingsField label="Gray color" options={grayColors.map(value => ({
                  value, label: value === 'auto' ? `Auto (${matchingGray(config.accentColor)})` : labelCase(value),
                }))} value={config.grayColor} onChange={value => updateTheme('grayColor', value)} />
                <SettingsField label="Radius" options={radiusOptions} value={config.radius} onChange={value => updateTheme('radius', value)} />
                <SettingsField label="Scaling" options={scalingOptions} value={config.scaling} onChange={value => updateTheme('scaling', value)} />
                <SettingsField label="Panel background" options={backgroundOptions} value={config.panelBackground} onChange={value => updateTheme('panelBackground', value)} />
                <Field>
                  <FieldTitle>Appearance</FieldTitle>
                  <ToggleGroup aria-label="Appearance" variant="outline" size="sm" spacing={0}
                    value={[config.appearance]} onValueChange={([value]) => {
                      if (value === 'light' || value === 'dark') updateTheme('appearance', value)
                    }}>
                    <ToggleGroupItem value="light">Light</ToggleGroupItem>
                    <ToggleGroupItem value="dark">Dark</ToggleGroupItem>
                  </ToggleGroup>
                </Field>
              </div>
            </FieldSet>
            <Separator />
            <FieldSet>
              <FieldLegend>Typography and icons</FieldLegend>
              <div className="create-field-grid">
                <SettingsField label="Body font" options={fontOptions} value={options.font} onChange={value => updateOptions('font', value)} />
                <SettingsField label="Heading font" options={headingOptions} value={options.fontHeading} onChange={value => updateOptions('fontHeading', value)} />
                <SettingsField label="Icon library" options={iconOptions} value={options.iconLibrary} onChange={value => updateOptions('iconLibrary', value)} />
              </div>
            </FieldSet>
          </FieldGroup>
        </aside>

        <div className="create-preview-shell">
          <div className="create-preview-toolbar">
            <h2>Live preview</h2>
            <div className="create-actions">
              <ToggleGroup aria-label="Preview composition" variant="outline" size="sm" spacing={0}
                value={[options.preview]} onValueChange={([value]) => {
                  if (value === '01' || value === '02') updateOptions('preview', value)
                }}>
                <ToggleGroupItem value="01" aria-label="Composition 01">01</ToggleGroupItem>
                <ToggleGroupItem value="02" aria-label="Composition 02">02</ToggleGroupItem>
              </ToggleGroup>
              <a href="https://ui.shadcn.com/create" target="_blank" rel="noreferrer" className="reference-link">
                Reference <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
          <link rel="stylesheet" href={fontStylesheet(options)} />
          <Theme config={config} style={previewFonts} className="create-preview style-nova" role="region" aria-label="Theme preview">
            <PreviewDesignContext.Provider value={{ style: 'radix', font: options.font, fontHeading: headingFont }}>
              <PreviewIconContext.Provider value={icons?.library === options.iconLibrary ? icons : null}>
                <DemoSurface>
                  <Suspense fallback={<p className="loading-text">Loading preview…</p>}><Preview /></Suspense>
                </DemoSurface>
              </PreviewIconContext.Provider>
            </PreviewDesignContext.Provider>
          </Theme>
        </div>
      </div>
    </main>
  )
}

function SettingsField<T extends string>({ label, options, value, onChange }: {
  label: string
  options: readonly { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  const id = useId()
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <NativeSelect id={id} value={value} onChange={event => onChange(event.target.value as T)}>
        {options.map(option => <NativeSelectOption key={option.value} value={option.value}>{option.label}</NativeSelectOption>)}
      </NativeSelect>
    </Field>
  )
}
