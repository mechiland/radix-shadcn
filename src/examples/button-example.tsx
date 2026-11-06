import { demoAction,demoLinkAction } from '@/examples/demo-actions'


import {
  Example,
  ExampleWrapper,
} from "@/examples/example"
import { Button, buttonVariants } from "@/components/ui/button"
import { IconPlaceholder } from "@/examples/icon-placeholder"

export default function ButtonExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1 2xl:grid-cols-1">
      <ButtonVariantsAndSizes />
      <ButtonIconRight />
      <ButtonIconLeft />
      <ButtonIconOnly />
      <ButtonInvalidStates />
      <ButtonExamples />
    </ExampleWrapper>
  )
}

function ButtonVariantsAndSizes() {
  return (
    <Example title="Variants & Sizes">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="xs">Default</Button>
        <Button onClick={demoAction} size="xs" variant="secondary">
          Secondary
        </Button>
        <Button onClick={demoAction} size="xs" variant="outline">
          Outline
        </Button>
        <Button onClick={demoAction} size="xs" variant="ghost">
          Ghost
        </Button>
        <Button onClick={demoAction} size="xs" variant="destructive">
          Destructive
        </Button>
        <Button onClick={demoAction} size="xs" variant="link">
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="sm">Default</Button>
        <Button onClick={demoAction} size="sm" variant="secondary">
          Secondary
        </Button>
        <Button onClick={demoAction} size="sm" variant="outline">
          Outline
        </Button>
        <Button onClick={demoAction} size="sm" variant="ghost">
          Ghost
        </Button>
        <Button onClick={demoAction} size="sm" variant="destructive">
          Destructive
        </Button>
        <Button onClick={demoAction} size="sm" variant="link">
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction}>Default</Button>
        <Button onClick={demoAction} variant="secondary">Secondary</Button>
        <Button onClick={demoAction} variant="outline">Outline</Button>
        <Button onClick={demoAction} variant="ghost">Ghost</Button>
        <Button onClick={demoAction} variant="destructive">Destructive</Button>
        <Button onClick={demoAction} variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="lg">Default</Button>
        <Button onClick={demoAction} size="lg" variant="secondary">
          Secondary
        </Button>
        <Button onClick={demoAction} size="lg" variant="outline">
          Outline
        </Button>
        <Button onClick={demoAction} size="lg" variant="ghost">
          Ghost
        </Button>
        <Button onClick={demoAction} size="lg" variant="destructive">
          Destructive
        </Button>
        <Button onClick={demoAction} size="lg" variant="link">
          Link
        </Button>
      </div>
    </Example>
  )
}

