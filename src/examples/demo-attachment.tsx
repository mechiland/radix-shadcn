import * as React from 'react'
import { Attachment as AttachmentPrimitive, AttachmentAction as AttachmentActionPrimitive } from '@/components/ui/attachment'
import { Button } from '@/components/ui/button'
import { demoAction } from './demo-actions'
import { toast } from 'sonner'

const RemoveContext = React.createContext<(() => void) | null>(null)

export function Attachment(props: React.ComponentProps<typeof AttachmentPrimitive>) {
  const [removed, setRemoved] = React.useState(false)
  if (removed) return <div role="status" className="flex items-center gap-3 text-sm"><span>Attachment removed</span><Button variant="soft" size="sm" onClick={() => setRemoved(false)}>Restore attachment</Button></div>
  return <RemoveContext.Provider value={() => { setRemoved(true); toast.success('Attachment removed from local demo') }}><AttachmentPrimitive {...props} /></RemoveContext.Provider>
}

export function AttachmentAction({ onClick, ...props }: React.ComponentProps<typeof AttachmentActionPrimitive>) {
  const remove = React.useContext(RemoveContext)
  return <AttachmentActionPrimitive {...props} onClick={onClick ?? (event => {
    if (/remove/i.test(props['aria-label'] || '') && remove) remove()
    else void demoAction(event)
  })} />
}
