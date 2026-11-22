import type { AccentColor } from './theme'
/** A Radix Themes size, written as a number or a string: `2` or `"2"`. */
export type RadixSize<N extends number> = N | `${N}`
export type VisualProps = {
 color?:AccentColor | (string & {}); highContrast?:boolean; variant?:'classic'|'solid'|'soft'|'surface'|'outline'|'ghost'
 /** @deprecated Use `size`, which takes the Radix sizes as well as the shadcn ones. */
 scale?:1|2|3|4|5
}
/** Returns the Radix size from a size prop that can also hold a shadcn name such as `sm` or `lg`. */
export function radixScale(size:unknown):number|undefined {
 if (typeof size==='number') return size
 return typeof size==='string' && /^[1-9]$/.test(size) ? Number(size) : undefined
}
/** Returns the shadcn size, which falls back to `fallback` when the size is a Radix size. */
export function shadcnSize<S extends string>(size:S|RadixSize<number>|undefined,fallback:S):S {
 return size===undefined || radixScale(size)!==undefined ? fallback : size as S
}
export function visualAttrs({color,highContrast,variant,scale,size}:VisualProps&{size?:unknown}) {
 return { 'data-color':color,'data-high-contrast':highContrast||undefined,'data-variant':variant,'data-scale':radixScale(size) ?? scale }
}
