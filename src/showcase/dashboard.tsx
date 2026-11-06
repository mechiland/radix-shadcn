// Port of radix-ui/website components/example-themes-dashboard.tsx (MIT) to the shadcn/Base UI components in this repo.
import * as React from "react"
import { Theme, useTheme } from "@/lib/theme/theme"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Heading, Link, Strong, Text } from "@/components/ui/typography"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  CopyIcon,
  Cross2Icon,
  DotsHorizontalIcon,
  DrawingPinFilledIcon,
  DrawingPinIcon,
  OpenInNewWindowIcon,
  PlusIcon,
  Share2Icon,
} from "./icons-dashboard"
import { allPeople, email } from "./people"
import "./dashboard.css"

/** Radix space scale step, e.g. `space(3)` → 12px at 100% scaling. */
const space = (n: number) => `var(--space-${n})`
const flexAlign = { start: "flex-start", center: "center", end: "flex-end", baseline: "baseline", stretch: "stretch" } as const

const row = (gap: number, extra?: React.CSSProperties): React.CSSProperties => ({ display: "flex", gap: space(gap), ...extra })
const column = (gap: number, extra?: React.CSSProperties): React.CSSProperties => ({ display: "flex", flexDirection: "column", gap: space(gap), ...extra })
const preventDefault = (e: React.MouseEvent) => e.preventDefault()

const Marker = ({ size = 16, style, ...props }: React.ComponentProps<"span"> & { size?: number }) => (
  <span
    {...props}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: size,
      height: size,
      color: "var(--palette-teal-11)",
      backgroundColor: "var(--palette-teal-a4)",
      borderRadius: "100%",
      ...style,
    }}
  />
)

const PersonAvatar = ({ index, scale }: { index: number; scale?: 3 }) => (
  <Avatar scale={scale}>
    <AvatarImage src={allPeople[index]?.image} alt="" />
    <AvatarFallback>{allPeople[index]?.name[0].toUpperCase()}</AvatarFallback>
  </Avatar>
)

/** Radix `<Card size="4">` with its padding box. */
const DashCard = ({ children }: { children: React.ReactNode }) => (
  <Card scale={4}>
    <CardContent>{children}</CardContent>
  </Card>
)

const CardTitle = ({ children, trim = true, mb = 2 }: { children: React.ReactNode; trim?: boolean; mb?: number }) => (
  <Heading as="h3" size={6} className={trim ? "dash-trim-start" : undefined} style={{ marginBottom: space(mb) }}>
    {children}
  </Heading>
)

const CornerActions = ({ gap = 0, children }: { gap?: number; children: React.ReactNode }) => (
  <div style={row(gap, { position: "absolute", top: 0, right: 0, margin: space(3) })}>{children}</div>
)

type ExampleLayoutProps = React.ComponentProps<"div"> & {
  align?: keyof typeof flexAlign
  focusable?: boolean
}

