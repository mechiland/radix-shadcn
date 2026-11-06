import { toast } from 'sonner'
import type { MouseEvent } from 'react'
export async function demoAction(event: MouseEvent<HTMLElement>) {
 const target=event.currentTarget
 const label=(target.getAttribute('aria-label')||target.textContent||'Action').trim().replace(/\s+/g,' ')
 if (/copy/i.test(label)) {
  const scope=target.closest('[data-slot=card],[data-slot=example-content]')
  const value=scope?.querySelector('input')?.value||scope?.querySelector('code')?.textContent||'Radix Base UI · local demonstration'
  try{await navigator.clipboard.writeText(value);toast.success('Copied to clipboard')}catch{toast.error('Clipboard unavailable')}
 } else if (/download|export|receipt/i.test(label)) {
  const url=URL.createObjectURL(new Blob(['name,status,amount\nDemo invoice,paid,1200\n'],{type:'text/csv'}))
  const link=document.createElement('a');link.href=url;link.download='radix-base-demo.csv';link.click();URL.revokeObjectURL(url);toast.success('Demo CSV downloaded')
 } else toast.success(`${label} · local demo`,{description:'Action received. This example uses local demonstration data.'})
}
export function demoLinkAction(event:MouseEvent<HTMLElement>) {event.preventDefault();void demoAction(event)}
