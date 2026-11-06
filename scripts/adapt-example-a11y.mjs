import ts from 'typescript'
import {readFileSync,writeFileSync,readdirSync} from 'node:fs'
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name])}
const fields=new Set(['Input','Textarea','InputGroupInput','InputGroupTextarea','NativeSelect','SelectTrigger','Checkbox','Switch','RadioGroupItem','InputOTP','ComboboxInput'])
const buttons=new Set(['Button','InputGroupButton','TabsTrigger','Toggle','ToggleGroupItem','ComboboxTrigger'])
const editsReport=[]
for(const path of walk('src/examples').filter(p=>p.endsWith('.tsx')&&!p.includes('local-')&&!p.endsWith('icon-placeholder.tsx'))){const source=readFileSync(path,'utf8'),ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),edits=[];let actions=false
 function visit(n){if(ts.isJsxOpeningElement(n)||ts.isJsxSelfClosingElement(n)){const name=n.tagName.getText(ast),attrs=n.attributes.properties;const get=k=>attrs.find(a=>ts.isJsxAttribute(a)&&a.name.getText(ast)===k);const str=k=>{const a=get(k)?.initializer;return a&&ts.isStringLiteral(a)?a.text:undefined};const at=n.tagName.end
 let owner=n;while(owner.parent&&!ts.isJsxElement(owner))owner=owner.parent
 const children=ts.isJsxElement(owner)?owner.children:[];const childText=children.filter(c=>ts.isJsxText(c)).map(c=>c.text).join('').trim();const childrenCode=children.map(c=>c.getText(ast)).join(' ')
 let context='';for(let p=n.parent;p;p=p.parent)if(ts.isJsxElement(p)&&p.openingElement.tagName.getText(ast)==='Example'){const t=p.openingElement.attributes.properties.find(a=>ts.isJsxAttribute(a)&&a.name.getText(ast)==='title');if(t?.initializer&&ts.isStringLiteral(t.initializer))context=t.initializer.text;break}
 const id=str('id'),hasLabel=id&&(source.includes(`htmlFor="${id}"`)||source.includes(`htmlFor='${id}'`));let withinLabel=false;for(let p=n.parent;p&&p!==owner?.parent;p=p.parent)if(ts.isJsxElement(p)&&['label','Label','FieldLabel'].includes(p.openingElement.tagName.getText(ast)))withinLabel=true
 if(!get('aria-label')&&!get('aria-labelledby')&&!hasLabel&&!withinLabel){
  let label
  if(fields.has(name))label=str('placeholder')||str('name')||str('value')||`${context||'Example'} ${name.replace(/([a-z])([A-Z])/g,'$1 $2').toLowerCase()}`
  if(buttons.has(name)&&!childText&&!/sr-only/.test(childrenCode)){const icon=childrenCode.match(/lucide="([^"]+)"/);label=icon?icon[1].replace(/Icon$/,'').replace(/([a-z])([A-Z])/g,'$1 $2'):str('value')||'Open options'}
  if(label)edits.push({at,text:` aria-label=${JSON.stringify(label)}`})
 }
 if(name==='InputGroupButton'&&!get('onClick')&&!get('render')&&!get('disabled')){let inRender=false;for(let p=n.parent;p&&p!==owner?.parent;p=p.parent)if(ts.isJsxAttribute(p)&&p.name.getText(ast)==='render')inRender=true;if(!inRender){edits.push({at,text:' onClick={demoAction}'});actions=true}}
 }ts.forEachChild(n,visit)}visit(ast)
 if(edits.length){let result=source;for(const e of edits.sort((a,b)=>b.at-a.at))result=result.slice(0,e.at)+e.text+result.slice(e.at);if(actions&&!/import\s*\{[^}]*\bdemoAction\b[^}]*\}\s*from ['"]@\/examples\/demo-actions['"]/.test(source))result="import { demoAction } from '@/examples/demo-actions'\n"+result;writeFileSync(path,result);editsReport.push({path,changes:edits.length})}
}
writeFileSync('docs/example-a11y-adaptations.json',JSON.stringify(editsReport,null,2));console.log('Added source-level names/actions in',editsReport.length,'example files; no runtime DOM patching.')
