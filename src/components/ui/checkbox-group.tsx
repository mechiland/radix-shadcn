"use client"

import { CheckboxGroup as CheckboxGroupPrimitive } from '@base-ui/react/checkbox-group'
import { visualAttrs,type VisualProps } from '@/lib/theme/visual-props'
import { cn } from 'cn'
function CheckboxGroup({className,color,highContrast,variant,scale,...props}:CheckboxGroupPrimitive.Props&VisualProps) {return <CheckboxGroupPrimitive data-slot="checkbox-group" {...visualAttrs({color,highContrast,variant,scale})} className={cn('flex flex-col gap-3',className)} {...props}/>}
export { CheckboxGroup }
