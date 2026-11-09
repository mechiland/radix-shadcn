import { iconLibraries, type IconLibraryName } from 'shadcn/icons'
import { DEFAULT_PRESET_CONFIG, encodePreset, PRESET_FONTS } from 'shadcn/preset'
import type { ThemeConfig } from '@/lib/theme/theme'

type Font = (typeof PRESET_FONTS)[number]
type HeadingFont = Font | 'inherit'

const fontNames: Record<Font, string> = {
  geist: 'Geist',
  inter: 'Inter',
  'noto-sans': 'Noto Sans',
  'nunito-sans': 'Nunito Sans',
  figtree: 'Figtree',
  roboto: 'Roboto',
  raleway: 'Raleway',
  'dm-sans': 'DM Sans',
  'public-sans': 'Public Sans',
  outfit: 'Outfit',
  oxanium: 'Oxanium',
  manrope: 'Manrope',
  'space-grotesk': 'Space Grotesk',
  montserrat: 'Montserrat',
  'ibm-plex-sans': 'IBM Plex Sans',
  'source-sans-3': 'Source Sans 3',
  'instrument-sans': 'Instrument Sans',
  'geist-mono': 'Geist Mono',
  'jetbrains-mono': 'JetBrains Mono',
  'noto-serif': 'Noto Serif',
  'roboto-slab': 'Roboto Slab',
  merriweather: 'Merriweather',
  lora: 'Lora',
  'playfair-display': 'Playfair Display',
  'eb-garamond': 'EB Garamond',
  'instrument-serif': 'Instrument Serif',
}

export const fontOptions = Object.entries(fontNames).map(([value, label]) => ({
  value: value as Font,
  label,
}))
export const iconOptions = Object.values(iconLibraries).map(({ name, title }) => ({
  value: name as IconLibraryName,
  label: title,
}))

export type CreateOptions = {
  font: Font
  fontHeading: HeadingFont
  iconLibrary: IconLibraryName
  preview: '01' | '02'
}

export const defaultCreateOptions: CreateOptions = {
  font: DEFAULT_PRESET_CONFIG.font,
  fontHeading: DEFAULT_PRESET_CONFIG.fontHeading,
  iconLibrary: DEFAULT_PRESET_CONFIG.iconLibrary,
  preview: '01',
}

export function readCreateOptions(): CreateOptions {
  const query = new URLSearchParams(location.search)
  const font = fontOptions.find(option => option.value === query.get('font'))?.value
  const fontHeading = fontOptions.find(option => option.value === query.get('fontHeading'))?.value
  const iconLibrary = iconOptions.find(option => option.value === query.get('iconLibrary'))?.value
  return {
    font: font ?? defaultCreateOptions.font,
    fontHeading: fontHeading ?? defaultCreateOptions.fontHeading,
    iconLibrary: iconLibrary ?? defaultCreateOptions.iconLibrary,
    preview: query.get('preview') === '02' ? '02' : '01',
  }
}

export function fontStack(font: Font) {
  const fallback = font === 'geist-mono' || font === 'jetbrains-mono' ? 'monospace'
    : ['noto-serif', 'roboto-slab', 'merriweather', 'lora', 'playfair-display', 'eb-garamond', 'instrument-serif'].includes(font)
      ? 'serif'
      : 'sans-serif'
  return `"${fontNames[font]}", ${fallback}`
}

export function fontStylesheet(options: CreateOptions) {
  const fonts = new Set([options.font, options.fontHeading === 'inherit' ? options.font : options.fontHeading])
  const families = [...fonts].map(font => {
    const family = encodeURIComponent(fontNames[font]).replaceAll('%20', '+')
    const weights = font === 'instrument-serif' ? '400' : '400;500;600;700'
    return `family=${family}:wght@${weights}`
  })
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`
}

export const projectNamePattern = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/

export function initializationCommand(base: URL, name: string, theme: ThemeConfig, options: CreateOptions) {
  const preset = encodePreset({
    ...DEFAULT_PRESET_CONFIG,
    font: options.font,
    fontHeading: options.fontHeading,
    iconLibrary: options.iconLibrary,
  })
  const script = new URL('create/init.mjs', base)
  const registry = new URL('r/radix-base.json', base)
  const args = [name, registry.href, preset, JSON.stringify(theme)]
  const quote = (arg: string) => `'${arg.replaceAll("'", "'\\''")}'`
  return `curl -fsSL ${quote(script.href)} | node --input-type=module - ${args.map(quote).join(' ')}`
}
