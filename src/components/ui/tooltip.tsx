"use client"

import * as React from "react"
import { useThemePortal } from "@/lib/theme/theme"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { cn } from "cn"

const TooltipA11yContext = React.createContext({id:"",open:false})

function TooltipProvider({
  delay = 700,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  const id=React.useId()
  const [open,setOpen]=React.useState(props.defaultOpen??false)
  return <TooltipA11yContext.Provider value={{id,open:props.open??open}}><TooltipPrimitive.Root data-slot="tooltip" {...props} onOpenChange={(value,details)=>{props.onOpenChange?.(value,details);if(!details.isCanceled)setOpen(value)}} /></TooltipA11yContext.Provider>
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  const {id,open}=React.useContext(TooltipA11yContext)
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" aria-describedby={open?id:undefined} {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const {id}=React.useContext(TooltipA11yContext)
  return (
    <TooltipPrimitive.Portal container={useThemePortal()}>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          id={id} role="tooltip"
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow data-slot="tooltip-arrow" className="ds-tooltip-arrow" render={<svg width="10" height="5" viewBox="0 0 30 10" preserveAspectRatio="none"><path d="M0 0H30L15 10Z"/></svg>} />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
