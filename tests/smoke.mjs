import { chromium } from '@playwright/test'
import { readFileSync,writeFileSync } from 'node:fs'
const inventory=JSON.parse(readFileSync('docs/inventory.json'))
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/google-chrome',args:['--no-sandbox']})
const page=await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1})
const results=[];let errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())})
for(const [group,items] of [['components',inventory.radix],['examples',inventory.create]])for(const item of items){errors=[];try{await page.goto(`http://localhost:5173/?verify=${group}-${item.id}#${group}/${item.id}`);await page.getByRole('heading',{name:item.title,exact:true}).first().waitFor();await page.locator('.demo-canvas').waitFor();await page.locator('.loading-text').waitFor({state:'detached',timeout:15000});await page.waitForTimeout(180);results.push({group,id:item.id,errors:[...errors],content:await page.locator('.demo-canvas').innerText().then(s=>s.length)});if(errors.length)console.log(item.id,errors.slice(0,2))}catch(e){results.push({group,id:item.id,error:e.message,errors:[...errors]});console.log(item.id,e.message)}}
writeFileSync('evidence/smoke.json',JSON.stringify(results,null,2));console.log('Pages:',results.length,'Failed:',results.filter(r=>r.error||r.errors.length).length)
await browser.close()
