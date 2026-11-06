from pathlib import Path
from urllib.request import urlopen,Request
from concurrent.futures import ThreadPoolExecutor
import re,json,hashlib
files=list(Path('src/examples').rglob('*.tsx'));sources={}
for p in files:
 s=p.read_text()
 for url in re.findall(r'https://(?:images\.unsplash\.com/[^"`\s<>]+|github\.com/[a-zA-Z0-9_-]+\.png)',s):
  # URL string query values in JSX are literal; exclude trailing punctuation in prose.
  sources[url]='./images/upstream-'+hashlib.sha256(url.encode()).hexdigest()[:12]+('.png' if '.png' in url else '.jpg')
def fetch(pair):
 url,dest=pair
 try:
  p=Path('public')/dest
  if not p.exists():p.write_bytes(urlopen(Request(url,headers={'User-Agent':'radix-base-reference-import/1.0'}),timeout=30).read())
  return {'url':url,'file':str(p),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'source':'shadcn/ui fixed example source; Unsplash photograph or GitHub avatar'}
 except Exception as e:return {'url':url,'error':str(e)}
with ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(fetch,sources.items()))
valid={r['url']:sources[r['url']] for r in results if 'file'in r}
for p in files:
 s=p.read_text()
 for a,b in valid.items():s=s.replace(a,b)
 # Deterministic fallback for interpolated avatars: local asset, no third-party runtime dependency.
 s=re.sub(r'`https://github.com/\$\{[^}]+\}\.png`','"./images/avatar.svg"',s)
 p.write_text(s)
Path('docs/assets.json').write_text(json.dumps(results,indent=2)+'\n')
print('Assets:',len(valid),'localized;',len(results)-len(valid),'errors')
