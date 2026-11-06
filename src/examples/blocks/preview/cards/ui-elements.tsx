import { demoAction } from '@/examples/demo-actions'


import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { IconPlaceholder } from "@/examples/icon-placeholder"

export function UIElements() {
  const [sliderValue, setSliderValue] = React.useState<number[]>([500])
  const handleSliderValueChange = React.useCallback(
    (value: number | readonly number[]) => {
      if (typeof value === "number") {
        setSliderValue([value])
      } else {
        setSliderValue([...value])
      }
    },
    []
  )

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={demoAction}>Button</Button>
            <Button onClick={demoAction} variant="secondary">Secondary</Button>
            <Button onClick={demoAction} variant="outline">Outline</Button>
            <Button onClick={demoAction} variant="ghost">Ghost</Button>
          </div>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Two-factor authentication</ItemTitle>
              <ItemDescription className="text-pretty xl:hidden 2xl:block">
                Verify via email or phone number.
              </ItemDescription>
            </ItemContent>
            <ItemActions className="hidden md:flex">
              <Button onClick={demoAction} size="sm" variant="secondary">
                Enable
              </Button>
            </ItemActions>
          </Item>
        </div>
        <Slider
          value={sliderValue}
          onValueChange={handleSliderValueChange}
          max={1000}
          min={0}
          step={10}
          className="flex-1"
          aria-label="Slider"
        />
        <FieldGroup>
          <Field>
            <InputGroup>
              <InputGroupInput aria-label="Name" placeholder="Name" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>
                  <IconPlaceholder
                    lucide="SearchIcon"
                    tabler="IconSearch"
                    hugeicons="Search01Icon"
                    phosphor="MagnifyingGlassIcon"
                    remixicon="RiSearchLine"
                  />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field className="flex-1">
            <Textarea aria-label="Message" placeholder="Message" className="resize-none" />
          </Field>
        </FieldGroup>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <RadioGroup defaultValue="apple" className="ml-auto flex w-fit gap-3">
            <RadioGroupItem aria-label="apple" value="apple" />
            <RadioGroupItem aria-label="banana" value="banana" />
          </RadioGroup>
          <div className="flex gap-3">
            <Checkbox aria-label="Example checkbox" defaultChecked />
            <Checkbox aria-label="Example checkbox" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AlertDialog>
            <AlertDialogTrigger render={<Button aria-label="Open options" variant="outline" />}>
              <span className="hidden md:flex style-sera:md:hidden">
                Alert Dialog
              </span>
              <span className="flex md:hidden style-sera:md:flex">Dialog</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this
                  device and your data?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ButtonGroup>
            <Button aria-label="Open options" onClick={demoAction} variant="outline">
              <span className="style-sera:hidden">Button Group</span>
              <span className="hidden style-sera:block">Group</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button aria-label="Open options" variant="outline" size="icon" />}
              >
                <IconPlaceholder
                  lucide="ChevronUpIcon"
                  tabler="IconChevronUp"
                  hugeicons="ArrowUp01Icon"
                  phosphor="CaretUpIcon"
                  remixicon="RiArrowUpSLine"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="top" className="w-fit">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={demoAction}>Mute Conversation</DropdownMenuItem>
                  <DropdownMenuItem onClick={demoAction}>Mark as Read</DropdownMenuItem>
                  <DropdownMenuItem onClick={demoAction}>Block User</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                  <DropdownMenuItem onClick={demoAction}>Share Conversation</DropdownMenuItem>
                  <DropdownMenuItem onClick={demoAction}>Copy Conversation</DropdownMenuItem>
                  <DropdownMenuItem onClick={demoAction}>Report Conversation</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={demoAction} variant="destructive">
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <Switch aria-label="Example switch" defaultChecked className="ml-auto" />
        </div>
      </CardContent>
    </Card>
  )
}
