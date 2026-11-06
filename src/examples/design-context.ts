export const FONTS = [{value:'system',name:'System UI',label:'System UI',fontFamily:'system-ui',category:'sans-serif'}]
export const STYLES = [{name:'radix',title:'Radix Themes'}]
export function useDesignSystemSearchParams() {return [{style:'radix',font:'system',fontHeading:'system'}] as const}
