// Port of radix-ui/website components/example-themes-ecommerce.tsx (MIT) to the shadcn/Base UI components in this repo.
import * as React from "react"
import { cn } from "cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Inset } from "@/components/ui/adaptations"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Heading, Link, Strong, Text } from "@/components/ui/typography"
import { Theme, useTheme } from "@/lib/theme/theme"
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CalendarIcon,
  CrumpledPaperIcon,
  FontBoldIcon,
  FontItalicIcon,
  ImageIcon,
  InstagramLogoIcon,
  MagicWandIcon,
  MagnifyingGlassIcon,
  RulerHorizontalIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  VideoIcon,
} from "./icons-ecommerce"

type ExampleLayoutProps = Omit<React.ComponentProps<"div">, "align"> & {
  align?: "start" | "center" | "end" | "baseline" | "stretch"
  focusable?: boolean
}

// Radix space scale helpers (Radix `gap="N"`, `mb="N"`…)
const space = (n: number) => `var(--space-${n})`
const neg = (n: number) => `calc(-1 * var(--space-${n}))`
const flexAlign = { start: "flex-start", center: "center", end: "flex-end", baseline: "baseline", stretch: "stretch" } as const

// Radix `underline="hover"`: our Link has no hover-only mode ("auto" underlines high-contrast / in-colored-text links at rest).
const hoverUnderline = "none" as const

const preventDefault = (e: React.MouseEvent) => e.preventDefault()

const swatches: Record<string, string> = {
  White: "white",
  Gray: "var(--gray-9)",
  Black: "#1B1B18",
  Red: "var(--palette-red-9)",
  Pink: "var(--palette-pink-8)",
  Violet: "var(--palette-violet-9)",
  Blue: "var(--palette-blue-9)",
  Green: "var(--palette-teal-9)",
  Beige: "#E5DFCF",
}

const colorValues = ["White", "Gray", "Black", "Red", "Pink", "Violet", "Blue", "Green", "Beige"]

const Swatch = ({ value }: { value: string }) => (
  <>
    <span
      style={{
        flexShrink: 0,
        width: 16,
        height: 16,
        background: swatches[value],
        borderRadius: "var(--radius-1)",
        boxShadow: "inset 0 0 0 1px rgba(160, 160, 160, 0.4)",
      }}
    />
    {value}
  </>
)

