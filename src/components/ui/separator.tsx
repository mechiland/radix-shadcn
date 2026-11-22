import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"
import { cn } from "cn"
import { radixScale, type RadixSize } from "@/lib/theme/visual-props"

function Separator({
  className,
  orientation = "horizontal",
  size,
  ...props
}: SeparatorPrimitive.Props & { size?: RadixSize<1 | 2 | 3 | 4> }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      data-scale={radixScale(size)}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
