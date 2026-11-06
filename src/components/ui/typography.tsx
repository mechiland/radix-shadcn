import type { ComponentProps, CSSProperties, ElementType, ReactNode } from 'react'
import { cn } from 'cn'
import type { AccentColor } from '@/lib/theme/theme'
type TypographyProps = {as?:ElementType;size?:1|2|3|4|5|6|7|8|9;color?:AccentColor;highContrast?:boolean;weight?:'light'|'regular'|'medium'|'bold';children?:ReactNode;className?:string;href?:string;target?:string;rel?:string;style?:CSSProperties}
// Like Radix, an unsized Text inherits its size; an uncoloured Text inherits its colour.
function Text({as:Tag='span',size,color,highContrast,weight,className,style,...props}:TypographyProps& Omit<ComponentProps<'span'>,'color'>) {
 return <Tag {...props} data-color={color} data-high-contrast={highContrast||undefined} data-weight={weight} data-size={size} className={cn('ds-typography',className)} style={size?{'--type-size':`var(--font-size-${size})`,'--type-line':`var(--line-height-${size})`,'--type-spacing':`var(--letter-spacing-${size})`,...style}:style}/>
}
function Link({underline='auto',...props}:TypographyProps & Omit<ComponentProps<'a'>,'color'> & {underline?:'auto'|'hover'|'always'|'none'}) {return <Text as="a" {...props} data-underline={underline} className={cn('ds-link-typography',props.className)}/>}
function Heading({size=6,...props}:TypographyProps) {return <Text as="h2" size={size} {...props} className={cn('ds-heading',props.className)} style={{...props.style,'--type-line':`var(--heading-line-height-${size})`} as CSSProperties}/> }
function Blockquote(props:TypographyProps) {return <Text as="blockquote" {...props} className={cn('ds-blockquote',props.className)}/>}
function Code({variant='soft',size,...props}:TypographyProps&{variant?:'solid'|'soft'|'outline'|'ghost'}) {return <Text as="code" size={size} {...props} data-code-size={size} data-variant={variant} className={cn('ds-code',props.className)}/>}
function Em(props:ComponentProps<'em'>) {return <em {...props} style={{fontFamily:'Times New Roman,serif',fontSize:'1.18em',lineHeight:1.25,letterSpacing:'-.025em',...props.style}}/>}
function Quote(props:ComponentProps<'q'>) {return <q {...props} style={{fontFamily:'Times New Roman,serif',fontSize:'1.18em',lineHeight:1.25,fontStyle:'italic',letterSpacing:'-.025em',...props.style}}/>}
function Strong(props:ComponentProps<'strong'>) {return <strong {...props}/>}
export {Text,Link,Heading,Blockquote,Code,Em,Quote,Strong}