function ButtonIconRight() {
  return (
    <Example title="Icon Right">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="xs">
          Default{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="xs" variant="secondary">
          Secondary{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="xs" variant="outline">
          Outline{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="xs" variant="ghost">
          Ghost{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="xs" variant="destructive">
          Destructive{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="xs" variant="link">
          Link{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="sm">
          Default
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="sm" variant="secondary">
          Secondary{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="sm" variant="outline">
          Outline{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} size="sm" variant="ghost">
          Ghost{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="sm" variant="destructive">
          Destructive{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="sm" variant="link">
          Link{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction}>
          Default{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} variant="secondary">
          Secondary{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} variant="outline">
          Outline{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} variant="ghost">
          Ghost{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} variant="destructive">
          Destructive{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} variant="link">
          Link{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="lg">
          Default{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="lg" variant="secondary">
          Secondary{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="lg" variant="outline">
          Outline{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="lg" variant="ghost">
          Ghost{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="lg" variant="destructive">
          Destructive{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
        <Button onClick={demoAction} size="lg" variant="link">
          Link{" "}
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Button>
      </div>
    </Example>
  )
}

function ButtonIconLeft() {
  return (
    <Example title="Icon Left">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="xs">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button onClick={demoAction} size="xs" variant="secondary">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button onClick={demoAction} size="xs" variant="outline">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button onClick={demoAction} size="xs" variant="ghost">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button onClick={demoAction} size="xs" variant="destructive">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button onClick={demoAction} size="xs" variant="link">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="sm">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button onClick={demoAction} size="sm" variant="secondary">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button onClick={demoAction} size="sm" variant="outline">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button onClick={demoAction} size="sm" variant="ghost">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button onClick={demoAction} size="sm" variant="destructive">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button onClick={demoAction} size="sm" variant="link">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction}>
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button onClick={demoAction} variant="secondary">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button onClick={demoAction} variant="outline">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button onClick={demoAction} variant="ghost">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button onClick={demoAction} variant="destructive">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button onClick={demoAction} variant="link">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="lg">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button onClick={demoAction} size="lg" variant="secondary">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button onClick={demoAction} size="lg" variant="outline">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button onClick={demoAction} size="lg" variant="ghost">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button onClick={demoAction} size="lg" variant="destructive">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button onClick={demoAction} size="lg" variant="link">
          <IconPlaceholder
            lucide="ArrowLeftCircleIcon"
            hugeicons="CircleArrowLeft02Icon"
            tabler="IconCircleArrowLeft"
            phosphor="ArrowCircleLeftIcon"
            remixicon="RiArrowLeftCircleLine"
            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
    </Example>
  )
}

function ButtonIconOnly() {
  return (
    <Example title="Icon Only">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-xs">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-xs" variant="secondary">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-xs" variant="outline">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-xs" variant="ghost">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-xs" variant="destructive">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-xs" variant="link">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-sm">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-sm" variant="secondary">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-sm" variant="outline">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-sm" variant="ghost">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-sm" variant="destructive">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-sm" variant="link">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon" variant="secondary">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon" variant="outline">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon" variant="ghost">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon" variant="destructive">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon" variant="link">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-lg">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-lg" variant="secondary">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-lg" variant="outline">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-lg" variant="ghost">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-lg" variant="destructive">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
        <Button onClick={demoAction} aria-label="Arrow Right" size="icon-lg" variant="link">
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
          />
        </Button>
      </div>
    </Example>
  )
}

function ButtonExamples() {
  return (
    <Example title="Examples">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Button onClick={demoAction} variant="outline">Cancel</Button>
          <Button onClick={demoAction}>
            Submit{" "}
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={demoAction} variant="destructive">Delete</Button>
          <Button onClick={demoAction} aria-label="Arrow Right" size="icon">
            <IconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight02Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
              data-icon="inline-end"
            />
          </Button>
        </div>
        <a onClick={demoLinkAction} href="#" className={buttonVariants()}>
          Link
        </a>
      </div>
    </Example>
  )
}

function ButtonInvalidStates() {
  return (
    <Example title="Invalid States">
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="xs" aria-invalid="true">
          Default
        </Button>
        <Button onClick={demoAction} size="xs" variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button onClick={demoAction} size="xs" variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button onClick={demoAction} size="xs" variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button onClick={demoAction} size="xs" variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button onClick={demoAction} size="xs" variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="sm" aria-invalid="true">
          Default
        </Button>
        <Button onClick={demoAction} size="sm" variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button onClick={demoAction} size="sm" variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button onClick={demoAction} size="sm" variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button onClick={demoAction} size="sm" variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button onClick={demoAction} size="sm" variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} aria-invalid="true">Default</Button>
        <Button onClick={demoAction} variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button onClick={demoAction} variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button onClick={demoAction} variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button onClick={demoAction} variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button onClick={demoAction} variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={demoAction} size="lg" aria-invalid="true">
          Default
        </Button>
        <Button onClick={demoAction} size="lg" variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button onClick={demoAction} size="lg" variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button onClick={demoAction} size="lg" variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button onClick={demoAction} size="lg" variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button onClick={demoAction} size="lg" variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
    </Example>
  )
}
