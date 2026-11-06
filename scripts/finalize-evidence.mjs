import {readFileSync,writeFileSync,readdirSync,statSync,existsSync} from 'node:fs'
import {createHash} from 'node:crypto'
import assert from 'node:assert/strict'
const read=file=>JSON.parse(readFileSync(file,'utf8'))
const inventory=read('docs/inventory.json'),coverage=read('docs/coverage.json'),registry=read('registry.json')
assert.deepEqual(coverage.radix.map(x=>x.id),inventory.radix.map(x=>x.id));assert.deepEqual(coverage.create.map(x=>x.id),inventory.create.map(x=>x.id))
assert(readFileSync('evidence/build.log','utf8').includes('✓ built in'));
const stats=read('evidence/interaction-results.json').stats
assert.equal(stats.expected,17);assert.equal(stats.unexpected,0);assert.equal(stats.skipped,0);assert.equal(stats.flaky,0)
const smoke=read('evidence/smoke.json');assert.equal(smoke.length,113);assert(smoke.every(x=>!x.error&&!x.errors.length))
const axe=read('evidence/accessibility-examples.json');assert.equal(axe.length,68);assert(axe.every(x=>!x.violations.length&&!x.forms.orphanSubmits.length));assert(read('evidence/accessibility.json').every(x=>!x.violations.length))
const reports=Object.fromEntries(['gallery','visual','states'].map(group=>[group,read(`evidence/${group}/report.json`)]))
assert.equal(reports.gallery.results.length,100);assert.equal(reports.visual.results.length,12);assert.equal(reports.states.results.length,23);assert.deepEqual(reports.gallery.errors,[])
for(const [group,report] of Object.entries(reports))for(const x of report.results)for(const kind of ['reference','implementation','diff'])assert(existsSync(`evidence/${group}/${x.name}-${kind}.png`))
assert.equal(read('evidence/theme-options.json').length,71)
const animation=read('evidence/animations/report.json');assert.equal(animation.results.length,4);assert(animation.results.every(x=>!x.timeline.at(-1).visible&&x.timeline.some(f=>f.ending&&Number(f.opacity)<1)))
assert.equal(read('evidence/animations/reference.json').results.length,6)
for(const f of ['evidence/static.json','evidence/static-subpath.json','evidence/registry/interaction.json','evidence/distribution-audit.json'])assert.equal(read(f).status,'passed')
const install=read('evidence/registry/installation.json');assert(install.logs.every(x=>x.status===0));assert(install.supplementalThemeInstall.byteIdentical)
assert.equal(registry.items.length,70)
const consumer=readFileSync('evidence/registry/consumer-path.txt','utf8').trim();assert(readFileSync('src/lib/theme/NOTICE.txt').equals(readFileSync(consumer+'/src/design/lib/theme/NOTICE.txt')))
const pkg=read('package.json');assert(Object.values({...pkg.dependencies,...pkg.devDependencies}).every(v=>/^\d+\.\d+\.\d+/.test(v)))
const hash=file=>createHash('sha256').update(readFileSync(file)).digest('hex')
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name==='node_modules'?[]:e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name])}
const sourceFiles=['README.md','LICENSE','package.json','package-lock.json','components.json','registry.json','vite.config.ts','index.html',...['src','docs','scripts','tests','reference'].flatMap(walk)].sort()
const outputs=walk('dist').sort().map(file=>({file:file.slice(5),bytes:statSync(file).size,sha256:hash(file)}))
const attestations=['evidence/build.log','evidence/interaction-results.json','evidence/smoke.json','evidence/theme-options.json','evidence/accessibility.json','evidence/accessibility-examples.json','evidence/gallery/report.json','evidence/visual/report.json','evidence/states/report.json','evidence/animations/report.json','evidence/animations/reference.json','evidence/static.json','evidence/static-subpath.json','evidence/registry/installation.json','evidence/registry/interaction.json','evidence/distribution-audit.json']
const release={status:'passed',createdAt:new Date().toISOString(),referenceDate:inventory.date,versions:inventory.versions,coverage:{radix:coverage.radix.length,create:coverage.create.length,scenes:coverage.create.reduce((n,x)=>n+x.scenes.length,0),registry:registry.items.length},validation:{interaction:stats,smoke:113,createAxe:68,themeConfigurations:71,visualPairs:{gallery:100,matrix:12,states:23},animationModes:4,referenceMotionModes:6,consumer:'official CLI single/full/theme install, production build and interactions passed',static:'root + nested mount, without SPA rewrite'},limitations:coverage.limitations,sourceFiles:sourceFiles.map(file=>({file,sha256:hash(file)})),attestations:attestations.map(file=>({file,sha256:hash(file)})),production:{directory:'dist',files:outputs.length,bytes:outputs.reduce((n,x)=>n+x.bytes,0),sha256:createHash('sha256').update(JSON.stringify(outputs)).digest('hex'),outputs}}
writeFileSync('evidence/release.json',JSON.stringify(release,null,2)+'\n')
console.log(`Delivery accepted: ${release.coverage.radix} Radix sections, ${release.coverage.create} create pages, ${release.coverage.scenes} scenes, ${registry.items.length} registry items; 17 tests and all required evidence passed.`)