export const ExampleThemesDashboard = ({ focusable = true, align = "center", style, ...props }: ExampleLayoutProps) => {
  const theme = useTheme()

  // Interactive elements may be not focusable for homepage demo purposes
  const tabIndex = focusable ? undefined : -1

  // Simple state to make the example functional
  const [state, setState] = React.useState({
    todo: [
      { id: "a", completed: false },
      { id: "b", completed: false },
      { id: "c", completed: false },
      { id: "d", completed: false },
      { id: "e", completed: true },
      { id: "f", completed: true },
    ],
    activityPinned: true,
    financePinned: false,
  })

  const closeButton = (
    <CornerActions>
      <Button tabIndex={tabIndex} size="icon" variant="ghost" color="gray" highContrast aria-label="Close">
        <Cross2Icon width="20" height="20" />
      </Button>
    </CornerActions>
  )

  const pinActions = (pinned: boolean, toggle: () => void) => (
    <CornerActions>
      <Button tabIndex={tabIndex} size="icon" variant="ghost" color="gray" highContrast style={{ margin: 0 }} aria-label="Open in new window">
        <OpenInNewWindowIcon width="20" height="20" />
      </Button>
      <Button
        tabIndex={tabIndex}
        size="icon"
        variant={pinned ? "soft" : "ghost"}
        color="gray"
        highContrast
        style={{ margin: 0 }}
        aria-label={pinned ? "Unpin" : "Pin"}
        onClick={toggle}
      >
        {pinned ? <DrawingPinFilledIcon width="20" height="20" /> : <DrawingPinIcon width="20" height="20" />}
      </Button>
    </CornerActions>
  )

  const notificationGroup = (title: string, description: string) => (
    <div style={row(9, { alignItems: "flex-start", justifyContent: "space-between" })}>
      <div>
        <Heading as="h4" size={3} style={{ marginBottom: space(1) }}>
          {title}
        </Heading>
        <Text as="p" size={2} color="gray">
          {description}
        </Text>
      </div>
      <div style={column(4, { marginTop: space(1) })}>
        {(["Push", "Email", "Slack"] as const).map((channel) => (
          <Text key={channel} as="label" size={2} weight="bold" style={row(2)}>
            <Switch tabIndex={tabIndex} defaultChecked={channel !== "Slack"} />
            <Text size={2}>{channel}</Text>
          </Text>
        ))}
      </div>
    </div>
  )

  const plan = (name: string, members: string, price: string, features: string[], action: React.ReactNode) => (
    <div style={column(0)}>
      <Text weight="bold" size={5} style={{ marginBottom: space(1) }}>
        {name}
      </Text>
      <Text color="gray" size={2} style={{ marginBottom: space(4) }}>
        {members}
      </Text>
      <Text weight="bold" size={5} style={{ marginBottom: space(4) }}>
        {price}
        <Text size={5} weight="bold" style={{ color: "var(--gray-a8)" }}>
          {" / mo"}
        </Text>
      </Text>
      <div style={column(2)}>
        {features.map((feature) => (
          <div key={feature} style={row(2, { alignItems: "center" })}>
            <Marker>
              <CheckIcon width="14" height="14" />
            </Marker>
            <Text size={2}>{feature}</Text>
          </div>
        ))}
        {action}
      </div>
    </div>
  )

  const kpi = (label: string, change: string, trend: "up" | "down" | "flat", tone: "teal" | "red" | "gray", value: string) => (
    <div key={label}>
      <div style={row(2, { marginBottom: space(2), alignItems: "center" })}>
        <Text size={2} color="gray">
          {label}
        </Text>
        <Badge color={tone} variant={trend === "flat" ? "surface" : undefined} data-radius="full">
          {trend === "up" && <ArrowUpIcon width="12" height="12" style={{ marginLeft: -2 }} />}
          {trend === "down" && <ArrowDownIcon width="12" height="12" style={{ marginLeft: -2 }} />}
          {change}
        </Badge>
      </div>
      <Text as="div" size={8} weight="bold" style={{ marginBottom: space(2) }}>
        {value}
      </Text>
    </div>
  )

  const activity = (person: number, description: React.ReactNode, date: string) => (
    <div style={row(0, { justifyContent: "space-between", alignItems: "center" })}>
      <div style={row(3, { alignItems: "center" })}>
        <PersonAvatar index={person} scale={3} />
        <div>
          <Text as="div" size={2} weight="bold">
            {allPeople[person].name}
          </Text>
          <Text as="p" size={2} color="gray">
            {description}
          </Text>
        </div>
      </div>
      <Text size={2} color="gray">
        {date}
      </Text>
    </div>
  )

  const inlineLink = (children: React.ReactNode) => (
    <Link href="#" tabIndex={tabIndex} size={2} onClick={preventDefault}>
      {children}
    </Link>
  )

  const activities: [number, React.ReactNode, string][] = [
    [6, <>Approved invoice {inlineLink("#3461")}</>, "June 21, 11:34 am"],
    [8, <>Purchased {inlineLink("15 office chairs")} and {inlineLink("2 drum sets")}</>, "June 21, 9:43 am"],
    [8, <>Responded to your comment {inlineLink("#7514")}</>, "June 21, 9:41 am"],
    [28, <>Created {inlineLink("4 invoices")}</>, "June 20, 4:55 pm"],
    [26, <>Updated client details for {inlineLink("Acme Co.")}</>, "June 20, 3:30 pm"],
    [25, <>Created {inlineLink("a new report")}</>, "June 20, 3:22 pm"],
    [25, <>Deleted report {inlineLink("#34")}</>, "June 20, 1:00 pm"],
    [20, <>Joined the team</>, "June 20, 12:47 pm"],
  ]

  return (
    <div {...props} style={row(6, { alignItems: flexAlign[align], ...style })}>
      <div style={column(6, { flexShrink: 0, width: 640 })}>
        <DashCard>
          <CardTitle>Your team</CardTitle>

          <Text as="p" size={2} color="gray" style={{ marginBottom: space(5) }}>
            Invite and manage your team members.
          </Text>

          <div style={row(3, { marginBottom: space(5) })}>
            <div style={{ flexGrow: 1 }}>
              <Input tabIndex={tabIndex} placeholder="Email address" />
            </div>
            <Button tabIndex={tabIndex} size="2">
              Invite
            </Button>
          </div>

          <div style={column(0)}>
            {[4, 2, 12, 20, 16].map((number, i) => (
              <div key={number}>
                <div style={row(4, { alignItems: "center" })}>
                  <div style={row(3, { alignItems: "center", width: 200 })}>
                    <PersonAvatar index={number} />
                    <Link href="#" tabIndex={tabIndex} size={2} style={{ whiteSpace: "nowrap" }} onClick={preventDefault}>
                      {allPeople[number]?.name}
                    </Link>
                  </div>

                  <Text size={2} color="gray">
                    {email(allPeople[number]?.name)}
                  </Text>

                  <div style={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button color="gray" tabIndex={tabIndex} size="icon" variant="ghost" aria-label="Member actions" />}
                      >
                        <DotsHorizontalIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent data-variant="soft">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Change role</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {i !== 4 && (
                  <div>
                    <Separator style={{ marginBlock: space(3) }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </DashCard>

        <DashCard>
          <CardTitle>Notifications</CardTitle>

          <Text as="p" size={2} color="gray" style={{ marginBottom: space(6) }}>
            Manage your notification settings.
          </Text>

          <div>
            <Separator style={{ marginBlock: space(5) }} />
          </div>

          <div style={column(0)}>
            {notificationGroup("Comments", "Receive notifications when someone comments on your documents or mentions you.")}
            <div>
              <Separator style={{ marginBlock: space(5) }} />
            </div>
            {notificationGroup("Favorites", "Receive notifications when there is activity related to your favorited items.")}
            <div>
              <Separator style={{ marginBlock: space(5) }} />
            </div>
            {notificationGroup("New documents", "Receive notifications whenever people on your team create new documents.")}
          </div>
        </DashCard>

        <DashCard>
          <CardTitle>Pricing</CardTitle>

          <Text as="p" size={2} color="gray" style={{ marginBottom: space(5) }}>
            No credit card required. Every plan includes a 30-day trial of all Pro features.
          </Text>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: space(6) }}>
            {plan(
              "Basic",
              "3 team members",
              "$0",
              ["Expense tracking", "Invoicing", "Payment tracking", "Transaction recording", "Basic reports", "Email support"],
              <Button tabIndex={tabIndex} variant="outline" style={{ marginTop: space(3) }}>
                Downgrade
              </Button>,
            )}
            {plan(
              "Growth",
              "10 team members",
              "$49",
              ["Online payments", "Recurring invoices", "Bill management", "Inventory tracking", "Detailed reports", "Phone support"],
              <Button tabIndex={tabIndex} variant="outline" style={{ marginTop: space(3) }}>
                Go to Billing
              </Button>,
            )}
            {plan(
              "Pro",
              "Unlimited team members",
              "$99",
              ["Custom invoices", "Multi-business", "Team collaboration", "App integrations", "Advanced security", "Priority support"],
              <Button tabIndex={tabIndex} style={{ marginTop: space(3) }}>
                Upgrade
              </Button>,
            )}
          </div>
        </DashCard>
      </div>

      <div style={column(6, { flexShrink: 0, width: 416 })}>
        <DashCard>
          <CardTitle mb={5}>Sign up</CardTitle>

          <div style={{ marginBottom: space(5) }}>
            <div style={row(0, { marginBottom: space(1) })}>
              <Text as="label" size={2} weight="bold" {...{ htmlFor: "example-email-field" }}>
                Email address
              </Text>
            </div>
            <Input tabIndex={tabIndex} placeholder="Enter your email" id="example-email-field" />
          </div>

          <div style={{ marginBottom: space(5), position: "relative" }}>
            <div style={row(0, { alignItems: "baseline", justifyContent: "space-between", marginBottom: space(1) })}>
              <Text as="label" size={2} weight="bold" {...{ htmlFor: "example-password-field" }}>
                Password
              </Text>
              <Link href="#" tabIndex={tabIndex} size={2} onClick={preventDefault}>
                Forgot password?
              </Link>
            </div>
            <Input tabIndex={tabIndex} placeholder="Enter your password" id="example-password-field" />
          </div>

          <div style={row(3, { marginTop: space(6), justifyContent: "flex-end" })}>
            <Button tabIndex={tabIndex} variant="outline">
              Create an account
            </Button>
            <Button tabIndex={tabIndex}>Sign in</Button>
          </div>
        </DashCard>

        <DashCard>
          {closeButton}

          <CardTitle>Your company card</CardTitle>

          <Text as="p" size={2} color="gray" style={{ marginBottom: space(6) }}>
            View and manage your corporate card.
          </Text>

          <div style={{ padding: space(6), backgroundColor: "var(--gray-a3)", borderRadius: "var(--radius-4)" }}>
            <Theme
              config={{ ...theme, appearance: "dark" }}
              style={
                {
                  height: 168,
                  background: "linear-gradient(to top right, var(--accent-9), #E18BFF)",
                  boxShadow: "0 1px 20px -5px #7971E9AA",
                  borderRadius: "var(--radius-3)",
                  "--gray-12": "white",
                } as React.CSSProperties
              }
            >
              <div style={column(0, { justifyContent: "space-between", height: "100%" })}>
                <Text weight="medium" size={2} style={{ marginTop: space(3), marginInline: space(3) }}>
                  Sophie Johnson
                </Text>
                <div>
                  <div style={row(3, { alignItems: "center", marginBottom: space(1), marginInline: space(3) })}>
                    <Text size={2}>
                      4929 3849
                      {/* An empty span prevents iOS Safari from thinking it's a telephone number */}
                      <span> </span>
                      5027 1846
                    </Text>
                    <Button tabIndex={tabIndex} variant="ghost" color="gray" size="icon-xs" highContrast aria-label="Copy card number">
                      <CopyIcon />
                    </Button>
                  </div>
                  <div style={row(3, { marginBottom: space(2), marginInline: space(3) })}>
                    <Text size={2}>01 / 27</Text>
                    <Text size={2}>999</Text>
                  </div>
                </div>
              </div>
            </Theme>
          </div>

          <div style={row(3, { marginTop: space(6), justifyContent: "flex-end" })}>
            <Button tabIndex={tabIndex} variant="outline" color="red">
              Freeze
            </Button>
            <Button tabIndex={tabIndex}>Done</Button>
          </div>
        </DashCard>

        <DashCard>
          {closeButton}

          <div style={column(3, { alignItems: "center" })}>
            <Marker size={48}>
              <CheckIcon width="32" height="32" />
            </Marker>

            <CardTitle trim={false}>Invoice paid</CardTitle>
          </div>

          <Text as="p" size={3} style={{ textAlign: "center", marginBottom: space(5) }}>
            You paid $17,975.30. A receipt copy was sent to <Strong>accounting@example.com</Strong>
          </Text>

          <div style={column(3, { alignItems: "stretch" })}>
            <Button tabIndex={tabIndex}>Next invoice</Button>
            <Button tabIndex={tabIndex} variant="outline">
              Done
            </Button>
          </div>
        </DashCard>

        <DashCard>
          {closeButton}

          <CardTitle mb={5}>
            Invoice{" "}
            <Link href="#" tabIndex={tabIndex} size={6} weight="bold" onClick={preventDefault}>
              #3463
            </Link>
          </CardTitle>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: space(4), rowGap: space(5) }}>
            {(
              [
                ["Issued", "June 21, 2023"],
                ["Due", "July 21, 2023"],
                ["To", "Paradise Ventures", "742 Evergreen Terrace, Springfield, IL 62704"],
                ["From", "Rogue Widgets", "1600 Baker Street NW, Washington, DC 20500"],
              ] as const
            ).map(([label, value, address]) => (
              <div key={label}>
                <Text as="div" size={2} color="gray" style={{ marginBottom: space(1) }}>
                  {label}
                </Text>
                <Text as="div" size={3} weight="bold" style={address ? { marginBottom: space(1) } : undefined}>
                  {value}
                </Text>
                {address && (
                  <Text as="div" size={2}>
                    {address}
                  </Text>
                )}
              </div>
            ))}

            <div style={column(1, { gridColumn: "1 / -1" })}>
              <div style={row(0, { justifyContent: "space-between" })}>
                <Text size={2} color="gray" style={{ marginBottom: space(1) }}>
                  Services
                </Text>
                <Text size={2} color="gray" style={{ marginBottom: space(1) }}>
                  Price
                </Text>
              </div>
              <div style={row(0, { justifyContent: "space-between" })}>
                <Text size={3} weight="bold" style={{ marginBottom: space(1) }}>
                  Branding
                </Text>
                <Text size={2}>$20,000</Text>
              </div>
              <div style={row(0, { justifyContent: "space-between" })}>
                <Text size={3} weight="bold" style={{ marginBottom: space(1) }}>
                  Marketing website
                </Text>
                <Text size={2}>$17,500</Text>
              </div>
              <div>
                <Separator style={{ marginTop: space(1), marginBottom: space(2) }} />
              </div>
              <div style={row(0, { justifyContent: "space-between" })}>
                <Text size={2}>Total</Text>
                <Text size={2}>$38,500</Text>
              </div>
            </div>
          </div>

          <div style={row(3, { marginTop: space(6), justifyContent: "flex-end" })}>
            <Button tabIndex={tabIndex} variant="outline" color="red">
              Reject
            </Button>
            <Button tabIndex={tabIndex}>Approve</Button>
          </div>
        </DashCard>
      </div>

      <div style={column(6, { flexShrink: 0, width: 640 })}>
        <DashCard>
          <CardTitle>Financial performance</CardTitle>

          {pinActions(state.financePinned, () => setState((state) => ({ ...state, financePinned: !state.financePinned })))}

          <Text as="p" size={2} color="gray" style={{ marginBottom: space(6) }}>
            Review your company’s KPIs compared to the month before.
          </Text>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: space(5) }}>
            {kpi("MRR", "3.2%", "up", "teal", "$350K")}
            {kpi("OpEx", "12.8%", "up", "red", "$211K")}
            {kpi("CapEx", "8.8%", "down", "teal", "$94K")}
            {kpi("GPM", "1.2%", "down", "red", "44.6%")}
            {kpi("NPM", "0.0%", "flat", "gray", "9.1%")}
            {kpi("EBITDA", "4.1%", "up", "teal", "$443K")}
            {kpi("CAC", "11.0%", "down", "teal", "$146")}
            {kpi("LTV", "3%", "up", "teal", "$1,849")}
            {kpi("Churn", "1.1%", "up", "red", "12.4%")}
          </div>
        </DashCard>

        <DashCard>
          <CardTitle>Recent activity</CardTitle>

          {pinActions(state.activityPinned, () => setState((state) => ({ ...state, activityPinned: !state.activityPinned })))}

          <Text as="p" size={2} color="gray" style={{ marginBottom: space(7) }}>
            Review what has happened over the past days.
          </Text>

          <div style={column(0)}>
            {activities.map(([person, description, date], i) => (
              <React.Fragment key={date}>
                {i > 0 && (
                  <div>
                    <Separator />
                  </div>
                )}
                <div
                  style={column(3, {
                    marginTop: i === 0 ? undefined : space(5),
                    marginBottom: i === activities.length - 1 ? undefined : space(5),
                  })}
                >
                  {activity(person, description, date)}
                </div>
              </React.Fragment>
            ))}
          </div>
        </DashCard>

        <DashCard>
          <CardTitle>To-do</CardTitle>

          <CornerActions gap={3}>
            <Button tabIndex={tabIndex} size="icon" variant="ghost" color="gray" highContrast aria-label="Share">
              <Share2Icon width="20" height="20" />
            </Button>
            <Button tabIndex={tabIndex} size="icon" variant="ghost" color="gray" highContrast aria-label="Add">
              <PlusIcon width="20" height="20" />
            </Button>
          </CornerActions>

          <Text as="p" size={2} color="gray" style={{ marginBottom: space(5) }}>
            Stay on top of your daily tasks.
          </Text>

          <ToDoList focusable={focusable} items={state.todo} onItemsChange={(items) => setState({ ...state, todo: items })} />
        </DashCard>
      </div>
    </div>
  )
}

