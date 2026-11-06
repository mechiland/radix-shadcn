"use client"
import * as React from 'react'
import { Autocomplete } from '@base-ui/react/autocomplete'
import { cn } from 'cn'
import { SearchIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './dialog'
function textOf(node:React.ReactNode):string {if(typeof node==='string'||typeof node==='number')return String(node);if(Array.isArray(node))return node.map(textOf).join(' ');if(React.isValidElement<{children?:React.ReactNode}>(node))return textOf(node.props.children);return ''}
const QueryContext=React.createContext('')
function collect(node:React.ReactNode):string[]{return React.Children.toArray(node).flatMap(child=>{if(!React.isValidElement<{children?:React.ReactNode;value?:string}>(child))return [];if(child.type===CommandItem)return [child.props.value||textOf(child.props.children)];return collect(child.props.children)})}
function Command({children,className,...props}:React.ComponentProps<'div'>) {
 const [query,setQuery]=React.useState('');const items=React.useMemo(()=>collect(children),[children]);const filtered=items.filter(item=>item.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
 return <QueryContext.Provider value={query}><Autocomplete.Root inline open autoHighlight="always" items={items} filteredItems={filtered} mode="none" onValueChange={setQuery}><div data-slot="command" className={cn('flex w-full flex-col overflow-hidden',className)} {...props}>{children}</div></Autocomplete.Root></QueryContext.Provider>
}
function CommandInput({className,...props}:Autocomplete.Input.Props) {return <div data-slot="command-input-wrapper"><SearchIcon aria-hidden data-slot="command-input-icon"/><Autocomplete.Input data-slot="command-input" aria-label="Search commands" className={cn('min-w-0 flex-1',className)} {...props}/></div>}
function CommandList({children,...props}:Autocomplete.List.Props) {const list=React.Children.toArray(children as React.ReactNode);const empty=list.filter(x=>React.isValidElement(x)&&x.type===CommandEmpty);return <><Autocomplete.List data-slot="command-list" className="max-h-72 scroll-py-2 overflow-x-hidden overflow-y-auto" {...props}>{list.filter(x=>!(React.isValidElement(x)&&x.type===CommandEmpty))}</Autocomplete.List>{empty}</>}
function CommandItem({children,value,onSelect,...props}: Omit<Autocomplete.Item.Props,'value'|'onSelect'> & {value?:string;onSelect?:(value:string)=>void}) {const query=React.useContext(QueryContext),v=value||textOf(children);if(!v.toLocaleLowerCase().includes(query.toLocaleLowerCase()))return null;return <Autocomplete.Item data-slot="command-item" className="relative flex cursor-default items-center outline-none select-none data-disabled:pointer-events-none" value={v} {...props} onClick={e=>{props.onClick?.(e);onSelect?.(v)}}>{children}</Autocomplete.Item>}
function CommandEmpty(props:Autocomplete.Empty.Props) {return <Autocomplete.Empty data-slot="command-empty" {...props}/>}
function CommandGroup({heading,children,...props}:Autocomplete.Group.Props&{heading?:React.ReactNode}) {return <Autocomplete.Group data-slot="command-group" {...props}>{heading&&<Autocomplete.GroupLabel data-slot="command-group-heading">{heading}</Autocomplete.GroupLabel>}{children}</Autocomplete.Group>}
function CommandSeparator(props:React.ComponentProps<'hr'>) {return <hr role="presentation" aria-hidden="true" data-slot="command-separator" {...props}/>}
function CommandShortcut(props:React.ComponentProps<'span'>) {return <span data-slot="command-shortcut" {...props}/>}
function CommandDialog({children,title='Command palette',description='Search for a command to run.',className,showCloseButton=false,...props}:React.ComponentProps<typeof Dialog>&{title?:string;description?:string;className?:string;showCloseButton?:boolean}) {return <Dialog {...props}><DialogContent className={className} showCloseButton={showCloseButton}><DialogHeader className="sr-only"><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader>{children as React.ReactNode}</DialogContent></Dialog>}
export { Command,CommandInput,CommandList,CommandItem,CommandEmpty,CommandGroup,CommandSeparator,CommandShortcut,CommandDialog }
