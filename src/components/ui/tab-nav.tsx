import type { ComponentProps } from "react"
import { cn } from "cn"
import { radixScale, type RadixSize } from "@/lib/theme/visual-props"

function TabNav({ className, size = 2, ...props }: ComponentProps<"nav"> & { size?: RadixSize<1 | 2> }) {
  return <nav data-slot="tab-nav" data-scale={radixScale(size)} className={cn("ds-tab-nav", className)} {...props} />
}

function TabNavLink({ active, className, children, ...props }: ComponentProps<"a"> & { active?: boolean }) {
  return <a data-slot="tab-nav-link" data-active={active || undefined} aria-current={active ? "page" : undefined} className={className} {...props}>
    <span data-slot="tabs-trigger-inner">{children}</span>
    <span data-slot="tabs-trigger-inner-hidden" aria-hidden>{children}</span>
  </a>
}

export { TabNav, TabNavLink }
