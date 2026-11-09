import type { ReactNode } from 'react'
import { toast } from 'sonner'

export function DemoSurface({ children }: { children: ReactNode }) {
  return (
    <div className="demo-surface style-nova" onSubmit={event => {
      if (event.defaultPrevented) return
      event.preventDefault()
      const data = new FormData(event.target as HTMLFormElement)
      const fields = Array.from(data.keys())
      try {
        sessionStorage.setItem('radix-base-last-demo-form', JSON.stringify(
          Object.fromEntries(Array.from(data).filter(([key]) => !/password|token|secret/i.test(key))),
        ))
      } catch {}
      toast.success(`Saved to local demo${fields.length ? ` · ${fields.length} fields` : ''}`)
    }}>
      {children}
    </div>
  )
}
