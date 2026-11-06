"use client"
import * as React from 'react'
import { Autocomplete } from '@base-ui/react/autocomplete'
import { cn } from 'cn'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog'
function textOf(node:React.ReactNode):string {if(typeof node==='string'||typeof node==='number')return String(node);if(Array.isArray(node))return node.map(textOf).join(' ');if(React.isValidElement<{children?:React.ReactNode}>(node))return textOf(node.props.children);return ''}
const QueryContext=React.createContext('')
function collect(node:React.ReactNode):string[]{return React.Children.toArray(node).flatMap(child=>{if(!React.isValidElement<{children?:React.ReactNode;value?:string}>(child))return [];if(child.type===CommandItem)return [child.props.value||textOf(child.props.children)];return collect(child.props.children)})}
function Command({children,className,...props}:React.ComponentProps<'div'>) {
 const [query,setQuery]=React.useState('');const items=React.useMemo(()=>collect(children),[children]);const filtered=items.filter(item=>item.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
 return <QueryContext.Provider value={query}><Autocomplete.Root inline open autoHighlight="always" items={items} filteredItems={filtered} mode="none" onValueChange={setQuery}><div data-slot="command" className={cn('flex w-full flex-col overflow-hidden rounded-md bg-popover',className)} {...props}>{children}</div></Autocomplete.Root></QueryContext.Provider>
}
function CommandInput(props:Autocomplete.Input.Props) {return <Autocomplete.Input data-slot="input" className="w-full" aria-label="Search commands" {...props}/>}
function CommandList({children,...props}:Autocomplete.List.Props) {const list=React.Children.toArray(children as React.ReactNode);const empty=list.filter(x=>React.isValidElement(x)&&x.type===CommandEmpty);return <><Autocomplete.List data-slot="command-list" className="max-h-72 overflow-auto p-1" {...props}>{list.filter(x=>!(React.isValidElement(x)&&x.type===CommandEmpty))}</Autocomplete.List>{empty}</>}
function CommandItem({children,value,onSelect,...props}: Omit<Autocomplete.Item.Props,'value'|'onSelect'> & {value?:string;onSelect?:(value:string)=>void}) {const query=React.useContext(QueryContext),v=value||textOf(children);if(!v.toLocaleLowerCase().includes(query.toLocaleLowerCase()))return null;return <Autocomplete.Item data-slot="command-item" className="flex cursor-default items-center gap-2 rounded px-2 py-1.5 text-sm outline-none data-highlighted:bg-accent" value={v} {...props} onClick={e=>{props.onClick?.(e);onSelect?.(v)}}>{children}</Autocomplete.Item>}
function CommandEmpty(props:Autocomplete.Empty.Props) {return <Autocomplete.Empty className="p-4 text-center text-sm" {...props}/>}
function CommandGroup({heading,children,...props}:Autocomplete.Group.Props&{heading?:React.ReactNode}) {return <Autocomplete.Group {...props}>{heading&&<Autocomplete.GroupLabel className="px-2 py-1 text-xs text-muted-foreground">{heading}</Autocomplete.GroupLabel>}{children}</Autocomplete.Group>}
function CommandSeparator(props:React.ComponentProps<'hr'>) {return <hr role="presentation" aria-hidden="true" className="my-1 border-border" {...props}/>}
function CommandShortcut(props:React.ComponentProps<'span'>) {return <span className="ml-auto text-xs text-muted-foreground" {...props}/>}
function CommandDialog({children,title='Command palette',description='Search for a command to run.',className,showCloseButton=false,...props}:React.ComponentProps<typeof Dialog>&{title?:string;description?:string;className?:string;showCloseButton?:boolean}) {return <Dialog {...props}><DialogContent className={className} showCloseButton={showCloseButton}><DialogHeader className="sr-only"><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader>{children as React.ReactNode}</DialogContent></Dialog>}
export { Command,CommandInput,CommandList,CommandItem,CommandEmpty,CommandGroup,CommandSeparator,CommandShortcut,CommandDialog }
