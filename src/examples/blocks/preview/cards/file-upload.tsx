import * as React from "react"
import { toast } from "sonner"
import { demoAction } from '@/examples/demo-actions'


import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { IconPlaceholder } from "@/examples/icon-placeholder"

export function FileUpload() {
 const fileRef=React.useRef<HTMLInputElement>(null)
 const [file,setFile]=React.useState<File|null>(null)
 const accept=(file:File|undefined)=>{if(!file)return;if(file.size>10*1024*1024){toast.error("Choose a file under 10MB");return}setFile(file);toast.success(`${file.name} selected locally`)}
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
        <CardDescription>Drag and drop or browse</CardDescription>
      </CardHeader>
      <CardContent>
        <Empty className="border" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();accept(e.dataTransfer.files[0])}}>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <IconPlaceholder
                lucide="UploadCloudIcon"
                tabler="IconCloudUpload"
                hugeicons="CloudUploadIcon"
                phosphor="CloudArrowUpIcon"
                remixicon="RiUploadCloudLine"
              />
            </EmptyMedia>
            <EmptyTitle>{file?file.name:"Upload files"}</EmptyTitle>
            <EmptyDescription>PNG, JPG, PDF up to 10MB</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,application/pdf" className="sr-only" aria-label="Upload demo file" onChange={e=>accept(e.target.files?.[0])}/><Button onClick={()=>fileRef.current?.click()}>Browse Files</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
