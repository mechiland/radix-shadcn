import { TabNav,TabNavLink } from "@/components/ui/tab-nav"
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { RadioGroup,RadioGroupItem } from '@/components/ui/radio-group'
import { Avatar,AvatarFallback } from '@/components/ui/avatar'
import { Card,CardContent } from '@/components/ui/card'
import { Callout,DataList,Inset,CheckboxCard,RadioCard } from '@/components/ui/adaptations'
import { Text,Link,Heading,Blockquote,Code,Em,Quote,Strong } from '@/components/ui/typography'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { Kbd } from '@/components/ui/kbd'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from '@/components/ui/table'
import { Tabs,TabsList,TabsTrigger,TabsContent } from '@/components/ui/tabs'
import { Popover,PopoverTrigger,PopoverContent } from '@/components/ui/popover'
import { Tooltip,TooltipTrigger,TooltipContent } from '@/components/ui/tooltip'
import { HoverCard,HoverCardTrigger,HoverCardContent } from '@/components/ui/hover-card'
import { ContextMenu,ContextMenuTrigger,ContextMenuContent,ContextMenuItem } from '@/components/ui/context-menu'
import { DemoDialog,DemoSelect,MenuDemo } from './playground'
const variants=['classic','surface','soft'] as const
const text='The quick brown fox jumps over the lazy dog.'
export function ComparisonFixture({id}:{id:string}) {let sample
 switch(id){
 case 'button':case 'icon-button':sample=<>{(['classic','solid','soft','surface','outline','ghost'] as const).map(v=><Button variant={v} key={v} size={id==='icon-button'?'icon':'default'} aria-label={v}>{id==='icon-button'?<Star/>:'Next'}</Button>)}</>;break
 case 'badge':sample=<>{(['solid','soft','surface','outline'] as const).map(v=><Badge variant={v} key={v}>New</Badge>)}</>;break
 case 'avatar':sample=<>{[1,2,3,4,5].map(n=><Avatar data-scale={n} key={n}><AvatarFallback>JD</AvatarFallback></Avatar>)}</>;break
 case 'checkbox':case 'checkbox-group':sample=<>{variants.map(v=><div key={v} style={{display:'flex',gap:12}}><Checkbox variant={v} aria-label={v}/><Checkbox variant={v} defaultChecked aria-label={v+' checked'}/><Checkbox variant={v} indeterminate aria-label={v+' mixed'}/></div>)}</>;break
 case 'checkbox-cards':sample=<><CheckboxCard defaultChecked>Next.js</CheckboxCard><CheckboxCard>Remix</CheckboxCard></>;break
 case 'radio-cards':sample=<RadioGroup defaultValue="next" style={{display:'flex',gap:16}}><RadioCard value="next">Next.js</RadioCard><RadioCard value="remix">Remix</RadioCard></RadioGroup>;break
 case 'radio':case 'radio-group':sample=<>{variants.map(v=><RadioGroup key={v} data-variant={v} defaultValue="one" style={{display:'flex',flexDirection:'row',width:'auto',gap:12}}><RadioGroupItem value="one" aria-label="One"/><RadioGroupItem value="two" aria-label="Two"/></RadioGroup>)}</>;break
 case 'switch':sample=<>{variants.map(v=><div key={v} style={{display:'flex',gap:12}}><Switch variant={v} aria-label={v}/><Switch variant={v} defaultChecked aria-label={v+' checked'}/></div>)}</>;break
 case 'text-field':sample=<>{variants.map(v=><Input key={v} variant={v} placeholder="Search the docs…" style={{width:210}} aria-label={v}/>)}</>;break
 case 'text-area':sample=<>{variants.map(v=><Textarea key={v} variant={v} placeholder="Reply to comment…" style={{width:210}} aria-label={v}/>)}</>;break
 case 'select':sample=<DemoSelect alignItemWithTrigger={new URLSearchParams(location.search).get('position')!=='popper'}/>;break
 case 'dialog':sample=<DemoDialog/>;break
 case 'alert-dialog':sample=[1,2,3,4].map(size=><DemoDialog key={size} alert size={size}/>);break
 case 'dropdown-menu':sample=<MenuDemo/>;break
 case 'context-menu':sample=<ContextMenu><ContextMenuTrigger style={{padding:32,border:'1px dashed var(--gray-a7)',borderRadius:'var(--radius-3)'}}>Right click here</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Open</ContextMenuItem><ContextMenuItem>Copy link</ContextMenuItem></ContextMenuContent></ContextMenu>;break
 case 'popover':sample=<Popover><PopoverTrigger render={<Button variant="soft"/>}>Comment</PopoverTrigger><PopoverContent><Heading size={3}>Add a comment</Heading><Textarea placeholder="Write a comment…" aria-label="Comment"/></PopoverContent></Popover>;break
 case 'hover-card':sample=<HoverCard><HoverCardTrigger render={<a href="#"/>}>Radix UI</HoverCardTrigger><HoverCardContent><Heading size={3}>Radix</Heading><Text size={2}>An open source component library.</Text></HoverCardContent></HoverCard>;break
 case 'tooltip':sample=<Tooltip><TooltipTrigger render={<Button variant="soft"/>}>Hover me</TooltipTrigger><TooltipContent>Add to favorites</TooltipContent></Tooltip>;break
 case 'card':sample=<>{(['surface','classic','ghost'] as const).map(v=><Card key={v} variant={v} style={{width:215}}><CardContent><strong>Emily Adams</strong><p style={{marginTop:8}}>emily@example.com</p></CardContent></Card>)}</>;break
 case 'callout':sample=<div style={{display:'flex',flexDirection:'column',gap:16,width:'100%'}}>{(['soft','surface','outline'] as const).map(v=><Callout key={v} variant={v}>Please upgrade to the new version.</Callout>)}</div>;break
 case 'data-list':sample=<DataList><dt>Status</dt><dd>Available</dd><dt>Name</dt><dd>Andy Adams</dd><dt>Email</dt><dd>andy@example.com</dd></DataList>;break
 case 'progress':sample=<>{variants.map(v=><Progress variant={v} value={60} key={v} style={{width:210}} aria-label={v}/>)}</>;break
 case 'slider':sample=<>{variants.map(v=><Slider variant={v} defaultValue={[40]} key={v} style={{width:210}} aria-label={v}/>)}</>;break
 case 'scroll-area':sample=<ScrollArea style={{boxSizing:'border-box',width:260,height:140,padding:16,border:'1px solid var(--gray-a5)'}}>{Array.from({length:10},(_,i)=><p key={i}>{text}</p>)}</ScrollArea>;break
 case 'separator':sample=<div style={{width:400,display:'flex',flexDirection:'column',gap:16}}><span>Tools for thought</span><Separator/><span>Made for the web</span></div>;break
 case 'skeleton':sample=<div style={{display:'flex',gap:16,alignItems:'center'}}><Skeleton style={{width:48,height:48,borderRadius:'50%'}}/><div style={{display:'grid',gap:8}}><Skeleton style={{width:180,height:12}}/><Skeleton style={{width:120,height:12}}/></div></div>;break
 case 'spinner':sample=<>{([1,2,3] as const).map(n=><Spinner key={n} scale={n}/>)}</>;break
 case 'aspect-ratio':sample=<>{[2/3,1,16/9].map(r=><div style={{width:180}} key={r}><AspectRatio ratio={r}><img src="./images/canyon.jpg" alt="Red canyon" style={{width:'100%',height:'100%',objectFit:'cover'}}/></AspectRatio></div>)}</>;break
 case 'inset':sample=<Card style={{width:320}}><CardContent><Inset side="top"><img src="./images/canyon.jpg" alt="Red canyon" style={{width:'100%',height:140,objectFit:'cover'}}/></Inset><p style={{marginTop:32}}>A window into the natural world.</p></CardContent></Card>;break
 case 'kbd':sample=<>{[1,2,3].map(n=><Kbd data-scale={n} key={n}>⌘ Tab</Kbd>)}</>;break
 case 'em':sample=<p>The <Em>quick brown fox</Em> jumps over the lazy dog.</p>;break
 case 'quote':sample=<p><Quote>Perfect typography is certainly the most elusive of all arts.</Quote></p>;break
 case 'strong':sample=<p>The most important thing is to <Strong>keep going</Strong>.</p>;break
 case 'code':sample=<>{(['solid','soft','outline','ghost'] as const).map(v=><Code key={v} variant={v}>console.log()</Code>)}</>;break
 case 'link':sample=<Link href="https://www.radix-ui.com">Sign up</Link>;break
 case 'heading':sample=<Heading size={6}>The quick brown fox</Heading>;break
 case 'blockquote':sample=<Blockquote>Perfect typography is certainly the most elusive of all arts.</Blockquote>;break
 case 'text':sample=<Text>{text}</Text>;break
 case 'tabs':case 'segmented-control':sample=<Tabs defaultValue="account"><TabsList variant={id==='tabs'?'line':'default'}><TabsTrigger value="account">Account</TabsTrigger><TabsTrigger value="documents">Documents</TabsTrigger><TabsTrigger value="settings">Settings</TabsTrigger></TabsList>{id==='tabs'&&<TabsContent value="account">Manage your account.</TabsContent>}</Tabs>;break
 case 'tab-nav':sample=<TabNav><TabNavLink href="#" active>Account</TabNavLink><TabNavLink href="#">Documents</TabNavLink><TabNavLink href="#">Settings</TabNavLink></TabNav>;break
 case 'table':sample=<Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>Emily Adams</TableCell><TableCell>emily@example.com</TableCell></TableRow><TableRow><TableCell>Andy Adams</TableCell><TableCell>andy@example.com</TableCell></TableRow></TableBody></Table>;break
 }
 return <div id="comparison-fixture" style={{boxSizing:'border-box',width:'max-content',maxWidth:760,marginTop:id==='select'?100:undefined,padding:24,display:'flex',alignItems:'center',gap:16}}>{sample}</div>
}
