"""One-time source import. Inputs are pinned official Git checkouts; never run during build."""
from pathlib import Path
import re,json,hashlib,subprocess,shutil
root=Path('/tmp/radix-reference');up=root/'shadcn/apps/v4/registry/bases/base';out=Path('src/examples')
out.mkdir(parents=True,exist_ok=True)
# Freeze upstream navigation before adapting. getAllItems excludes component-example and names ending in digits.
entries=[]
for path in (up/'examples').glob('*-example.tsx'):
 if path.stem=='component-example':continue
 entries.append({'id':path.stem,'title':path.stem.removesuffix('-example').replace('-',' ').title(),'source':str(path.relative_to(root/'shadcn')),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'kind':'component'})
for name in ['preview-02','preview']:
 path=up/'blocks'/name/'index.tsx'
 entries.append({'id':name,'title':'Composition '+('01' if name=='preview-02' else '02'),'source':str(path.relative_to(root/'shadcn')),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'kind':'composition'})
website=(root/'website/app/themes/playground/page.client.tsx').read_text()
radix=[{'id':i,'title':t} for i,t in re.findall(r'<PlaygroundSectionTitle id="([^"]+)">([^<]+)</PlaygroundSectionTitle>',website)]
fixed={'date':'2026-11-06','repos':{n:subprocess.check_output(['git','-C',str(root/n),'rev-parse','HEAD'],text=True).strip() for n in ['themes','shadcn','website']},'versions':{'@radix-ui/themes':'3.3.0','@radix-ui/colors':'3.0.0','@base-ui/react':'1.9.0','shadcn':'4.23.0'},'radix':radix,'create':entries}
Path('docs/inventory.json').write_text(json.dumps(fixed,indent=2)+'\n')
for folder in ['examples','components','blocks/preview','blocks/preview-02']:
 for path in (up/folder).rglob('*.tsx'):
  if path.name.startswith('_') or path.stem=='component-example':continue
  rel=path.relative_to(up)
  dest=out/(path.name if folder=='examples' else rel)
  if folder=='components':dest=out/path.name
  s=path.read_text().replace('"use client"','')
  s=s.replace('@/registry/bases/base/ui/','@/components/ui/').replace('@/registry/bases/base/components/','@/examples/').replace('@/registry/bases/base/blocks/','@/examples/blocks/').replace('@/registry/bases/base/examples/','@/examples/')
  s=re.sub(r'@/app/[^"\n]+/components/icon-placeholder','@/examples/icon-placeholder',s)
  s=re.sub(r'@/app/[^"\n]+/lib/search-params','@/examples/design-context',s)
  s=s.replace('@/app/(create)/lib/fonts','@/examples/design-context').replace('@/registry/styles','@/examples/design-context')
  s=s.replace('"next/link"','"@/examples/local-link"').replace('"next/image"','"@/examples/local-image"')
  dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(s)
# Registry is data, only included public example entry points get loaded.
lines=['import { lazy } from "react"','export const examplePages = [']
for e in entries:
 p='./blocks/'+e['id']+'/index' if e['kind']=='composition' else './'+e['id']
 lines.append(json.dumps({k:e[k] for k in ['id','title','kind']})[:-1]+', component: lazy(() => import("'+p+'")) },')
lines.append(']');(out/'catalog.ts').write_text('\n'.join(lines))
shutil.copy(root/'shadcn/LICENSE',Path('docs/LICENSE-shadcn.txt'))
shutil.copy(root/'themes/LICENSE',Path('docs/LICENSE-radix-themes.txt'))
print('Frozen inventory:',len(radix),'Radix sections,',len(entries),'create pages')
