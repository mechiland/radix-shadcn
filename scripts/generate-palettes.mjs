import * as colors from '@radix-ui/colors'
import { writeFileSync } from 'node:fs'
const names = ['gray','mauve','slate','sage','olive','sand','gold','bronze','brown','yellow','amber','orange','tomato','red','ruby','crimson','pink','plum','purple','violet','iris','indigo','blue','cyan','teal','jade','green','grass','lime','mint','sky']
let css = '/* Generated from @radix-ui/colors 3.0.0 (MIT). Do not edit palettes by hand. */\n'
for (const dark of [false,true]) {
 css += `.ds-theme${dark?'.dark':':not(.dark)'} {\n`
 for(const name of names) for(const alpha of [false,true]) for(let i=1;i<=12;i++) {
  const scale = colors[name+(dark?'Dark':'')+(alpha?'A':'')]
  css += `--palette-${name}-${alpha?'a':''}${i}: ${scale[name+(alpha?'A':'')+i]};\n`
 }
 css+='}\n'
}
const contrast = {yellow:'#21201c',amber:'#21201c',sky:'#1c2024',mint:'#1a211e',lime:'#1d211c'}
for(const name of names) {
 css+=`[data-accent-color="${name}"], [data-color="${name}"] {\n`
 for(const alpha of [false,true]) for(let i=1;i<=12;i++) css+=`--accent-${alpha?'a':''}${i}:var(--palette-${name}-${alpha?'a':''}${i});\n`
 css+=`--accent-contrast:${contrast[name]||'white'};\n}\n`
}
for(const name of names.slice(0,6)) {
 css+=`.ds-theme[data-gray-color="${name}"] {\n`
 for(const alpha of [false,true]) for(let i=1;i<=12;i++) css+=`--gray-${alpha?'a':''}${i}:var(--palette-${name}-${alpha?'a':''}${i});\n`
 css+='}\n'
}
writeFileSync('src/lib/theme/palettes.css',css)
