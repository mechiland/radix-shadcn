import { chromium } from '@playwright/test'
import { readFileSync,writeFileSync,mkdirSync } from 'node:fs'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
const inventory=JSON.parse(readFileSync('docs/inventory.json'))
const out=(process.env.RADIX_EVIDENCE_DIR||'evidence')+'/gallery';mkdirSync(out,{recursive:true})
const browser=await chromium.launch({headless:process.env.RADIX_HEADED!=='1',executablePath:process.env.CHROMIUM_PATH||'/usr/bin/google-chrome',args:['--no-sandbox','--force-color-profile=srgb']})
const context=await browser.newContext({viewport:{width:1000,height:1000},deviceScaleFactor:1,locale:'en-US'})
const pages=[await context.newPage(),await context.newPage()];const report=[]
const errors=[];for(const p of pages)p.on('pageerror',e=>errors.push(e.message))
async function pair(name,selectors,prepare){const images=[];const geometry=[]
 for(let i=0;i<2;i++){const page=pages[i];await page.bringToFront();await prepare?.(page);const locator=page.locator(selectors[i]).first();await locator.waitFor({state:'visible'});await locator.evaluate(async el=>{await Promise.all(el.getAnimations().filter(a=>a.effect?.getTiming().iterations!==Infinity).map(a=>a.finished.catch(()=>{})))});geometry.push(await locator.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return {width:r.width,height:r.height,font:s.fontFamily,fontSize:s.fontSize,lineHeight:s.lineHeight,padding:s.padding,borderRadius:s.borderRadius,background:s.backgroundColor,color:s.color}}));images.push(PNG.sync.read(await locator.screenshot({path:`${out}/${name}-${i?'implementation':'reference'}.png`,animations:'disabled'})))}
 const [a,b]=images,w=Math.max(a.width,b.width),h=Math.max(a.height,b.height);const pad=p=>{const x=new PNG({width:w,height:h});x.data.fill(255);PNG.bitblt(p,x,0,0,p.width,p.height,0,0);return x};const aa=pad(a),bb=pad(b),diff=new PNG({width:w,height:h});const mismatch=pixelmatch(aa.data,bb.data,diff.data,w,h,{threshold:.1,includeAA:false});writeFileSync(`${out}/${name}-diff.png`,PNG.sync.write(diff));report.push({name,reference:geometry[0],implementation:geometry[1],mismatchedPixels:mismatch,totalPixels:w*h,mismatchFraction:mismatch/(w*h)})
}
for(const appearance of ['light','dark'])for(const item of inventory.radix.filter(x=>!process.env.COMPONENTS||process.env.COMPONENTS.split(',').includes(x.id))){const theme={accentColor:'indigo',grayColor:'auto',appearance,radius:'medium',scaling:'100%',panelBackground:'translucent'},q=encodeURIComponent(JSON.stringify(theme))
 await Promise.all([pages[0].goto(`http://localhost:5174/?component=${item.id}&theme=${q}`),pages[1].goto(`http://localhost:5173/?fixture=1&component=${item.id}&theme=${q}`)])
 await pair(`${item.id}-${appearance}`,['#comparison-fixture','#comparison-fixture'])
 if(appearance==='light'&&['dialog','alert-dialog','dropdown-menu','context-menu','popover','hover-card','select','tooltip'].includes(item.id)){
  const open=async page=>{switch(item.id){case 'dialog':case 'alert-dialog':await page.getByRole('button',{name:'Open',exact:true}).click();break;case 'dropdown-menu':await page.getByRole('button',{name:/Options/}).click();break;case 'context-menu':await page.getByText('Right click here',{exact:true}).click({button:'right'});break;case 'popover':await page.getByRole('button',{name:'Comment',exact:true}).click();break;case 'hover-card':await page.getByRole('link',{name:'Radix UI'}).hover();break;case 'select':await page.getByRole('combobox',{name:'Fruit'}).press('ArrowDown');break;case 'tooltip':await page.getByRole('button',{name:'Hover me'}).hover();break}}
  const refs={'dialog':'.rt-BaseDialogContent','alert-dialog':'.rt-BaseDialogContent','dropdown-menu':'.rt-DropdownMenuContent','context-menu':'.rt-ContextMenuContent','popover':'.rt-PopoverContent','hover-card':'.rt-HoverCardContent','select':'.rt-SelectContent','tooltip':'.rt-TooltipContent'}
  await pair(`${item.id}-open`,[refs[item.id],`[data-slot=${item.id==='select'?'select':item.id}-content]`],open)
 }
 if(appearance==='light'&&item.id==='select'){
  await Promise.all([pages[0].goto(`http://localhost:5174/?component=select&position=popper&theme=${q}`),pages[1].goto(`http://localhost:5173/?fixture=1&component=select&position=popper&theme=${q}`)])
  await pair('select-popper-open',['.rt-SelectContent','[data-slot=select-content]'],page=>page.getByRole('combobox',{name:'Fruit'}).press('ArrowDown'))
 }
 if(appearance==='light'&&item.id==='dropdown-menu'){
  await pair('dropdown-menu-sub-open',['[role=menu]:has([role=menuitem]:text-is("Bookmark page"))','[data-slot=dropdown-menu-sub-content]'],async page=>{
   const submenu=page.getByRole('menuitem',{name:'More tools'});
   if(!await submenu.isVisible())await page.getByRole('button',{name:/Options/}).click();
   await submenu.hover();
   await page.getByRole('menuitem',{name:'Bookmark page'}).waitFor();
  })
 }
 console.log(item.id,appearance)
}
writeFileSync(`${out}/report.json`,JSON.stringify({browser:await browser.version(),headed:process.env.RADIX_HEADED==='1',viewport:{width:1000,height:1000},dpr:1,colorProfile:'sRGB',font:'Pinned system stack, same host and browser for both adapters',screenshot:'Animations frozen only during capture; real lifecycle tested separately',pixelmatch:{threshold:.1,includeAA:false},errors,results:report},null,2));await browser.close()
