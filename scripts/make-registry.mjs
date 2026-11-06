import { readFileSync,writeFileSync,readdirSync,existsSync,mkdirSync } from 'node:fs'
import { dirname,resolve } from 'node:path'
import ts from 'typescript'
const pkg=JSON.parse(readFileSync('package.json','utf8'))
const version={...pkg.dependencies,...pkg.devDependencies}
const file=(path)=>({path,type:path.includes('/ui/')?'registry:ui':path.includes('/hooks/')?'registry:hook':/\.(css|txt)$/.test(path)?'registry:file':'registry:lib',target:path.replace('src/components/ui/','@ui/').replace('src/lib/','@lib/').replace('src/hooks/','@hooks/')})
const themeFiles=readdirSync('src/lib/theme').map(n=>'src/lib/theme/'+n)
const core=['cn','class-variance-authority','@base-ui/react','lucide-react','@radix-ui/colors']
function dependencies(paths) {
 const packages=new Set(core)
 for(const p of paths) {const s=readFileSync(p,'utf8');const ast=ts.createSourceFile(p,s,ts.ScriptTarget.Latest,true);for(const n of ast.statements)if((ts.isImportDeclaration(n)||ts.isExportDeclaration(n))&&n.moduleSpecifier&&ts.isStringLiteral(n.moduleSpecifier)){const im=n.moduleSpecifier.text;if(im[0]==='.'||im.startsWith('@/'))continue;const name=im.startsWith('@')?im.split('/').slice(0,2).join('/'):im.split('/')[0];if(name!=='react'&&name!=='react-dom'&&version[name])packages.add(name)}}
 return [...packages].sort().map(n=>`${n}@${version[n]}`)
}
function closure(paths) {
 const found=new Set(themeFiles);const queue=[...paths]
 while(queue.length) {const p=queue.shift();if(found.has(p))continue;if(!existsSync(p))throw Error('Missing file '+p);found.add(p);const ast=ts.createSourceFile(p,readFileSync(p,'utf8'),ts.ScriptTarget.Latest,true);for(const n of ast.statements) {if(!(ts.isImportDeclaration(n)||ts.isExportDeclaration(n))||!n.moduleSpecifier||!ts.isStringLiteral(n.moduleSpecifier))continue;const im=n.moduleSpecifier.text;if(!(im.startsWith('@/')||im.startsWith('.')))continue;const root=im.startsWith('@/')?'src/'+im.slice(2):resolve(dirname(p),im);const path=['','.tsx','.ts','.css'].map(ext=>root+ext).find(existsSync);if(!path)throw Error(`${p}: cannot resolve ${im}`);queue.push(path.startsWith(process.cwd())?path.slice(process.cwd().length+1):path)}}
 return [...found].sort()
}
const docs='Import the installed lib/theme/styles.css once after Tailwind. Wrap your app with Theme from your configured lib alias + /theme/theme. Portals inherit Theme. Sources use the system font stack; no font network request. Files include the complete local dependency closure; no namespace or host-bound dependency URLs.'
function item(name,type,paths) {paths=closure(paths);return {name,type,title:name==='radix-base'?'Radix Base design system':name,description:'Radix Themes design tokens and Base UI behavior.',dependencies:dependencies(paths),registryDependencies:[],files:paths.map(file),...(name==='radix-base'?{config:{style:'base-nova'}}:{}),docs,meta:{reference:'Radix Themes 3.3.0',base:'@base-ui/react@1.9.0',dependencyStrategy:'Bundled transitive source files, relocatable static JSON'}}}
const ui=readdirSync('src/components/ui').filter(n=>n.endsWith('.tsx')).sort()
const items=[item('theme','registry:theme',[]),...ui.map(n=>item(n.slice(0,-4),'registry:ui',['src/components/ui/'+n])),item('radix-base','registry:base',ui.map(n=>'src/components/ui/'+n))]
const registry={$schema:'https://ui.shadcn.com/schema/registry.json',name:'radix-base',homepage:'https://www.radix-ui.com/themes',items}
writeFileSync('registry.json',JSON.stringify(registry,null,2)+'\n')
mkdirSync('public/docs',{recursive:true});writeFileSync('public/registry.json',JSON.stringify(registry,null,2)+'\n')
if(existsSync('docs/coverage.json'))writeFileSync('public/docs/coverage.json',readFileSync('docs/coverage.json'))
console.log(`Prepared ${items.length} registry items from shared source, with bundled transitive files.`)
