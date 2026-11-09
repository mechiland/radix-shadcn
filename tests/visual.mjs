import { chromium } from '@playwright/test'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'
import { mkdirSync,writeFileSync } from 'node:fs'
const out=(process.env.RADIX_EVIDENCE_DIR||'evidence')+'/visual';mkdirSync(out,{recursive:true})
const matrix=[
 ['indigo-light',{}],['indigo-dark',{appearance:'dark'}],['yellow-light',{accentColor:'yellow'}],['yellow-dark',{accentColor:'yellow',appearance:'dark'}],['sky-light',{accentColor:'sky'}],['crimson-dark',{accentColor:'crimson',appearance:'dark'}],['gray-none-90-solid',{accentColor:'gray',grayColor:'gray',radius:'none',scaling:'90%',panelBackground:'solid'}],['mint-full-110-dark',{accentColor:'mint',grayColor:'sage',radius:'full',scaling:'110%',appearance:'dark'}],['amber-small-95-solid',{accentColor:'amber',grayColor:'sand',radius:'small',scaling:'95%',panelBackground:'solid'}],['violet-large-105',{accentColor:'violet',grayColor:'mauve',radius:'large',scaling:'105%'}],['grass-olive',{accentColor:'grass',grayColor:'olive'}],['blue-slate',{accentColor:'blue',grayColor:'slate'}]
]
const browser=await chromium.launch({headless:process.env.RADIX_HEADED!=='1',executablePath:process.env.CHROMIUM_PATH||'/usr/bin/google-chrome',args:['--no-sandbox','--force-color-profile=srgb']})
const context=await browser.newContext({viewport:{width:1000,height:1000},deviceScaleFactor:1,colorScheme:'light',locale:'en-US'})
const ref=await context.newPage(),app=await context.newPage();const results=[]
const defaultTheme={accentColor:'indigo',grayColor:'auto',appearance:'light',radius:'medium',scaling:'100%',panelBackground:'translucent'}
for(const [name,overrides] of matrix){const config={...defaultTheme,...overrides};const q=encodeURIComponent(JSON.stringify(config));await Promise.all([ref.goto(`http://localhost:5174/?theme=${q}`),app.goto(`http://localhost:5173/?fixture=1&theme=${q}`)]);await Promise.all([ref.locator('#fixture').waitFor(),app.locator('#fixture').waitFor()]);await Promise.all([ref.evaluate(()=>document.fonts.ready),app.evaluate(()=>document.fonts.ready)]);await app.waitForTimeout(220)
 const a=PNG.sync.read(await ref.locator('#fixture').screenshot({path:`${out}/${name}-reference.png`}));const b=PNG.sync.read(await app.locator('#fixture').screenshot({path:`${out}/${name}-implementation.png`}));const w=Math.max(a.width,b.width),h=Math.max(a.height,b.height)
 function pad(p){const n=new PNG({width:w,height:h,fill:true});n.data.fill(255);PNG.bitblt(p,n,0,0,p.width,p.height,0,0);return n}
 const aa=pad(a),bb=pad(b),diff=new PNG({width:w,height:h});const mismatched=pixelmatch(aa.data,bb.data,diff.data,w,h,{threshold:.1,includeAA:false});writeFileSync(`${out}/${name}-diff.png`,PNG.sync.write(diff))
 const metrics=async(page)=>page.locator('#fixture').evaluate(el=>({height:el.getBoundingClientRect().height,font:getComputedStyle(el).fontFamily,buttons:Array.from(el.querySelectorAll('button')).slice(0,7).map(e=>{const s=getComputedStyle(e);return {width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height,fontSize:s.fontSize,lineHeight:s.lineHeight,background:s.backgroundColor,color:s.color,borderRadius:s.borderRadius,padding:s.padding,shadow:s.boxShadow}})}))
 results.push({name,config,reference:await metrics(ref),implementation:await metrics(app),mismatchedPixels:mismatched,totalPixels:w*h,mismatchFraction:mismatched/(w*h)})
 console.log(name,(mismatched/(w*h)*100).toFixed(2)+'%')
}
writeFileSync(`${out}/report.json`,JSON.stringify({browser:await browser.version(),headed:process.env.RADIX_HEADED==='1',viewport:{width:1000,height:1000},dpr:1,colorProfile:'sRGB',pixelmatch:{threshold:.1,includeAA:false},note:'Diagnostic only, no percentage fidelity claim. Twelve representative combinations, not the Cartesian product. Differences must be reviewed by component region.',results},null,2))
await browser.close()
