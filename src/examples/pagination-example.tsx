import { demoLinkAction } from '@/examples/demo-actions'


import {
  Example,
  ExampleWrapper,
} from "@/examples/example"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function PaginationExample() {
  return (
    <ExampleWrapper>
      <PaginationBasic />
      <PaginationSimple />
      <PaginationIconsOnly />
    </ExampleWrapper>
  )
}

function PaginationBasic() {
  return (
    <Example title="Basic">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={demoLinkAction} href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={demoLinkAction} href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={demoLinkAction} href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={demoLinkAction} href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={demoLinkAction} href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Example>
  )
}

function PaginationSimple() {
  return (
    <Example title="Simple">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink onClick={demoLinkAction} href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={demoLinkAction} href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={demoLinkAction} href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={demoLinkAction} href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={demoLinkAction} href="#">5</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Example>
  )
}

function PaginationIconsOnly() {
  return (
    <Example title="With Select">
      <div className="flex items-center justify-between gap-4">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
          <Select defaultValue="25">
            <SelectTrigger className="w-20" id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Pagination className="mx-0 w-auto">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={demoLinkAction} href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={demoLinkAction} href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Example>
  )
}
