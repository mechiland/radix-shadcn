import {mkdtempSync,readFileSync,writeFileSync,mkdirSync,readdirSync,existsSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join,resolve} from 'node:path'
import {spawnSync} from 'node:child_process'
import {createHash} from 'node:crypto'
const root=process.cwd(),base=process.env.REGISTRY_URL||'http://localhost:5173/r',dir=mkdtempSync(join(tmpdir(),'radix-base-consumer-'))
const logs=[]
function run(args,cwd=dir){const r=spawnSync(args[0],args.slice(1),{cwd,encoding:'utf8',env:{...process.env,CI:'1'},maxBuffer:12*1024*1024});logs.push({command:args.join(' '),cwd,status:r.status,output:r.stdout+r.stderr});if(r.status!==0){save();throw Error(args.join(' ')+'\n'+r.stdout+r.stderr)}return r.stdout+r.stderr}
function save(){mkdirSync('evidence/registry',{recursive:true});writeFileSync('evidence/registry/installation.json',JSON.stringify({dir,base,logs},null,2))}
run(['npm','exec','--yes','--package=create-vite@9.3.4','--','create-vite','consumer','--template','react-ts'])
const consumer=join(dir,'consumer');run(['npm','install'],consumer);run(['npm','install','-D','--save-exact','tailwindcss@4.3.4','@tailwindcss/vite@4.3.4','@types/node@24.19.2'],consumer)
for(const f of ['tsconfig.json','tsconfig.app.json']){let s=readFileSync(join(consumer,f),'utf8');s=s.replace('"files":','"compilerOptions":{"paths":{"@/*":["./src/*"]}},\n"files":');if(f.includes('.app.'))s=s.replace('"compilerOptions": {','"compilerOptions": {\n"paths":{"@/*":["./src/*"]},');writeFileSync(join(consumer,f),s)}
writeFileSync(join(consumer,'src/index.css'),'@import "tailwindcss";\n')
writeFileSync(join(consumer,'vite.config.ts'),`import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import tailwindcss from '@tailwindcss/vite';import {fileURLToPath,URL} from 'node:url';export default defineConfig({plugins:[react(),tailwindcss()],resolve:{alias:{'@':fileURLToPath(new URL('./src',import.meta.url))}}})`)
const cli=[process.execPath,resolve('node_modules/shadcn/dist/index.js')]
run([...cli,'init','--base','base','--preset','nova','--yes','--no-monorepo'],consumer)
// Exercise configured non-default target directories and aliases.
const cfg=JSON.parse(readFileSync(join(consumer,'components.json')));cfg.aliases.ui='@/design/ui';cfg.aliases.lib='@/design/lib';cfg.aliases.hooks='@/design/hooks';writeFileSync(join(consumer,'components.json'),JSON.stringify(cfg,null,2))
run([...cli,'add',`${base}/button.json`,'--yes'],consumer)
const button=join(consumer,'src/design/ui/button.tsx');if(!existsSync(button)||!existsSync(join(consumer,'src/design/lib/theme/styles.css')))throw Error('Single component closure missing')
writeFileSync(join(consumer,'src/App.tsx'),`import {Theme} from '@/design/lib/theme/theme';import {Button} from '@/design/ui/button';import '@/design/lib/theme/styles.css';export default function App(){return <Theme><Button variant="classic">Installed button</Button></Theme>}`)
run(['npm','run','build'],consumer)
// Byte-identical reinstall should be a no-op. Modified files are tested separately with the official overwrite flag.
const hash=()=>createHash('sha256').update(readFileSync(button)).digest('hex'),first=hash()
run([...cli,'add',`${base}/button.json`,'--yes'],consumer);if(first!==hash())throw Error('Repeat install changed identical button')
writeFileSync(button,readFileSync(button,'utf8')+'\n// consumer modification for conflict verification\n')
const modified=hash();run([...cli,'add',`${base}/button.json`,'--dry-run'],consumer);if(modified!==hash())throw Error('Conflict preview mutated a consumer file');
run([...cli,'add',`${base}/button.json`,'--yes','--overwrite'],consumer);if(first!==hash())throw Error('Explicit overwrite failed to restore registry file')
run([...cli,'add',`${base}/radix-base.json`,'--yes','--overwrite'],consumer)
writeFileSync(join(consumer,'src/App.tsx'),`import {Theme} from '@/design/lib/theme/theme';import {Button} from '@/design/ui/button';import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription,DialogClose} from '@/design/ui/dialog';import {Checkbox} from '@/design/ui/checkbox';import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/design/ui/select';import '@/design/lib/theme/styles.css';export default function App(){return <Theme config={{accentColor:'yellow',grayColor:'auto',appearance:'dark',radius:'full',scaling:'110%',panelBackground:'translucent'}}><Button variant="classic">Installed button</Button><Checkbox aria-label="Installed checkbox"/><Dialog><DialogTrigger render={<Button/>}>Open installed dialog</DialogTrigger><DialogContent><DialogTitle>Installed dialog</DialogTitle><DialogDescription>Registry consumer</DialogDescription><DialogClose render={<Button/>}>Close</DialogClose></DialogContent></Dialog><Select items={[{value:'one',label:'One'},{value:'two',label:'Two'}]} defaultValue="one"><SelectTrigger aria-label="Installed select"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="one">One</SelectItem><SelectItem value="two">Two</SelectItem></SelectContent></Select></Theme>}`)
run(['npm','run','build'],consumer)
if(!readFileSync(join(consumer,'src/design/lib/theme/NOTICE.txt')).equals(readFileSync('src/lib/theme/NOTICE.txt')))throw Error('Distributed license notices differ');
const installed=JSON.parse(readFileSync(join(consumer,'package-lock.json')));const radix=Object.keys(installed.packages).filter(n=>n.includes('@radix-ui/react-'));if(radix.length)throw Error('Radix behavior dependency found: '+radix.join(','))
save();writeFileSync('evidence/registry/consumer-path.txt',consumer+'\n');console.log('Verified single component, transitive files, repeat install, explicit overwrite, full entry, configured aliases, typecheck and builds:',consumer)
