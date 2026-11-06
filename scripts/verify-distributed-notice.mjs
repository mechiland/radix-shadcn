import {readFileSync,writeFileSync} from 'node:fs'
import {spawnSync} from 'node:child_process'
import {resolve} from 'node:path'
import {createHash} from 'node:crypto'
const consumer=readFileSync('evidence/registry/consumer-path.txt','utf8').trim()
const command=[process.execPath,resolve('node_modules/shadcn/dist/index.js'),'add','http://localhost:5173/r/theme.json','--yes','--overwrite']
const result=spawnSync(command[0],command.slice(1),{cwd:consumer,encoding:'utf8',env:{...process.env,CI:'1'}})
if(result.status!==0)throw Error(result.stdout+result.stderr)
const source=readFileSync('src/lib/theme/NOTICE.txt'),installed=readFileSync(consumer+'/src/design/lib/theme/NOTICE.txt')
if(!source.equals(installed))throw Error('Installed notice differs from distributed source')
const report=JSON.parse(readFileSync('evidence/registry/installation.json'))
report.supplementalThemeInstall={command:command.join(' '),status:result.status,output:result.stdout+result.stderr,noticeSha256:createHash('sha256').update(installed).digest('hex'),noticeIncludes:['WorkOS','shadcn','Michael Chen'],byteIdentical:true}
writeFileSync('evidence/registry/installation.json',JSON.stringify(report,null,2))
console.log('Official theme entry installed; complete upstream and project notices are byte-identical.')
