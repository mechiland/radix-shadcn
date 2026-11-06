import {chromium} from '@playwright/test'
import {writeFileSync} from 'node:fs'
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/google-chrome',args:['--no-sandbox']})
const page=await browser.newPage({viewport:{width:1000,height:1000}}),results=[]
for(const [id,name,selector,mode]of [['dialog','Open','.rt-BaseDialogContent'],['popover','Comment','.rt-PopoverContent'],['dropdown-menu','Options','.rt-DropdownMenuContent'],['select','Fruit','.rt-SelectContent'],['select','Fruit','.rt-SelectContent','popper'],['tooltip','Hover me','.rt-TooltipContent']]){
 await page.goto(`http://localhost:5174/?component=${id}${mode?'&position='+mode:''}`)
 const trigger=id==='select'?page.getByRole('combobox',{name}):page.getByRole('button',{name:new RegExp(name)})
 if(id==='tooltip')await trigger.hover();else await trigger.click()
 const content=page.locator(selector);await content.waitFor()
 results.push({id,mode:mode||'default',computed:await content.evaluate(el=>{const s=getComputedStyle(el);return{animationName:s.animationName,animationDuration:s.animationDuration,animationTimingFunction:s.animationTimingFunction,animationDelay:s.animationDelay,transitionDuration:s.transitionDuration,transformOrigin:s.transformOrigin,keyframes:el.getAnimations().map(a=>a.effect?.getKeyframes())}})})
}
writeFileSync('evidence/animations/reference.json',JSON.stringify({version:'@radix-ui/themes@3.3.0',browser:await browser.version(),note:'Computed original CSS and public Web Animations keyframes; independent reference environment.',results},null,2));await browser.close();console.log('Recorded motion from fixed Radix reference')
