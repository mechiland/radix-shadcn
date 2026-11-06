import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card,CardContent } from '@/components/ui/card'
import { Callout } from '@/components/ui/adaptations'
import { DemoDialog,DemoSelect } from './playground'
export function VisualFixture() {return <div id="fixture" style={{width:760,padding:24,display:'flex',flexDirection:'column',gap:24}}>
 {(['classic','solid','soft','surface','outline','ghost'] as const).map(v=><div key={v} style={{display:'flex',gap:16,alignItems:'center'}}>{(['1','2','3','4'] as const).map(s=><Button key={s} variant={v} size={s}>Next</Button>)}<Button variant={v} highContrast>Next</Button><Button variant={v} color="gray">Next</Button><Button variant={v} disabled>Next</Button></div>)}
 <div style={{display:'flex',gap:16}}><Checkbox aria-label="Unchecked"/><Checkbox defaultChecked aria-label="Checked"/><Checkbox indeterminate aria-label="Mixed"/><Switch aria-label="Switch"/><Switch defaultChecked aria-label="Checked switch"/></div>
 <div style={{display:'flex',gap:16}}><Input aria-label="Search" placeholder="Search the docs…"/><Input aria-label="Disabled" placeholder="Disabled" disabled/><DemoSelect/></div>
 <div style={{display:'flex',gap:16}}>{(['solid','soft','surface','outline'] as const).map(v=><Badge key={v} variant={v}>New</Badge>)}</div>
 <Card><CardContent><strong>Tools for thought</strong><p style={{marginTop:8}}>A shared foundation for your next idea.</p></CardContent></Card><Callout>Please upgrade to the new version.</Callout><DemoDialog/>
 </div>}
