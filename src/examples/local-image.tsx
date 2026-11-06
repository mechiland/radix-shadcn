import type { ComponentProps } from 'react'
export default function LocalImage({fill,priority,unoptimized,...props}:ComponentProps<'img'>&{fill?:boolean;priority?:boolean;unoptimized?:boolean}) {return <img {...props}/>}
