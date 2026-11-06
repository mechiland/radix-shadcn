import { demoAction } from '@/examples/demo-actions'
import {
  Example,
  ExampleWrapper,
} from "@/examples/example"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { IconPlaceholder } from "@/examples/icon-placeholder"

export default function AvatarExample() {
  return (
    <ExampleWrapper>
      <AvatarSizes />
      <AvatarWithBadge />
      <AvatarWithBadgeIcon />
      <AvatarGroupExample />
      <AvatarGroupWithCount />
      <AvatarGroupWithIconCount />
      <AvatarInEmpty />
    </ExampleWrapper>
  )
}

function AvatarSizes() {
  return (
    <Example title="Sizes">
      <div className="flex flex-wrap items-center gap-2">
        <Avatar size="sm">
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </Example>
  )
}

function AvatarWithBadge() {
  return (
    <Example title="Badge">
      <div className="flex flex-wrap items-center gap-2">
        <Avatar size="sm">
          <AvatarImage
            src="./images/upstream-5375e090f5f1.png"
            alt="@jorgezreik"
          />
          <AvatarFallback>JZ</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <Avatar>
          <AvatarImage
            src="./images/upstream-5375e090f5f1.png"
            alt="@jorgezreik"
          />
          <AvatarFallback>JZ</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <Avatar size="lg">
          <AvatarImage
            src="./images/upstream-5375e090f5f1.png"
            alt="@jorgezreik"
          />
          <AvatarFallback>JZ</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>JZ</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <Avatar>
          <AvatarFallback>JZ</AvatarFallback>
          <AvatarBadge />
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>JZ</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      </div>
    </Example>
  )
}

function AvatarWithBadgeIcon() {
  return (
    <Example title="Badge with Icon">
      <div className="flex flex-wrap items-center gap-2">
        <Avatar size="sm">
          <AvatarImage
            src="./images/upstream-fc5e87c5ff35.png"
            alt="@pranathip"
          />
          <AvatarFallback>PP</AvatarFallback>
          <AvatarBadge>
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </AvatarBadge>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="./images/upstream-fc5e87c5ff35.png"
            alt="@pranathip"
          />
          <AvatarFallback>PP</AvatarFallback>
          <AvatarBadge>
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </AvatarBadge>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage
            src="./images/upstream-fc5e87c5ff35.png"
            alt="@pranathip"
          />
          <AvatarFallback>PP</AvatarFallback>
          <AvatarBadge>
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
          </AvatarBadge>
        </Avatar>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback>PP</AvatarFallback>
          <AvatarBadge>
            <IconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            />
          </AvatarBadge>
        </Avatar>
        <Avatar>
          <AvatarFallback>PP</AvatarFallback>
          <AvatarBadge>
            <IconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            />
          </AvatarBadge>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>PP</AvatarFallback>
          <AvatarBadge>
            <IconPlaceholder
              lucide="CheckIcon"
              tabler="IconCheck"
              hugeicons="Tick02Icon"
              phosphor="CheckIcon"
              remixicon="RiCheckLine"
            />
          </AvatarBadge>
        </Avatar>
      </div>
    </Example>
  )
}

function AvatarGroupExample() {
  return (
    <Example title="Group">
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="./images/upstream-96b8bd25ab6e.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="./images/upstream-eb59b55e1933.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="./images/upstream-96b8bd25ab6e.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="./images/upstream-eb59b55e1933.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar size="lg">
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage
            src="./images/upstream-96b8bd25ab6e.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage
            src="./images/upstream-eb59b55e1933.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </AvatarGroup>
    </Example>
  )
}

function AvatarGroupWithCount() {
  return (
    <Example title="Group with Count">
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="./images/upstream-96b8bd25ab6e.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="./images/upstream-eb59b55e1933.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="./images/upstream-96b8bd25ab6e.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="./images/upstream-eb59b55e1933.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar size="lg">
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage
            src="./images/upstream-96b8bd25ab6e.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage
            src="./images/upstream-eb59b55e1933.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </Example>
  )
}

function AvatarGroupWithIconCount() {
  return (
    <Example title="Group with Icon Count">
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="./images/upstream-96b8bd25ab6e.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarImage
            src="./images/upstream-eb59b55e1933.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="./images/upstream-0a10b9bc070f.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="./images/upstream-96b8bd25ab6e.png"
            alt="@maxleiter"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="./images/upstream-eb59b55e1933.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar size="lg">
          <AvatarImage
            src="./images/upstream-0a10b9bc070f.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage
            src="./images/upstream-96b8bd25ab6e.png"
            alt="@maxleiter"
            className="grayscale"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarImage
            src="./images/upstream-eb59b55e1933.png"
            alt="@evilrabbit"
            className="grayscale"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>
          <IconPlaceholder
            lucide="PlusIcon"
            tabler="IconPlus"
            hugeicons="PlusSignIcon"
            phosphor="PlusIcon"
            remixicon="RiAddLine"
          />
        </AvatarGroupCount>
      </AvatarGroup>
    </Example>
  )
}

function AvatarInEmpty() {
  return (
    <Example title="In Empty">
      <Empty className="w-full flex-none border">
        <EmptyHeader>
          <EmptyMedia>
            <AvatarGroup>
              <Avatar size="lg">
                <AvatarImage
                  src="./images/upstream-0a10b9bc070f.png"
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarImage
                  src="./images/upstream-96b8bd25ab6e.png"
                  alt="@maxleiter"
                  className="grayscale"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar size="lg">
                <AvatarImage
                  src="./images/upstream-eb59b55e1933.png"
                  alt="@evilrabbit"
                  className="grayscale"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>
                <IconPlaceholder
                  lucide="PlusIcon"
                  tabler="IconPlus"
                  hugeicons="PlusSignIcon"
                  phosphor="PlusIcon"
                  remixicon="RiAddLine"
                />
              </AvatarGroupCount>
            </AvatarGroup>
          </EmptyMedia>
          <EmptyTitle>No Team Members</EmptyTitle>
          <EmptyDescription>
            Invite your team to collaborate on this project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button onClick={demoAction}>
            <IconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            />
            Invite Members
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  )
}
