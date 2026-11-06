import type { ComponentProps } from 'react'
import { Info } from 'lucide-react'
import { cn } from 'cn'
import { Checkbox } from './checkbox'
import { RadioGroupItem } from './radio-group'
import { visualAttrs,type VisualProps } from '@/lib/theme/visual-props'
function Callout({children,className,color,highContrast,variant='soft',scale=2,...props}:ComponentProps<'div'>&VisualProps) {return <div role="note" {...props} {...visualAttrs({color,highContrast,variant,scale})} className={cn('ds-callout',className)}><Info aria-hidden size={16}/><div>{children}</div></div>}
function DataList({className,...props}:ComponentProps<'dl'>) {return <dl data-slot="data-list" className={cn('ds-data-list',className)} {...props}/>}
function Inset({className,side='all',...props}:ComponentProps<'div'>&{side?:'all'|'top'|'bottom'|'left'|'right'|'x'|'y'}) {return <div data-side={side} className={cn('ds-inset',className)} {...props}/>}
function CheckboxCard({children,className,...props}:ComponentProps<typeof Checkbox>) {return <label data-scale={props.scale} data-variant={props.variant} className={cn('ds-choice-card ds-checkbox-card',className)}><Checkbox {...props}/><span>{children}</span></label>}
function RadioCard({children,className,scale,variant,...props}:ComponentProps<typeof RadioGroupItem>&VisualProps) {return <label data-scale={scale} data-variant={variant} className={cn('ds-choice-card ds-radio-card',className)}><RadioGroupItem {...props}/><span>{children}</span></label>}
export { Callout,DataList,Inset,CheckboxCard,RadioCard }
