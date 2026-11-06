import type { ComponentProps } from 'react'
export default function LocalLink({href,...props}:ComponentProps<'a'>) {return <a href={href} {...props}/>}
