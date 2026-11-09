import { createContext, useContext } from 'react'
import { fontOptions, fontStack } from '@/create/options'

export const FONTS = [
  { value: 'system', name: 'System UI', label: 'System UI', fontFamily: 'system-ui', category: 'sans-serif' },
  ...fontOptions.map(({ value, label }) => ({ value, name: label, label, fontFamily: fontStack(value), category: 'custom' })),
]
export const STYLES = [{name:'radix',title:'Radix Themes'}]
export const PreviewDesignContext = createContext({ style: 'radix', font: 'system', fontHeading: 'system' })
export function useDesignSystemSearchParams() {return [useContext(PreviewDesignContext)] as const}