interface ToDoItem {
  id: string
  completed: boolean
}

interface ToDoListProps {
  focusable: boolean
  items: ToDoItem[]
  onItemsChange: (items: ToDoItem[]) => void
}

const ToDoList = ({ focusable, items, onItemsChange }: ToDoListProps) => {
  const tabIndex = focusable ? undefined : -1
  const todoLink = (children: React.ReactNode) => (
    <Link href="#" size={2} tabIndex={tabIndex} onClick={preventDefault}>
      {children}
    </Link>
  )
  const itemsContent: Record<string, React.ReactElement> = {
    a: <span>Respond to comment {todoLink("#384")} from Travis Ross</span>,
    b: <span>Invite {todoLink("Acme Co.")} team to Slack</span>,
    c: <span>Create a report {todoLink("requested")} by Danilo Sousa</span>,
    d: <span>Review support request {todoLink("#85")}</span>,
    e: <span>Close Q2 finances</span>,
    f: <span>Review invoice {todoLink("#3456")}</span>,
  }

  return (
    <div style={column(2)}>
      {items.map((item) => (
        <Text as="label" size={2} key={item.id}>
          <span style={row(2)}>
            <Checkbox
              tabIndex={tabIndex}
              checked={item.completed}
              onCheckedChange={(checked) => {
                const newItems = items.slice()
                const newItem = newItems.find((candidate) => candidate.id === item.id)!
                newItem.completed = !!checked
                onItemsChange(newItems)
              }}
            />
            <Text
              size={2}
              color={item.completed ? "gray" : undefined}
              style={
                {
                  textDecoration: item.completed ? "line-through" : undefined,
                  "--accent-12": "var(--accent-11)",
                } as React.CSSProperties
              }
            >
              {itemsContent[item.id]}
            </Text>
          </span>
        </Text>
      ))}
    </div>
  )
}
