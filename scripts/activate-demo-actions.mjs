// One-time adaptation of upstream examples: add feedback only where there is no action handler.
import ts from 'typescript'
import {readFileSync,writeFileSync,readdirSync} from 'node:fs'
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name])}
let buttons=0,links=0,labels=0
for(const path of walk('src/examples').filter(p=>p.endsWith('.tsx')&&!p.endsWith('/icon-placeholder.tsx')&&!p.endsWith('/local-link.tsx'))){const source=readFileSync(path,'utf8');const ast=ts.createSourceFile(path,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);const edits=[];let actions=false,linkActions=false
function visit(node){if(ts.isJsxOpeningElement(node)||ts.isJsxSelfClosingElement(node)){const name=node.tagName.getText(ast),attrs=node.attributes.properties;const attr=(n)=>attrs.find(a=>ts.isJsxAttribute(a)&&a.name.getText(ast)===n);const has=(n)=>!!attr(n);const at=node.tagName.end
 const parentRender=ts.isJsxSelfClosingElement(node)&&node.parent&&ts.isJsxExpression(node.parent)&&node.parent.parent&&ts.isJsxAttribute(node.parent.parent)&&node.parent.parent.name.getText(ast)==='render'
 if(name==='Button') {
  const child=ts.isJsxOpeningElement(node)&&ts.isJsxElement(node.parent)?node.parent.children.map(c=>c.getText(ast)).join(' '):''
  const icon=child.match(/lucide="([^"]+)"/)
  if(!has('aria-label')&&!has('aria-labelledby')&&/size=["']icon|size=\{["']icon/.test(node.getText(ast))&&!(child.match(/sr-only/))){let label=icon?icon[1].replace(/Icon$/,'').replace(/([a-z])([A-Z])/g,'$1 $2'):'Open options';edits.push({at,text:` aria-label=${JSON.stringify(label)}`});labels++}
  if(!has('onClick')&&!has('render')&&!has('disabled')&&!parentRender&&!has('form')&&attr('type')?.initializer?.getText(ast)!=='"submit"'){edits.push({at,text:' onClick={demoAction}'});actions=true;buttons++}
 }
 if(/^(DropdownMenuItem|ContextMenuItem|MenubarItem)$/.test(name)&&!has('onClick')&&!has('render')&&!has('disabled')){edits.push({at,text:' onClick={demoAction}'});actions=true;buttons++}
 if(attr('href')?.initializer?.getText(ast)==='"#"'&&!has('onClick')){edits.push({at,text:' onClick={demoLinkAction}'});linkActions=true;links++}
}ts.forEachChild(node,visit)}visit(ast)
if(edits.length){edits.sort((a,b)=>b.at-a.at);let s=source;for(const e of edits)s=s.slice(0,e.at)+e.text+s.slice(e.at);const im=[actions?'demoAction':'',linkActions?'demoLinkAction':''].filter(Boolean).join(',');if(im)s=`import { ${im} } from '@/examples/demo-actions'\n`+s;writeFileSync(path,s)}}
console.log({buttons,links,labels})
