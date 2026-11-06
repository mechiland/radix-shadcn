import type { ComponentProps } from "react"
import { cn } from "cn"

function TabNav({ className, size = 2, ...props }: ComponentProps<"nav"> & { size?: 1 | 2 }) {
  return <nav data-slot="tab-nav" data-scale={size} className={cn("ds-tab-nav", className)} {...props} />
}

function TabNavLink({ active, className, ...props }: ComponentProps<"a"> & { active?: boolean }) {
  return <a data-slot="tab-nav-link" data-active={active || undefined} aria-current={active ? "page" : undefined} className={className} {...props} />
}

export { TabNav, TabNavLink }