export const ExampleThemesEcommerce = ({ focusable = true, align = "center", style, ...props }: ExampleLayoutProps) => {
  // Interactive elements may be not focusable for homepage demo purposes
  const tabIndex = focusable ? undefined : -1
  const theme = useTheme()

  // Simple state to make the example functional
  const [state, setState] = React.useState({
    sneakersBookmarked: false,
    jeansBookmarked: false,
    delivery: "",
    size: "9",
    material: "",
    color: "",
    productMaterial: "",
    productColor: "",
    productSizes: [] as string[],
  })

  const bookmarkButton = (bookmarked: boolean, key: "sneakersBookmarked" | "jeansBookmarked") => (
    <Theme
      config={{ ...theme, appearance: "light" }}
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        minHeight: 0,
        margin: space(2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius-3)",
      }}
    >
      <Button
        size="icon"
        tabIndex={tabIndex}
        color="gray"
        variant="ghost"
        highContrast={bookmarked}
        onClick={() => setState((s) => ({ ...s, [key]: !s[key] }))}
      >
        {bookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
      </Button>
    </Theme>
  )

  return (
    <div
      {...props}
      style={{ display: "flex", alignItems: flexAlign[align], gap: space(6), ...style }}
    >
      {/* Column 1 */}
      <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, gap: space(6), width: 304 }}>
        <Card scale={1}>
          <CardContent>
            <div style={{ display: "flex", marginBottom: space(2) }}>
              <img src="images/radix-home/a2b643074228.jpg" width="280" height="212" style={{ borderRadius: "var(--radius-1)", width: 280, height: 212 }} alt="" />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: space(3) }}>
              <div>
                <Link href="#" underline={hoverUnderline} color="gray" size={2} weight="bold" highContrast tabIndex={tabIndex} onClick={preventDefault}>
                  Back to basics
                </Link>
                <Text as="p" size={2} color="gray">
                  Simple and versatile
                </Text>
              </div>
              <div style={{ flexShrink: 0 }}>
                <Button tabIndex={tabIndex} size="2" variant="soft" color="gray" highContrast>
                  Shop now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card scale={1}>
          <CardContent>
            <div style={{ display: "flex", position: "relative", marginBottom: space(2) }}>
              <img width="280" height="270" src="images/radix-home/fed20f39edef.jpg" style={{ borderRadius: "var(--radius-1)", width: 280, height: 270 }} alt="" />
              {bookmarkButton(state.sneakersBookmarked, "sneakersBookmarked")}
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: space(2) }}>
              <div>
                <div style={{ display: "flex", marginBottom: space(1) }}>
                  <Link href="#" underline={hoverUnderline} size={2} color="gray" highContrast tabIndex={tabIndex} onClick={preventDefault}>
                    Footwear
                  </Link>
                </div>
                <Heading as="h3" size={3}>
                  Sneakers #12
                </Heading>
              </div>
              <Text size={6} weight="bold">
                $149
              </Text>
            </div>

            <Text as="p" size={2} color="gray" style={{ marginBottom: space(4) }}>
              Love at the first sight for enthusiasts seeking a fresh and whimsical style.
            </Text>

            <div>
              <Separator data-scale={4} style={{ marginBlock: space(4) }} />
            </div>

            <div style={{ display: "flex", gap: space(2), alignItems: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <FieldLabel>Color</FieldLabel>
                <Select defaultValue="Pastel">
                  <SelectTrigger tabIndex={tabIndex} data-variant="soft" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent data-variant="soft" alignItemWithTrigger={false}>
                    <SelectItem value="Pastel">Pastel</SelectItem>
                    <SelectItem value="Bright">Bright</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", minWidth: 80 }}>
                <FieldLabel>Size</FieldLabel>
                <Select defaultValue="8">
                  <SelectTrigger tabIndex={tabIndex} data-variant="soft" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent data-variant="soft" alignItemWithTrigger={false}>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i} value={String(i * 0.5 + 5)}>
                        {i * 0.5 + 5}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button tabIndex={tabIndex} size="2" variant="solid" color="gray" highContrast>
                Buy
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card scale={1}>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <Text as="div" size={2} weight="bold" style={{ marginBottom: space(2) }}>
                  Delivery
                </Text>
                <ToggleButtons
                  columns={2}
                  tabIndex={tabIndex}
                  values={["Tomorrow", "Within 3 days"]}
                  value={[state.delivery]}
                  onValueChange={([value]) => setState({ ...state, delivery: value })}
                />
              </div>

              <div>
                <Text as="div" size={2} weight="bold" style={{ marginBottom: space(2) }}>
                  Size
                </Text>
                <ToggleButtons
                  columns={5}
                  tabIndex={tabIndex}
                  values={["5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"]}
                  value={[state.size]}
                  onValueChange={([value]) => setState({ ...state, size: value })}
                />
              </div>

              <div>
                <Text as="div" size={2} weight="bold" style={{ marginBottom: space(2) }}>
                  Material
                </Text>
                <ToggleButtons
                  columns={4}
                  tabIndex={tabIndex}
                  values={["Leather", "Suede", "Mesh", "Canvas"]}
                  value={[state.material]}
                  onValueChange={([value]) => setState({ ...state, material: value })}
                />
              </div>

              <div>
                <Text as="div" size={2} weight="bold" style={{ marginBottom: space(2) }}>
                  Color
                </Text>
                <ToggleButtons
                  columns={3}
                  tabIndex={tabIndex}
                  values={colorValues}
                  value={[state.color]}
                  onValueChange={([value]) => setState({ ...state, color: value })}
                >
                  {(value) => <Swatch value={value} />}
                </ToggleButtons>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card scale={1}>
          <CardContent>
            <Heading as="h3" size={3} style={{ marginBottom: space(3) }}>
              Shopping cart
            </Heading>

            <div style={{ display: "flex", flexDirection: "column", gap: space(3) }}>
              {[
                { name: "Poncho #4", url: "images/radix-home/dee3367c650c.jpg", caption: "Size M", count: "1", price: "$79" },
                { name: "Jeans #8", url: "images/radix-home/4d821ff437c1.jpg", caption: "Size 30", count: "2", price: "$118" },
                { name: "Sneakers #14", url: "images/radix-home/7ed18d9ce535.jpg", caption: "Size 8", count: "1", price: "$116" },
              ].map((item) => (
                <div key={item.url} style={{ display: "flex", gap: space(4), alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", flexGrow: 1, alignItems: "center", gap: space(2), height: 32 }}>
                    <img src={item.url} style={{ borderRadius: "var(--radius-1)", width: 32, height: 32 }} width="32" height="32" alt="" />
                    <div>
                      {/* Radix `trim="start"` / `trim="end"` (leading trim) */}
                      <Text as="div" color="gray" style={{ marginTop: "calc(-1 * var(--default-leading-trim-start) + (var(--type-line) - 1em) / 2)" }}>
                        <Link href="#" underline={hoverUnderline} tabIndex={tabIndex} size={2} weight="bold" onClick={preventDefault}>
                          {item.name}
                        </Link>
                      </Text>
                      <Text as="div" color="gray" size={1} style={{ marginBottom: "calc(-1 * var(--default-leading-trim-end) + (var(--type-line) - 1em) / 2)" }}>
                        {item.caption}
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", width: 48 }}>
                    <Select defaultValue={item.count}>
                      <SelectTrigger tabIndex={tabIndex} data-scale={1} className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent data-variant="soft" alignItemWithTrigger={false}>
                        {Array.from({ length: 9 }, (_, i) => (
                          <SelectItem key={i} value={String(i + 1)}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", width: 40 }}>
                    <Text size={2} weight="bold" style={{ textAlign: "right" }}>
                      {item.price}
                    </Text>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <Separator data-scale={4} style={{ marginBlock: space(4) }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: space(4) }}>
              <Text size={2}>
                Total <Strong>$313</Strong>
              </Text>
              <Button tabIndex={tabIndex} size="2" variant="solid" color="gray" highContrast>
                Go to checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Column 2 */}
      <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, gap: space(6), width: 304 }}>
        <Card scale={1}>
          <CardContent>
            <div style={{ display: "flex", position: "relative", marginBottom: space(2) }}>
              <img width="280" height="270" src="images/radix-home/69de92cd4b26.jpg" style={{ borderRadius: "var(--radius-1)", width: 280, height: 270 }} alt="" />
              {bookmarkButton(state.jeansBookmarked, "jeansBookmarked")}
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: space(2) }}>
              <div>
                <div style={{ display: "flex", marginBottom: space(1) }}>
                  <Link href="#" underline={hoverUnderline} tabIndex={tabIndex} highContrast size={2} color="gray" onClick={preventDefault}>
                    Pants and jeans
                  </Link>
                </div>
                <Heading as="h3" size={3}>
                  Jeans #7
                </Heading>
              </div>
              <Text as="div" size={6} weight="bold">
                $149
              </Text>
            </div>

            <Text as="p" size={2} color="gray" style={{ marginBottom: space(4) }}>
              Jeans with a sense of nostalgia, as if they carry whispered tales of past adventures.
            </Text>

            <div>
              <Separator data-scale={4} style={{ marginBlock: space(4) }} />
            </div>

            <div style={{ display: "flex", gap: space(2), alignItems: "flex-end" }}>
              <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <FieldLabel>Color</FieldLabel>
                <Select defaultValue="Lighter">
                  <SelectTrigger tabIndex={tabIndex} data-variant="soft" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent data-variant="soft" alignItemWithTrigger={false}>
                    <SelectItem value="Lighter">Lighter</SelectItem>
                    <SelectItem value="Darker">Darker</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <FieldLabel>Size</FieldLabel>
                <Select defaultValue="30">
                  <SelectTrigger tabIndex={tabIndex} data-variant="soft" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent data-variant="soft" alignItemWithTrigger={false}>
                    {Array.from({ length: 17 }, (_, i) => (
                      <SelectItem key={i} value={String(i + 24)}>
                        {i + 24}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button tabIndex={tabIndex} size="2" variant="solid" color="gray" highContrast>
                Add to cart
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card scale={1}>
          <CardContent>
            <div style={{ display: "flex", marginBottom: space(2) }}>
              <img src="images/radix-home/1a9fbfaf6383.jpg" width="280" height="212" style={{ borderRadius: "var(--radius-1)", width: 280, height: 212 }} alt="" />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: space(3) }}>
              <div>
                <Link href="#" underline={hoverUnderline} tabIndex={tabIndex} color="gray" size={2} weight="bold" highContrast onClick={preventDefault}>
                  Unexpected pairings
                </Link>
                <Text as="p" size={2} color="gray">
                  Break the fashion norms
                </Text>
              </div>
              <div style={{ flexShrink: 0 }}>
                <Button tabIndex={tabIndex} size="2" variant="soft" color="gray" highContrast>
                  Shop now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card scale={1}>
          <CardContent>
            <div style={{ display: "flex", marginBottom: space(3) }}>
              <Heading as="h3" size={3}>
                Delivery
              </Heading>
            </div>

            <div style={{ position: "absolute", right: 0, top: 0, margin: space(2) }}>
              <Badge variant="soft" color="amber">
                Guaranteed
              </Badge>
            </div>

            <div style={{ marginBottom: space(4) }}>
              <Text as="div" size={2} weight="bold" style={{ marginBottom: space(1) }}>
                Tomorrow
              </Text>
              <Text as="div" size={2}>
                12:00 pm – 2:00 pm
              </Text>
            </div>

            <div style={{ marginBottom: space(4) }}>
              <Text as="div" size={2} weight="bold" style={{ marginBottom: space(1) }}>
                Luna Rodriguez
              </Text>
              <Text as="div" size={2}>
                9876 Maple Avenue
              </Text>
              <Text as="div" size={2}>
                Cityville, WA 54321
              </Text>
            </div>

            <div style={{ display: "flex", marginBottom: space(4) }}>
              <img width="280" height="218" src="images/radix-home/befe11b29589.png" style={{ borderRadius: "var(--radius-1)", width: 280, height: 218 }} alt="" />
            </div>

            <div style={{ display: "flex", gap: space(2), justifyContent: "flex-end" }}>
              <Button tabIndex={tabIndex} size="2" variant="soft" color="gray" highContrast>
                Edit
              </Button>
              <Button tabIndex={tabIndex} size="2" variant="solid" color="gray" highContrast>
                Confirm
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card scale={1}>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: space(2) }}>
              <Heading as="h3" size={3}>
                Bookmarks
              </Heading>
              <Button tabIndex={tabIndex} size="1" variant="ghost">
                Buy all
              </Button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: space(2), rowGap: space(4) }}>
              {[
                { name: "Jeans #8", url: "images/radix-home/cb232c635ee8.jpg", price: "$118" },
                { name: "Jacket #3", url: "images/radix-home/71dcda3e4643.jpg", price: "$49" },
                { name: "Pants #10", url: "images/radix-home/11069e35a34d.jpg", price: "$32" },
                { name: "Shirt #11", url: "images/radix-home/a5ac0298b200.jpg", price: "$39" },
              ].map((item) => (
                <div key={item.url}>
                  <div style={{ display: "flex", marginBottom: space(2) }}>
                    <img src={item.url} style={{ borderRadius: "var(--radius-1)", width: 136, height: 136 }} width="136" height="136" alt="" />
                  </div>
                  <Text as="div" size={2} color="gray">
                    <Link href="#" tabIndex={tabIndex} underline={hoverUnderline} size={2} weight="bold" onClick={preventDefault}>
                      {item.name}
                    </Link>
                    , {item.price}
                  </Text>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Column 3 */}
      <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, gap: space(6), width: 416 }}>
        <Card>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBlock: space(2) }}>
              <div style={{ marginBottom: space(2) }}>
                <CrumpledPaperIcon width="24" height="24" />
              </div>
              <Heading as="h3" size={4} style={{ marginBottom: space(1) }}>
                Product discarded
              </Heading>
              <Text size={2} color="gray" style={{ marginBottom: space(4) }}>
                It’s still available in the{" "}
                <Link href="#" tabIndex={tabIndex} underline={hoverUnderline} size={2} onClick={preventDefault}>
                  archive
                </Link>
                .
              </Text>

              <div style={{ display: "flex", gap: space(2) }}>
                <Button tabIndex={tabIndex} variant="soft" highContrast>
                  Undo
                </Button>
                <Button tabIndex={tabIndex} variant="solid" highContrast>
                  Done
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Heading as="h3" size={4} style={{ marginBottom: space(4) }}>
              Edit product
            </Heading>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: space(2), marginBottom: space(4) }}>
              <div style={{ gridColumn: "1 / 5" }}>
                <Label className="block font-normal text-[length:inherit] leading-[inherit]">
                  <FieldTitle>Title</FieldTitle>
                  <Input tabIndex={tabIndex} variant="soft" placeholder="Enter product title" defaultValue="Skirt #16" />
                </Label>
              </div>

              <div>
                <Label className="block font-normal text-[length:inherit] leading-[inherit]">
                  <FieldTitle>Price</FieldTitle>
                  <Input tabIndex={tabIndex} variant="soft" placeholder="Enter price" defaultValue="$99" />
                </Label>
              </div>
            </div>

            <div style={{ marginBottom: space(4) }}>
              <FieldTitle>Media</FieldTitle>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: space(2) }}>
                {["images/radix-home/e5f20a5e18df.jpg", "images/radix-home/6abbf7f73458.png"].map((src) => (
                  <div key={src} style={{ display: "flex" }}>
                    <img
                      src={src}
                      width="200"
                      height="200"
                      style={{ borderRadius: "var(--radius-2)", objectFit: "cover", width: "100%", height: 121, cursor: "zoom-in" }}
                      alt=""
                    />
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--gray-5)",
                    borderRadius: "var(--radius-2)",
                  }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: space(2) }}>
                    <Button tabIndex={tabIndex} highContrast variant="soft" size="icon">
                      <ImageIcon />
                    </Button>
                    <Button tabIndex={tabIndex} highContrast variant="soft" size="icon">
                      <VideoIcon />
                    </Button>
                    <Button tabIndex={tabIndex} highContrast variant="soft" size="icon">
                      <InstagramLogoIcon />
                    </Button>
                    <Button tabIndex={tabIndex} highContrast variant="soft" size="icon">
                      <RulerHorizontalIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: space(4) }}>
              <Label htmlFor="skirt-description" className="block font-normal text-[length:inherit] leading-[inherit]">
                <FieldTitle>Description</FieldTitle>
              </Label>
              <div style={{ position: "relative" }}>
                <Textarea
                  tabIndex={tabIndex}
                  spellCheck={false}
                  id="skirt-description"
                  variant="soft"
                  rows={10}
                  defaultValue="Amidst the soft hues and delicate silence, one's gaze is always drawn towards this skirt. The fabric seems to possess a story of its own, woven with threads of history and whispered secrets. Its savory color, reminiscent of lush meadows in spring, holds the promise of new beginnings. Delicate ruffles cascade elegantly, like gentle waves lapping against an untouched shore."
                  /* Radix pads the TextArea root (48px); its input keeps its own padding */
                  style={{ paddingTop: "calc(48px + var(--space-2))" }}
                />
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, margin: space(2) }}>
                  <div style={{ display: "flex", gap: space(4) }}>
                    {[
                      [FontItalicIcon, FontBoldIcon, StrikethroughIcon],
                      [TextAlignLeftIcon, TextAlignCenterIcon, TextAlignRightIcon],
                      [MagicWandIcon, ImageIcon, CrumpledPaperIcon],
                    ].map((group, i) => (
                      <div key={i} style={{ display: "flex", gap: space(1) }}>
                        {group.map((Icon, j) => (
                          <Button key={j} tabIndex={tabIndex} variant="soft" size="icon" highContrast>
                            <Icon />
                          </Button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: space(4) }}>
              <FieldTitle>Main material</FieldTitle>
              <ToggleButtons
                columns={3}
                tabIndex={tabIndex}
                value={[state.productMaterial]}
                onValueChange={([value]) => setState({ ...state, productMaterial: value })}
                values={["Synthetic", "Wool", "Cotton", "Linen", "Denim", "Leather", "Silk", "Chiffon", "Other"]}
              />
            </div>

            <div style={{ marginBottom: space(4) }}>
              <FieldTitle>Main color</FieldTitle>
              <ToggleButtons
                columns={3}
                tabIndex={tabIndex}
                values={colorValues}
                value={[state.productColor]}
                onValueChange={([value]) => setState({ ...state, productColor: value })}
              >
                {(value) => <Swatch value={value} />}
              </ToggleButtons>
            </div>

            <div>
              <FieldTitle>Sizes</FieldTitle>
              <ToggleButtons
                multiple
                columns={3}
                tabIndex={tabIndex}
                values={["XS", "S", "M", "L", "XL"]}
                value={state.productSizes}
                onValueChange={(value) => setState({ ...state, productSizes: value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: space(4) }}>
              <Heading as="h3" size={4}>
                Orders
              </Heading>
              {/* Radix `mr="-2"` adds to the ghost button's own negative margin */}
              <Button tabIndex={tabIndex} variant="ghost" size="1" style={{ marginRight: `calc(${neg(2)} * 2)` }}>
                <CalendarIcon width="12" height="12" />
                <Text size={2} color="gray">
                  May 2023
                </Text>
              </Button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: space(3), marginBottom: space(4) }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
                <Text size={2} color="gray">
                  Order no.
                </Text>
                <Text size={2} color="gray">
                  Payment
                </Text>
                <Text size={2} color="gray">
                  Fulfillment
                </Text>
                <Text size={2} color="gray" style={{ textAlign: "right" }}>
                  Amount
                </Text>
              </div>

              <Separator data-scale={4} />

              {(
                [
                  { id: 1005, paymentStatus: "Paid", paymentStatusColor: "teal", fulfillment: "Delivering", fulfillmentColor: "amber", amount: "$154.60" },
                  { id: 1004, paymentStatus: "Paid", paymentStatusColor: "teal", fulfillment: "Unfulfilled", fulfillmentColor: "amber", amount: "$93.49" },
                  { id: 1003, paymentStatus: "Refunded", paymentStatusColor: "gray", fulfillment: "Cancelled", fulfillmentColor: "red", amount: "$39.00" },
                  { id: 1002, paymentStatus: "Unpaid", paymentStatusColor: "amber", fulfillment: "Unfulfilled", fulfillmentColor: "amber", amount: "$438.90" },
                  { id: 1001, paymentStatus: "Paid", paymentStatusColor: "teal", fulfillment: "Fulfilled", fulfillmentColor: "teal", amount: "$532.64" },
                  { id: 1000, paymentStatus: "Paid", paymentStatusColor: "teal", fulfillment: "Fulfilled", fulfillmentColor: "teal", amount: "$625.03" },
                ] as const
              ).map((order) => (
                <div key={order.id} style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
                  <Text size={3} color="gray">
                    <Link href="#" tabIndex={tabIndex} underline={hoverUnderline} size={3} weight="bold" onClick={preventDefault}>
                      #{order.id}
                    </Link>
                  </Text>
                  <div>
                    <Badge variant="soft" color={order.paymentStatusColor}>
                      {order.paymentStatus}
                    </Badge>
                  </div>
                  <div>
                    <Badge variant="soft" color={order.fulfillmentColor}>
                      {order.fulfillment}
                    </Badge>
                  </div>
                  <Text size={2} style={{ textAlign: "right" }}>
                    {order.amount}
                  </Text>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button tabIndex={tabIndex} variant="soft" highContrast>
                Show more
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Column 4 */}
      <div style={{ display: "flex", flexDirection: "column", flexShrink: 0, gap: space(6), width: 640 }}>
        <Card>
          <CardContent>
            <Heading as="h3" size={4} style={{ marginBottom: space(4) }}>
              Shipment tracking
            </Heading>

            <InputGroup data-variant="soft" style={{ marginBottom: space(5) }}>
              <InputGroupAddon>
                <MagnifyingGlassIcon />
              </InputGroupAddon>
              <InputGroupInput tabIndex={tabIndex} placeholder="Enter package number" />
            </InputGroup>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: space(4), paddingRight: space(6) }}>
                <div>
                  <Text as="div" weight="bold" size={2} style={{ marginBottom: space(1) }}>
                    Package number
                  </Text>
                  <Text as="div" size={3}>
                    LASC966124786554
                  </Text>
                </div>

                <div>
                  <Text as="div" weight="bold" size={2} style={{ marginBottom: space(1) }}>
                    Order number
                  </Text>
                  <Link href="#" tabIndex={tabIndex} underline={hoverUnderline} highContrast size={3} onClick={preventDefault}>
                    #94356
                  </Link>
                </div>

                <div>
                  <Text as="div" weight="bold" size={2} style={{ marginBottom: space(1) }}>
                    Ship to
                  </Text>
                  <Text as="div" size={3} style={{ marginBottom: space(1) }}>
                    Sophia Martinez
                  </Text>
                  <Text as="div" size={2} color="gray">
                    512 Oakwood Avenue, Unit 201, Greenville, SC 67890
                  </Text>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                  <div>
                    <Text as="div" weight="bold" size={2} style={{ marginBottom: space(1) }}>
                      Status
                    </Text>
                    <div style={{ display: "flex", height: 24, alignItems: "center" }}>
                      <Badge variant="soft" color="green" style={{ marginLeft: -2 }}>
                        On time
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Text as="div" weight="bold" size={2} style={{ marginBottom: space(1) }}>
                      Weight
                    </Text>
                    <Text as="div" size={3}>
                      3 lb
                    </Text>
                  </div>
                  <div>
                    <Text as="div" weight="bold" size={2} style={{ marginBottom: space(1) }}>
                      Order total
                    </Text>
                    <Text as="div" size={3}>
                      $243
                    </Text>
                  </div>
                </div>
              </div>

              <div style={{ position: "relative", paddingTop: space(1) }}>
                <div style={{ position: "absolute", top: 0, bottom: 0, width: 1, marginLeft: -0.5, display: "flex" }}>
                  <Separator
                    orientation="vertical"
                    style={{
                      marginTop: space(2),
                      background: "linear-gradient(to bottom, var(--palette-teal-6) 90%, transparent)",
                    }}
                  />
                </div>

                <div style={{ paddingLeft: space(6) }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: space(4) }}>
                    {[
                      ["July 1, 2023, 10:28 AM", "Package picked up from the warehouse in Phoenix, TX"],
                      ["July 1, 2023, 12:43 PM", "Departed from Phoenix, TX"],
                      ["July 2, 2023, 3:20 PM", "Arrived at a sorting facility in Seattle, WA"],
                      ["July 2, 2023, 7:31 PM", "Departed Seattle, WA"],
                      ["July 2, 2023, 11:03 PM", "Arrived to a facility in Greenville, WA"],
                    ].map(([time, event]) => (
                      <div key={time}>
                        <GreenDot />
                        <Text as="div" size={1} color="gray" style={{ marginBottom: space(1) }}>
                          {time}
                        </Text>
                        <Text as="p" size={2}>
                          {event}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Inset>
              <div style={{ display: "grid", gridTemplateRows: "256px 256px", gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
                <div style={{ padding: space(4) }}>
                  <Heading as="h3" size={8} style={{ marginBottom: space(2) }}>
                    Dare to stand out
                  </Heading>
                  <Text as="p" size={3} style={{ marginBottom: space(3) }}>
                    Striking patterns, vibrant hues, and unusual designs.
                  </Text>
                  <Button tabIndex={tabIndex} highContrast variant="solid">
                    Shop now
                  </Button>
                </div>

                <div>
                  <img src="images/radix-home/6cc5c107c5eb.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>

                <Text as="div" size={1} color="gray" style={{ padding: space(4), marginBottom: space(2), lineHeight: "20px" }}>
                  <Text size={1} color="gray" style={{ marginRight: 6 }}>
                    Men’s
                  </Text>
                  {["Polo #11", "Shirt #12", "Shirt #24", "Sneakers #3", "Jeans #9", "T‑shirt #4", "Pants #20", "Socks #9", "Watch #15", "Belt #7", "Bag #6", "Shirt #16", "Suit #17", "Shorts #22", "Shoes #13"].map((product) => (
                    <React.Fragment key={product}>
                      <Link href="#" tabIndex={tabIndex} underline={hoverUnderline} highContrast size={1} style={{ marginRight: 6 }} onClick={preventDefault}>
                        {product}
                      </Link>
                      <wbr />
                    </React.Fragment>
                  ))}

                  <Text size={1} color="gray" style={{ marginRight: 6 }}>
                    Women’s
                  </Text>
                  {["Blouse #16", "Dress #3", "Skirt #22", "Heels #13", "Sandals #18", "Bag #14", "Scarf #19", "Earrings #23", "Bracelet #21", "Necklace #25", "Glasses #26", "Perfume #27"].map((product) => (
                    <React.Fragment key={product}>
                      <Link href="#" tabIndex={tabIndex} underline={hoverUnderline} highContrast size={1} style={{ marginRight: 6 }} onClick={preventDefault}>
                        {product}
                      </Link>
                      <wbr />
                    </React.Fragment>
                  ))}
                </Text>

                <div>
                  <img src="images/radix-home/a4d5831b4922.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", padding: space(4) }}>
                  <Text size={1} color="gray" style={{ textAlign: "center" }}>
                    15&thinsp;–&thinsp;30 Mar
                  </Text>
                  <Text size={9} weight="bold" style={{ marginBottom: space(3), marginRight: space(4) }}>
                    −25%
                  </Text>
                  <Text size={1} color="gray" style={{ textAlign: "center" }}>
                    Get our boldest designs.
                  </Text>
                </div>

                <div>
                  <img src="images/radix-home/157f6ed3a2b3.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" />
                </div>
              </div>
            </Inset>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Heading as="h3" size={4} style={{ marginBottom: space(4) }}>
              Top customers
            </Heading>

            <div style={{ display: "flex", gap: space(2) }}>
              <div style={{ position: "relative", marginBottom: space(5), flexGrow: 1 }}>
                <InputGroup data-variant="soft">
                  <InputGroupAddon>
                    <MagnifyingGlassIcon />
                  </InputGroupAddon>
                  <InputGroupInput tabIndex={tabIndex} placeholder="Search" />
                </InputGroup>
              </div>
              <div style={{ display: "flex", flexDirection: "column", minWidth: 140 }}>
                <Select defaultValue="All customers">
                  <SelectTrigger data-variant="soft" tabIndex={tabIndex} className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent data-variant="soft" alignItemWithTrigger={false}>
                    <SelectItem value="All customers">All customers</SelectItem>
                    {[0, 1, 2, 3].map((n) => {
                      const year = String(new Date().getFullYear() - n)
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: space(5), marginBottom: space(2) }}>
              {[
                { name: "Elijah Wilson", address: "735 Pine Street, Apartment 4C, Portland, OR 34567", customerSince: "November 3, 2017", sales: "$15,432.56", orders: 42 },
                { name: "Cameron Johnson", address: "2465 Main Street, Apt 3B, Springfield, OH 12345", customerSince: "June 10, 2020", sales: "$13,976.43", orders: 12 },
                { name: "Sophia Martinez", address: "512 Oakwood Avenue, Unit 201, Greenville, SC 67890", customerSince: "September 27, 2019", sales: "$11,653.03", orders: 34 },
                { name: "Nathan Thompson", address: "837 Maple Lane, Suite 102, Lexington, KY 45678", customerSince: "May 5, 2018", sales: "$8,245.92", orders: 22 },
                { name: "Olivia Adams", address: "1123 Elmwood Drive, Boulder, CO 23456", customerSince: "January 12, 2021", sales: "$6,789.21", orders: 18 },
              ].map((customer) => (
                <div key={customer.name} style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <Link href="#" tabIndex={tabIndex} size={3} weight="bold" highContrast underline={hoverUnderline} onClick={preventDefault}>
                      {customer.name}
                    </Link>
                    <Text as="div" size={2} style={{ marginBottom: space(2) }}>
                      Customer since {customer.customerSince}
                    </Text>
                    <Text as="div" size={1} color="gray" style={{ marginBottom: space(1) }}>
                      <address style={{ all: "unset" }}>{customer.address}</address>
                    </Text>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: space(5), flexGrow: 1 }}>
                    <div>
                      <Text as="div" size={2} color="gray" style={{ textAlign: "right" }}>
                        Sales
                      </Text>
                      <Text as="div" size={6} weight="bold" style={{ textAlign: "right" }}>
                        {customer.sales}
                      </Text>
                    </div>
                    <Separator orientation="vertical" />
                    <div style={{ minWidth: 70 }}>
                      <Text as="div" size={2} color="gray">
                        Orders
                      </Text>
                      <Text as="div" size={6} weight="bold">
                        {customer.orders}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/** Radix `<Label.Root asChild><Text size="1" color="gray" mb="1">` */
const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Text as={Label} size={1} color="gray" className="font-normal" style={{ marginBottom: space(1) }}>
    {children}
  </Text>
)

/** Radix `<Text size="2" weight="bold" mb="2" asChild><Box display="inline-block">` */
const FieldTitle = ({ children }: { children: React.ReactNode }) => (
  <Text size={2} weight="bold" style={{ display: "inline-block", marginBottom: space(2) }}>
    {children}
  </Text>
)

const GreenDot = () => (
  <div
    style={{
      position: "absolute",
      left: 0,
      width: 8,
      height: 8,
      marginTop: space(1),
      marginLeft: neg(1),
      backgroundColor: "var(--palette-teal-9)",
      borderRadius: "100%",
    }}
  />
)

const gridColumns: Record<number, string> = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5" }

type ToggleButtonsProps = {
  columns: number
  tabIndex?: number
  values: string[]
  value: string[]
  multiple?: boolean
  onValueChange: (value: string[]) => void
  children?: (value: string) => React.ReactNode
}

/** Radix `<Grid asChild columns gap="1"><ToggleGroup.Root>` with `ToggleGroup.Item asChild` → `Button`. */
function ToggleButtons({ columns, tabIndex, values, value, multiple, onValueChange, children }: ToggleButtonsProps) {
  return (
    <ToggleGroup
      spacing={1}
      multiple={multiple}
      value={value}
      onValueChange={(next: string[]) => {
        if (multiple || next.length) onValueChange(next)
      }}
      className={cn("grid w-full", gridColumns[columns])}
    >
      {values.map((item) => (
        <ToggleGroupItem
          key={item}
          value={item}
          tabIndex={tabIndex}
          render={<Button highContrast variant={value.includes(item) ? "solid" : "soft"} style={{ fontWeight: 400 }} />}
        >
          {children ? children(item) : item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
