import { cn } from "cn"
import { radixScale, type RadixSize } from "@/lib/theme/visual-props"

function Kbd({ className, size, ...props }: React.ComponentProps<"kbd"> & { size?: RadixSize<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9> }) {
  return (
    <kbd
      data-slot="kbd"
      data-scale={radixScale(size)}
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
