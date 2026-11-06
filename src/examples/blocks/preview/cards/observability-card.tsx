import { demoAction } from '@/examples/demo-actions'


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IconPlaceholder } from "@/examples/icon-placeholder"

export function ObservabilityCard() {
  return (
    <Card className="relative w-full max-w-md overflow-hidden pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-primary opacity-50 mix-blend-color" />
      <img
        src="./images/upstream-0171bf4a17c3.jpg"
        alt="Photo by mymind on Unsplash"
        title="Photo by mymind on Unsplash"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale"
      />
      <CardHeader>
        <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
        <CardDescription>
          Switch to the improved way to explore your data, with natural
          language. Monitoring will no longer be available on the Pro plan in
          November, 2025
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={demoAction}>
          Create Query{" "}
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
            data-icon="inline-end"
          />
        </Button>
        <Badge variant="secondary" className="ml-auto">
          Warning
        </Badge>
      </CardFooter>
    </Card>
  )
}
