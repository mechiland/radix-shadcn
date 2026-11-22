"use client"

import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group'
import { visualAttrs,type RadixSize,type VisualProps } from '@/lib/theme/visual-props'
import { cn } from 'cn'
function CheckboxGroup({className,color,highContrast,variant,scale,size,...props}:CheckboxGroupPrimitive.Props&VisualProps&{size?:RadixSize<1|2|3>}) {return <CheckboxGroupPrimitive data-slot="checkbox-group" {...visualAttrs({color,highContrast,variant,scale,size})} className={cn('flex flex-col gap-3',className)} {...props}/>}
export { CheckboxGroup }
