import { Button,IconButton,Badge,Avatar,Checkbox,CheckboxCards,Radio,RadioGroup,RadioCards,Switch,TextField,TextArea,Select,Dialog,AlertDialog,Flex,DropdownMenu,ContextMenu,Popover,HoverCard,Tooltip,Card,Callout,DataList,Progress,Slider,ScrollArea,Separator,Skeleton,Spinner,AspectRatio,Inset,Kbd,Em,Quote,Strong,Code,Link,Heading,Blockquote,Text,Tabs,SegmentedControl,TabNav,Table } from '@radix-ui/themes'
const variants=['classic','surface','soft'] as const
const text='The quick brown fox jumps over the lazy dog.'
export function Gallery({id}:{id:string}){let sample
 switch(id){
 case 'button':case 'icon-button':sample=<>{(['classic','solid','soft','surface','outline','ghost'] as const).map(v=>id==='icon-button'?<IconButton key={v} variant={v} aria-label={v}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 2.8 5.7 6.3.9-4.5 4.4 1.1 6.2L12 17.3l-5.7 3 1.1-6.2L2.9 9.6l6.3-.9Z"/></svg></IconButton>:<Button variant={v} key={v}>Next</Button>)}</>;break
 case 'badge':sample=<>{(['solid','soft','surface','outline'] as const).map(v=><Badge variant={v} key={v}>New</Badge>)}</>;break
 case 'avatar':sample=<>{(['1','2','3','4','5'] as const).map(n=><Avatar size={n} fallback="JD" key={n}/>)}</>;break
 case 'checkbox':case 'checkbox-group':sample=<>{variants.map(v=><div key={v} style={{display:'flex',gap:12}}><Checkbox variant={v}/><Checkbox variant={v} defaultChecked/><Checkbox variant={v} checked="indeterminate"/></div>)}</>;break
 case 'checkbox-cards':sample=<CheckboxCards.Root defaultValue={['next']} style={{display:'flex',gap:16}}><CheckboxCards.Item value="next">Next.js</CheckboxCards.Item><CheckboxCards.Item value="remix">Remix</CheckboxCards.Item></CheckboxCards.Root>;break
 case 'radio-cards':sample=<RadioCards.Root defaultValue="next" style={{display:'flex',gap:16}}><RadioCards.Item value="next">Next.js</RadioCards.Item><RadioCards.Item value="remix">Remix</RadioCards.Item></RadioCards.Root>;break
 case 'radio':case 'radio-group':sample=<>{variants.map(v=><RadioGroup.Root variant={v} key={v} defaultValue="one" style={{display:'flex',flexDirection:'row',width:'auto',gap:12}}><RadioGroup.Item value="one"/><RadioGroup.Item value="two"/></RadioGroup.Root>)}</>;break
 case 'switch':sample=<>{variants.map(v=><div key={v} style={{display:'flex',gap:12}}><Switch variant={v}/><Switch variant={v} defaultChecked/></div>)}</>;break
 case 'text-field':sample=<>{variants.map(v=><TextField.Root key={v} variant={v} placeholder="Search the docs…" style={{width:210}}/>)}</>;break
 case 'text-area':sample=<>{variants.map(v=><TextArea key={v} variant={v} placeholder="Reply to comment…" style={{width:210}}/>)}</>;break
 case 'select':sample=<Select.Root defaultValue="apple"><Select.Trigger aria-label="Fruit"/><Select.Content position={new URLSearchParams(location.search).get("position")==="popper"?"popper":"item-aligned"}><Select.Group><Select.Label>Fruit</Select.Label><Select.Item value="apple">Apple</Select.Item><Select.Item value="banana">Banana</Select.Item><Select.Item value="blueberry">Blueberry</Select.Item><Select.Item disabled value="grape">Grape</Select.Item></Select.Group></Select.Content></Select.Root>;break
 case 'dialog':sample=<Dialog.Root><Dialog.Trigger><Button variant="soft">Open</Button></Dialog.Trigger><Dialog.Content size="3" maxWidth="450px"><Dialog.Title>Edit profile</Dialog.Title><Dialog.Description size="2" mb="4">Make changes to your profile.</Dialog.Description><form><label style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16,fontSize:14,fontWeight:500,lineHeight:"20px"}}>Name<TextField.Root defaultValue="Pedro Duarte"/></label><label style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16,fontSize:14,fontWeight:500,lineHeight:"20px"}}>Email<TextField.Root defaultValue="pedro@example.com"/></label><div style={{display:'flex',gap:12,justifyContent:'end',marginTop:16}}><Dialog.Close><Button variant="soft" color="gray">Cancel</Button></Dialog.Close><Dialog.Close><Button>Save changes</Button></Dialog.Close></div></form></Dialog.Content></Dialog.Root>;break
 case 'alert-dialog': {
  // The four Alert Dialog examples in the pinned Radix Themes Playground.
  const sizes = [
    { size: '1', width: 300, title: '2', titleMargin: '1', description: '1', margin: '3', gap: '2', action: '1' },
    { size: '2', width: 400, title: '5', titleMargin: '2', description: '2', margin: '4', gap: '3', action: '2' },
    { size: '3', width: 400, title: '5', titleMargin: '3', description: '2', margin: '4', gap: '3', action: '2' },
    { size: '4', width: 450, title: '6', titleMargin: '3', description: '3', margin: '5', gap: '3', action: '3' },
  ] as const
  sample = sizes.map(({ size, width, title, titleMargin, description, margin, gap, action }) => (
    <AlertDialog.Root key={size}>
      <AlertDialog.Trigger><Button size={size}>Open</Button></AlertDialog.Trigger>
      <AlertDialog.Content size={size} style={{ width: `calc(${width}px * var(--scaling))` }}>
        <AlertDialog.Title size={title} mb={titleMargin}>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size={description} mb={margin}>
          Are you sure? This application will no longer be accessible and any existing sessions will be expired.
        </AlertDialog.Description>
        <Flex gap={gap} mt={margin} justify="end">
          <AlertDialog.Cancel><Button size={action} variant="soft" color="gray">Cancel</Button></AlertDialog.Cancel>
          <AlertDialog.Action><Button size={action} color="red">Revoke</Button></AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ))
  break
 }
 case 'dropdown-menu':sample=<DropdownMenu.Root><DropdownMenu.Trigger><Button variant="soft">Options <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg></Button></DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.Item shortcut="⌘T">New tab</DropdownMenu.Item><DropdownMenu.Item disabled>New window</DropdownMenu.Item><DropdownMenu.Sub><DropdownMenu.SubTrigger>More tools</DropdownMenu.SubTrigger><DropdownMenu.SubContent><DropdownMenu.Item>Bookmark page</DropdownMenu.Item></DropdownMenu.SubContent></DropdownMenu.Sub><DropdownMenu.Separator/><DropdownMenu.CheckboxItem checked>Show bookmarks</DropdownMenu.CheckboxItem><DropdownMenu.RadioGroup value="comfortable"><DropdownMenu.RadioItem value="compact">Compact</DropdownMenu.RadioItem><DropdownMenu.RadioItem value="comfortable">Comfortable</DropdownMenu.RadioItem></DropdownMenu.RadioGroup><DropdownMenu.Separator/><DropdownMenu.Item color="red">Delete</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Root>;break
 case 'context-menu':sample=<ContextMenu.Root><ContextMenu.Trigger><div style={{padding:32,border:'1px dashed var(--gray-a7)',borderRadius:'var(--radius-3)'}}>Right click here</div></ContextMenu.Trigger><ContextMenu.Content><ContextMenu.Item>Open</ContextMenu.Item><ContextMenu.Item>Copy link</ContextMenu.Item></ContextMenu.Content></ContextMenu.Root>;break
 case 'popover':sample=<Popover.Root><Popover.Trigger><Button variant="soft">Comment</Button></Popover.Trigger><Popover.Content><Heading size="3">Add a comment</Heading><TextArea placeholder="Write a comment…"/></Popover.Content></Popover.Root>;break
 case 'hover-card':sample=<HoverCard.Root><HoverCard.Trigger><a href="#">Radix UI</a></HoverCard.Trigger><HoverCard.Content><Heading size="3">Radix</Heading><Text size="2">An open source component library.</Text></HoverCard.Content></HoverCard.Root>;break
 case 'tooltip':sample=<Tooltip content="Add to favorites"><Button variant="soft">Hover me</Button></Tooltip>;break
 case 'card':sample=<>{(['surface','classic','ghost'] as const).map(v=><Card key={v} variant={v} size="2" style={{width:215}}><strong>Emily Adams</strong><p style={{margin:0,marginTop:8}}>emily@example.com</p></Card>)}</>;break
 case 'callout':sample=<div style={{display:'flex',flexDirection:'column',gap:16,width:'100%'}}>{(['soft','surface','outline'] as const).map(v=><Callout.Root key={v} variant={v}><Callout.Icon><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg></Callout.Icon><Callout.Text>Please upgrade to the new version.</Callout.Text></Callout.Root>)}</div>;break
 case 'data-list':sample=<DataList.Root><DataList.Item><DataList.Label>Status</DataList.Label><DataList.Value>Available</DataList.Value></DataList.Item><DataList.Item><DataList.Label>Name</DataList.Label><DataList.Value>Andy Adams</DataList.Value></DataList.Item><DataList.Item><DataList.Label>Email</DataList.Label><DataList.Value>andy@example.com</DataList.Value></DataList.Item></DataList.Root>;break
 case 'progress':sample=<>{variants.map(v=><Progress key={v} variant={v} value={60} style={{width:210}}/>)}</>;break
 case 'slider':sample=<>{variants.map(v=><Slider key={v} variant={v} defaultValue={[40]} style={{width:210}}/>)}</>;break
 case 'scroll-area':sample=<ScrollArea style={{boxSizing:'border-box',width:260,height:140,padding:16,border:'1px solid var(--gray-a5)'}}>{Array.from({length:10},(_,i)=><p style={{margin:0}} key={i}>{text}</p>)}</ScrollArea>;break
 case 'separator':sample=<div style={{width:400,display:'flex',flexDirection:'column',gap:16}}><span>Tools for thought</span><Separator size="4"/><span>Made for the web</span></div>;break
 case 'skeleton':sample=<div style={{display:'flex',gap:16,alignItems:'center'}}><Skeleton style={{width:48,height:48,borderRadius:'50%'}}/><div style={{display:'grid',gap:8}}><Skeleton style={{width:180,height:12}}/><Skeleton style={{width:120,height:12}}/></div></div>;break
 case 'spinner':sample=<>{(['1','2','3'] as const).map(n=><Spinner key={n} size={n}/>)}</>;break
 case 'aspect-ratio':sample=<>{[2/3,1,16/9].map(r=><div style={{width:180}} key={r}><AspectRatio ratio={r}><img src="/images/canyon.jpg" alt="Red canyon" style={{width:'100%',height:'100%',objectFit:'cover'}}/></AspectRatio></div>)}</>;break
 case 'inset':sample=<Card style={{width:320}} size="2"><Inset clip="padding-box" side="top" pb="current"><img src="/images/canyon.jpg" alt="Red canyon" style={{display:'block',width:'100%',height:140,objectFit:'cover'}}/></Inset><p style={{margin:0,marginTop:16}}>A window into the natural world.</p></Card>;break
 case 'kbd':sample=<>{(['1','2','3'] as const).map(n=><Kbd size={n} key={n}>⌘ Tab</Kbd>)}</>;break
 case 'em':sample=<p style={{margin:0}}>The <Em>quick brown fox</Em> jumps over the lazy dog.</p>;break
 case 'quote':sample=<p style={{margin:0}}><Quote>Perfect typography is certainly the most elusive of all arts.</Quote></p>;break
 case 'strong':sample=<p style={{margin:0}}>The most important thing is to <Strong>keep going</Strong>.</p>;break
 case 'code':sample=<>{(['solid','soft','outline','ghost'] as const).map(v=><Code key={v} variant={v}>console.log()</Code>)}</>;break
 case 'link':sample=<Link href="https://www.radix-ui.com">Sign up</Link>;break
 case 'heading':sample=<Heading size="6">The quick brown fox</Heading>;break
 case 'blockquote':sample=<Blockquote>Perfect typography is certainly the most elusive of all arts.</Blockquote>;break
 case 'text':sample=<Text>{text}</Text>;break
 case 'tabs':sample=<Tabs.Root defaultValue="account"><Tabs.List><Tabs.Trigger value="account">Account</Tabs.Trigger><Tabs.Trigger value="documents">Documents</Tabs.Trigger><Tabs.Trigger value="settings">Settings</Tabs.Trigger></Tabs.List><div style={{paddingTop:8}}><Tabs.Content value="account">Manage your account.</Tabs.Content></div></Tabs.Root>;break
 case 'segmented-control':sample=<SegmentedControl.Root defaultValue="account"><SegmentedControl.Item value="account">Account</SegmentedControl.Item><SegmentedControl.Item value="documents">Documents</SegmentedControl.Item><SegmentedControl.Item value="settings">Settings</SegmentedControl.Item></SegmentedControl.Root>;break
 case 'tab-nav':sample=<TabNav.Root><TabNav.Link href="#" active>Account</TabNav.Link><TabNav.Link href="#">Documents</TabNav.Link><TabNav.Link href="#">Settings</TabNav.Link></TabNav.Root>;break
 case 'table':sample=<Table.Root><Table.Header><Table.Row><Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell><Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell></Table.Row></Table.Header><Table.Body><Table.Row><Table.Cell>Emily Adams</Table.Cell><Table.Cell>emily@example.com</Table.Cell></Table.Row><Table.Row><Table.Cell>Andy Adams</Table.Cell><Table.Cell>andy@example.com</Table.Cell></Table.Row></Table.Body></Table.Root>;break
 }
 return <div id="comparison-fixture" style={{boxSizing:'border-box',width:'max-content',maxWidth:760,marginTop:id==='select'?100:undefined,padding:24,display:'flex',alignItems:'center',gap:16}}>{sample}</div>
}
