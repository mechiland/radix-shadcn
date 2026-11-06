// Port of radix-ui/website components/example-themes-music-app.tsx (MIT) to the shadcn/Base UI components in this repo.
import * as React from "react"
import { cn } from "cn"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Inset } from "@/components/ui/adaptations"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Blockquote, Heading, Link, Text } from "@/components/ui/typography"
import {
  Audio3DIcon,
  CounterClockwiseClockIcon,
  CrossFadeIcon,
  EqualizerIcon,
  HalfStarIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
  NextIcon,
  NormalizeIcon,
  PlayIcon,
  PreviousIcon,
  RepeatIcon,
  ShuffleIcon,
  StarIcon,
  VolumeMaxIcon,
  VolumeNoneIcon,
} from "./icons-music"
import { allPeople } from "./people"
import "./music-app.css"

type ExampleLayoutProps = React.ComponentProps<"div"> & {
  align?: React.CSSProperties["alignItems"]
  focusable?: boolean
}

type Song = { name: string; artist: string; album: string; length: string; cover: string; color: string }

const SongRow = ({ song }: { song: Song }) => (
  <div className="flex items-center gap-(--space-3)">
    <img
      src={song.cover}
      width={48}
      height={48}
      className="block size-[48px]"
      style={{ objectFit: "cover", borderRadius: "var(--radius-2)" }}
      alt={`Album cover for ${song.album}`}
    />
    <div className="w-0 grow">
      <Text as="div" size={2} className="truncate">
        {song.name}
      </Text>
      <Text as="div" size={1} color="gray" className="truncate">
        {song.artist} – {song.album}
      </Text>
    </div>
    <div>
      <Text as="div" size={2} color="gray">
        {song.length}
      </Text>
    </div>
  </div>
)

const SoundToggle = ({
  icon,
  label,
  state,
  on,
  tabIndex,
}: {
  icon: React.ReactNode
  label: string
  state: string
  on?: boolean
  tabIndex?: number
}) => (
  <Text as="label" className="flex flex-col items-center gap-(--space-2)">
    <Button
      tabIndex={tabIndex}
      size="icon"
      data-radius="full"
      variant={on ? "solid" : "soft"}
      color={on ? undefined : "gray"}
    >
      {icon}
    </Button>
    <span className="flex flex-col">
      <Text weight="medium" size={2} className="text-center">
        {label}
      </Text>
      <Text color="gray" size={1} className="text-center">
        {state}
      </Text>
    </span>
  </Text>
)

const SettingSwitch = ({
  title,
  description,
  defaultChecked,
  tabIndex,
}: {
  title: string
  description: string
  defaultChecked?: boolean
  tabIndex?: number
}) => (
  <Text as="label">
    <span className="flex justify-between gap-(--space-5)">
      <span>
        <Text as="div" size={2} weight="medium" style={{ marginBottom: "var(--space-1)" }}>
          {title}
        </Text>
        <Text as="div" color="gray" size={1}>
          {description}
        </Text>
      </span>
      <Switch
        scale={3}
        variant="classic"
        tabIndex={tabIndex}
        defaultChecked={defaultChecked}
        style={{ marginTop: "var(--space-2)" }}
      />
    </span>
  </Text>
)

const SettingSlider = ({
  title,
  description,
  min,
  max,
  value,
  tabIndex,
}: {
  title: string
  description: string
  min: string
  max: string
  value: number
  tabIndex?: number
}) => (
  <div>
    <div className="flex justify-between gap-(--space-5)">
      <div>
        <Text as="div" size={2} weight="medium" style={{ marginBottom: "var(--space-1)" }}>
          {title}
        </Text>
        <Text as="div" color="gray" size={1}>
          {description}
        </Text>
      </div>
    </div>

    <div className="flex items-center gap-(--space-2)" style={{ marginTop: "var(--space-3)" }}>
      <Text color="gray" size={1} style={{ width: 24 }}>
        {min}
      </Text>
      <div className="grow">
        <Slider tabIndex={tabIndex} data-radius="full" scale={1} defaultValue={[value]} />
      </div>
      <Text color="gray" size={1} style={{ width: 32 }}>
        {max}
      </Text>
    </div>
  </div>
)

const ProfileField = ({ label, defaultValue, tabIndex }: { label: string; defaultValue: string; tabIndex?: number }) => (
  <Text as="label" size={2} weight="medium" className="flex flex-col gap-(--space-1)">
    <Text size={2}>{label}</Text>
    <Input variant="classic" tabIndex={tabIndex} defaultValue={defaultValue} />
  </Text>
)

const PrivacyCheckbox = ({ label, defaultChecked, tabIndex }: { label: string; defaultChecked?: boolean; tabIndex?: number }) => (
  <Text as="label" size={2} className="flex gap-(--space-2)">
    <Checkbox tabIndex={tabIndex} defaultChecked={defaultChecked} />
    <Text size={2}>{label}</Text>
  </Text>
)

const MembershipPlan = ({
  name,
  description,
  price,
  solid,
  tabIndex,
}: {
  name: string
  description: string
  price: string
  solid?: boolean
  tabIndex?: number
}) => (
  <div className="flex items-center justify-between">
    <div className="flex flex-col gap-(--space-1)">
      <Text size={2} weight="medium">
        {name}
      </Text>
      <Text size={1} color="gray">
        {description}
      </Text>
    </div>
    <div className="flex flex-col" style={{ width: 64 }}>
      <Button tabIndex={tabIndex} variant={solid ? "solid" : "soft"}>
        {price}
      </Button>
    </div>
  </div>
)

const SectionHeader = ({ title, tabIndex }: { title: string; tabIndex?: number }) => (
  <div style={{ marginBottom: "var(--space-4)" }}>
    <div className="flex items-baseline justify-between">
      <Heading as="h2" size={6}>
        {title}
      </Heading>
      <Link href="#" tabIndex={tabIndex} size={2} weight="medium">
        Show all
      </Link>
    </div>
  </div>
)

const Lyric = ({ children, note, tabIndex }: { children: React.ReactNode; note: React.ReactNode; tabIndex?: number }) => (
  <HoverCard>
    <HoverCardTrigger render={<Link href="#" size={2} tabIndex={tabIndex} />}>{children}</HoverCardTrigger>
    <HoverCardContent side="top" style={{ maxWidth: 320 }}>
      <div className="flex flex-col gap-(--space-2)">{note}</div>
    </HoverCardContent>
  </HoverCard>
)

const trafficLight = (background: string): React.CSSProperties => ({
  width: 12,
  height: 12,
  background,
  boxShadow: "inset 0 0 0 1px var(--gray-a5)",
  borderRadius: "100%",
})

const equalizerBands = [
  { frequency: "32", value: 75 },
  { frequency: "64", value: 73 },
  { frequency: "125", value: 70 },
  { frequency: "250", value: 65 },
  { frequency: "500", value: 52 },
  { frequency: "1K", value: 50 },
  { frequency: "2K", value: 56 },
  { frequency: "3K", value: 57 },
  { frequency: "4K", value: 60 },
  { frequency: "6K", value: 62 },
  { frequency: "8K", value: 65 },
  { frequency: "16K", value: 68 },
]

const genres = [
  "Pop", "Rock", "Hip-Hop", "R&B", "Country", "Jazz", "Blues", "Electronic", "Experimental", "Reggae", "Ska", "Grunge",
  "Psychedelic", "Post-Rock", "Progressive Rock", "Dream Pop", "Ambient", "Classical", "Trip-Hop", "Gospel", "Folk", "Indie",
  "Alternative", "Punk", "Metal", "Funk", "Soul", "Dance", "Techno", "Acoustic", "House", "Dubstep", "Latin", "Salsa", "K-pop",
]

export const ExampleThemesMusicApp = ({ focusable = true, align = "center", className, style, ...props }: ExampleLayoutProps) => {
  // Interactive elements may be not focusable for homepage demo purposes
  const tabIndex = focusable ? undefined : -1

  return (
    <div className={cn("music-app flex gap-(--space-6)", className)} style={{ alignItems: align, ...style }} {...props}>
      <div className="flex shrink-0 flex-col gap-(--space-6)" style={{ width: 416 }}>
        <Card scale={3}>
          <CardContent>
            <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
              <Heading as="h3" size={4} className="music-trim-both">
                Queue
              </Heading>
              <div className="flex gap-(--space-4)" style={{ marginBlock: "calc(-1 * var(--space-1))" }}>
                <Button tabIndex={tabIndex} variant="ghost">
                  Clear
                </Button>
                <Button tabIndex={tabIndex} variant="ghost">
                  Repeat
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-(--space-4)">
              {songsQueue.slice(0, 5).map((song) => (
                <SongRow song={song} key={song.name} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card scale={3}>
          <CardContent>
            <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
              <Heading as="h3" size={4} className="music-trim-start">
                Sound
              </Heading>
              <div className="flex gap-(--space-4)">
                <Text size={2} color="gray">
                  Yamaha THR
                </Text>
              </div>
            </div>

            <div
              className="flex items-center gap-(--space-2)"
              style={{ height: 16, marginTop: "var(--space-2)", marginBottom: "var(--space-5)" }}
            >
              <VolumeNoneIcon color="var(--gray-a9)" />
              <div className="grow">
                <Slider tabIndex={tabIndex} defaultValue={[80]} />
              </div>
              <VolumeMaxIcon color="var(--gray-a9)" />
            </div>

            <div className="grid grid-cols-4" style={{ paddingTop: "var(--space-2)", paddingBottom: "var(--space-1)" }}>
              <SoundToggle tabIndex={tabIndex} on icon={<NormalizeIcon />} label="Normalize" state="On" />
              <SoundToggle tabIndex={tabIndex} on icon={<EqualizerIcon />} label="Equalizer" state="On" />
              <SoundToggle tabIndex={tabIndex} icon={<Audio3DIcon />} label="3D Audio" state="Off" />
              <SoundToggle tabIndex={tabIndex} icon={<CrossFadeIcon />} label="Cross-Fade" state="Off" />
            </div>
          </CardContent>
        </Card>

        <Card scale={3}>
          <CardContent>
            <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-6)" }}>
              <Text as="label" size={4} weight="bold" className="music-trim-start">
                <span className="flex gap-(--space-2)" style={{ marginBlock: "calc(-1 * var(--space-1))" }}>
                  Equalizer
                  <Switch variant="classic" tabIndex={tabIndex} defaultChecked scale={1} style={{ marginTop: 1 }} />
                </span>
              </Text>
              <div className="flex gap-(--space-4)" style={{ marginBlock: "calc(-1 * var(--space-1))" }}>
                <Button tabIndex={tabIndex} size="2" variant="ghost">
                  Reset
                </Button>
              </div>
            </div>

            <div className="relative" style={{ marginBlock: "calc(-1 * var(--space-1))" }}>
              <div
                className="absolute right-0 left-0 flex flex-col gap-(--space-4)"
                style={{ paddingBlock: "var(--space-4)" }}
              >
                {["dotted", "dotted", "dotted", "solid", "dotted", "dotted", "dotted"].map((border, i) => (
                  <div key={i} style={{ marginTop: -1, borderTop: `1px ${border} var(--gray-a5)` }} />
                ))}
              </div>

              <div className="relative flex shrink-0 grow justify-between">
                {equalizerBands.map((band) => (
                  <div
                    key={band.frequency}
                    className="flex flex-col items-center gap-(--space-2)"
                    style={{ width: 24, height: 152 }}
                  >
                    <Slider
                      tabIndex={tabIndex}
                      scale={1}
                      data-radius="small"
                      color="gray"
                      variant="soft"
                      defaultValue={[band.value]}
                      orientation="vertical"
                    />
                    <Text size={1}>{band.frequency}</Text>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card scale={3}>
          <CardContent>
            <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
              <Heading as="h3" size={4} className="music-trim-both">
                History
              </Heading>
              <div className="flex gap-(--space-4)" style={{ marginBlock: "calc(-1 * var(--space-1))" }}>
                <Button tabIndex={tabIndex} size="2" variant="ghost">
                  Clear
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-(--space-4)">
              {songsHistory.map((song) => (
                <SongRow song={song} key={song.name} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex shrink-0 flex-col gap-(--space-6)" style={{ width: 1312 }}>
        <Card scale={4} style={{ height: 896 }}>
          <CardContent>
            <div
              className="absolute top-0 left-0 flex items-center justify-between"
              style={{ width: 48, height: 48, marginLeft: "var(--space-4)" }}
            >
              <div style={trafficLight("#FF5F57")} />
              <div style={trafficLight("#FDBB2E")} />
              <div style={trafficLight("#27C840")} />
            </div>

            <div className="absolute top-0 right-0 left-0 flex items-center justify-center" style={{ height: 64 }}>
              <InputGroup data-color="gray" data-variant="soft" data-radius="full" style={{ width: 400 }}>
                <InputGroupInput tabIndex={tabIndex} placeholder="Search" />
                <InputGroupAddon>
                  <MagnifyingGlassIcon />
                </InputGroupAddon>
              </InputGroup>
            </div>

            <div
              className="absolute top-0 right-0 flex items-center gap-(--space-4)"
              style={{ height: 64, marginRight: "var(--space-4)" }}
            >
              <Button tabIndex={tabIndex} size="icon" variant="ghost" data-radius="full">
                <HeartIcon />
              </Button>
              <Button tabIndex={tabIndex} size="icon" variant="ghost" data-radius="full">
                <CounterClockwiseClockIcon />
              </Button>
              <Button tabIndex={tabIndex} size="icon" variant="ghost" data-radius="full">
                <MixerHorizontalIcon />
              </Button>
              <Button tabIndex={tabIndex} size="icon-xs" variant="ghost" data-radius="full" color="gray">
                <Avatar scale={2} data-radius="full">
                  <AvatarImage src={allPeople[23].image} />
                  <AvatarFallback>{allPeople[23]?.name[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </div>

            <div style={{ height: 40 }} />

            <SectionHeader title="Your favorites" tabIndex={tabIndex} />
            <div className="grid grid-cols-5 gap-(--space-5)" style={{ marginBottom: "var(--space-7)" }}>
              {albumsFavorites.map((album) => (
                <AlbumCard
                  focusable={focusable}
                  title={album.name}
                  caption={album.artist}
                  cover={album.cover}
                  color={album.color}
                  key={album.name}
                />
              ))}
            </div>

            <SectionHeader title="Made for you" tabIndex={tabIndex} />
            <div className="grid grid-cols-5 gap-(--space-5)" style={{ marginBottom: "var(--space-7)" }}>
              {playlistsForYou.slice(0, 5).map((playlist) => (
                <AlbumCard
                  title={playlist.title}
                  caption={playlist.caption}
                  cover={playlist.cover}
                  color={playlist.color}
                  key={playlist.title}
                />
              ))}
            </div>

            <SectionHeader title="Your friends listen" tabIndex={tabIndex} />
            <div className="grid grid-cols-5 gap-(--space-5)">
              {albumsFriendsListen.map((album) => (
                <AlbumCard
                  title={album.name}
                  caption={album.artist}
                  cover={album.cover}
                  color={album.color}
                  key={album.name}
                />
              ))}
            </div>

            <div
              className="absolute right-0 bottom-0 left-0"
              style={{
                height: 64,
                marginBottom: "var(--space-5)",
                borderRadius: 100,
                boxShadow: "var(--shadow-6)",
                marginLeft: 200,
                marginRight: 200,
              }}
            >
              <div
                className="absolute size-full overflow-hidden"
                style={{
                  borderRadius: 100,
                  backgroundColor: "var(--color-floating-panel)",
                  filter: "saturate(0.5) brightness(1.1)",
                  WebkitBackdropFilter: "blur(24px)",
                  backdropFilter: "blur(24px)",
                }}
              />
              <div className="relative flex h-full justify-between">
                <div className="flex items-center gap-(--space-4)" style={{ padding: "var(--space-3)" }}>
                  <Button tabIndex={tabIndex} data-radius="full" size="icon-lg">
                    <PlayIcon style={{ marginRight: -2 }} />
                  </Button>

                  <div className="flex items-center gap-(--space-4)">
                    <Button tabIndex={tabIndex} color="gray" variant="ghost" data-radius="full" size="icon">
                      <ShuffleIcon />
                    </Button>
                    <Button tabIndex={tabIndex} color="gray" variant="ghost" data-radius="full" size="icon">
                      <RepeatIcon />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-(--space-3)">
                  <Button tabIndex={tabIndex} color="gray" variant="ghost" data-radius="full" size="icon">
                    <PreviousIcon style={{ marginRight: 2 }} />
                  </Button>

                  <div className="flex items-center gap-(--space-3)">
                    <img
                      alt={`Album cover for ${songsHistory[6].album}`}
                      src={songsHistory[6].cover}
                      width="48"
                      height="48"
                      style={{ borderRadius: "var(--radius-2)" }}
                    />
                    <div>
                      <Text size={1} as="div" weight="medium">
                        {songsHistory[6].name}
                      </Text>
                      <Text size={1} as="div" color="gray" style={{ marginBottom: "var(--space-2)" }}>
                        {songsHistory[6].artist} – {songsHistory[6].album}
                      </Text>

                      <div
                        className="relative"
                        style={{ height: 4, width: 320, backgroundColor: "var(--gray-a5)", borderRadius: "var(--radius-1)" }}
                      >
                        <div
                          className="absolute"
                          style={{ height: 4, width: 64, borderRadius: "var(--radius-1)", backgroundColor: "var(--gray-a9)" }}
                        />
                        <div className="absolute top-0 right-0" style={{ marginTop: -28 }}>
                          <Text size={1} color="gray">
                            0:58 / {songsHistory[6].length}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button tabIndex={tabIndex} color="gray" variant="ghost" data-radius="full" size="icon">
                    <NextIcon style={{ marginLeft: 2 }} />
                  </Button>
                </div>

                <div className="flex items-center gap-(--space-2)" style={{ padding: "var(--space-5)" }}>
                  <VolumeNoneIcon color="var(--gray-a9)" />
                  <Slider
                    tabIndex={tabIndex}
                    defaultValue={[80]}
                    variant="soft"
                    color="gray"
                    data-radius="full"
                    style={{ width: 80 }}
                  />
                  <VolumeMaxIcon color="var(--gray-a9)" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex shrink-0 gap-(--space-6)">
          <div className="flex shrink-0 flex-col gap-(--space-6)" style={{ width: 416 }}>
            <Card scale={3}>
              <CardContent>
                <Heading as="h3" size={4} className="music-trim-both" style={{ marginBottom: "var(--space-5)" }}>
                  Settings
                </Heading>

                <div className="flex flex-col gap-(--space-5)">
                  <SettingSwitch
                    tabIndex={tabIndex}
                    title="Automatic downloads"
                    description="Automatically download music when added to your library"
                  />
                  <SettingSwitch
                    tabIndex={tabIndex}
                    title="Lossless audio"
                    description="Preserve every detail of the original audio, but consume significantly more data"
                  />
                  <SettingSwitch
                    tabIndex={tabIndex}
                    title="Spatial audio"
                    description="Enhancing the perception of audio in space"
                  />
                  <SettingSwitch
                    tabIndex={tabIndex}
                    title="Normalize volume"
                    description="Set the same volume level for all tracks"
                    defaultChecked
                  />
                  <SettingSlider
                    tabIndex={tabIndex}
                    title="Maximum volume"
                    description="Limit the maximum volume to protect hearing"
                    min="0%"
                    max="100%"
                    value={80}
                  />
                  <SettingSlider
                    tabIndex={tabIndex}
                    title="Crossfade"
                    description="Smoothly fade out into the next song."
                    min="Off"
                    max="10s"
                    value={0}
                  />
                </div>
              </CardContent>
            </Card>

            <Card scale={3}>
              <CardContent>
                <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
                  <Heading as="h3" size={4} className="music-trim-both">
                    Membership
                  </Heading>
                  <div className="flex gap-(--space-4)" style={{ marginBlock: "calc(-1 * var(--space-1))" }}>
                    <Button tabIndex={tabIndex} size="2" variant="ghost">
                      Done
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-(--space-4)">
                  <MembershipPlan tabIndex={tabIndex} name="Individual" description="Sign up with 1 account" price="$4.99" />
                  <MembershipPlan tabIndex={tabIndex} name="Duo" description="Sign up 2 accounts" price="$6.99" solid />
                  <MembershipPlan tabIndex={tabIndex} name="Family" description="Sign up to 6 accounts" price="$12.99" />
                </div>

                <div style={{ marginBlock: "var(--space-5)" }}>
                  <Separator />
                </div>

                <div>
                  <Text size={2} as="p" style={{ marginBlock: "var(--space-3)" }}>
                    Your next payment is $6.99 on{" "}
                    {(() => {
                      const date = new Date()
                      date.setDate(date.getDate() + 20)
                      return date.toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    })()}
                  </Text>
                  <Text size={2} as="p">
                    <Link href="#" size={2} tabIndex={tabIndex}>
                      Cancel subscription
                    </Link>
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex shrink-0 flex-col gap-(--space-6)" style={{ width: 416 }}>
            <Card scale={3}>
              <CardContent>
                <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
                  <Heading as="h3" size={4} className="music-trim-both">
                    Your profile
                  </Heading>
                  <div className="flex gap-(--space-4)" style={{ marginBlock: "calc(-1 * var(--space-1))" }}>
                    <Button tabIndex={tabIndex} size="2" variant="ghost">
                      Cancel
                    </Button>
                    <Button tabIndex={tabIndex} size="2" variant="ghost">
                      Save
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-(--space-4)">
                  <ProfileField tabIndex={tabIndex} label="Name" defaultValue="Vlad Moroz" />
                  <ProfileField tabIndex={tabIndex} label="Username" defaultValue="@vladmoroz" />
                  <ProfileField tabIndex={tabIndex} label="Email" defaultValue="hi@vladmoroz.com" />

                  <div className="flex flex-col gap-(--space-2)">
                    <Text size={2} weight="medium">
                      Privacy
                    </Text>
                    <div className="flex flex-col items-start gap-(--space-2)">
                      <PrivacyCheckbox tabIndex={tabIndex} label="Display my listening history" defaultChecked />
                      <PrivacyCheckbox tabIndex={tabIndex} label="Everyone can follow my activity" />
                      <PrivacyCheckbox tabIndex={tabIndex} label="Show my playlists in search" defaultChecked />
                    </div>
                  </div>

                  <div className="flex flex-col gap-(--space-2)">
                    <Text size={2} weight="medium">
                      Danger zone
                    </Text>
                    <div className="flex flex-col items-start gap-(--space-2)">
                      <Link href="#" tabIndex={tabIndex} size={2}>
                        Reset recommendations
                      </Link>
                      <Link href="#" tabIndex={tabIndex} size={2}>
                        Delete profile
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card scale={3}>
              <CardContent>
                <div className="flex items-center justify-between" style={{ marginBottom: "var(--space-5)" }}>
                  <Heading as="h3" size={4} className="music-trim-both">
                    Create a playlist
                  </Heading>
                  <div className="flex gap-(--space-4)" style={{ marginBlock: "calc(-1 * var(--space-1))" }}>
                    <Button tabIndex={tabIndex} size="2" variant="ghost">
                      Start over
                    </Button>
                    <Button tabIndex={tabIndex} size="2" variant="ghost">
                      Next
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-(--space-2)">
                    {genres.map((genre) => (
                      <Button
                        tabIndex={tabIndex}
                        data-radius="full"
                        variant={["Blues", "Jazz", "Funk"].includes(genre) ? "solid" : "soft"}
                        key={genre}
                      >
                        {genre}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex shrink-0 flex-col gap-(--space-6)" style={{ width: 416 }}>
            <Card scale={3}>
              <CardContent>
                <div className="relative flex justify-center" style={{ margin: "var(--space-4)" }}>
                  <img
                    alt="Album cover for King Krule – The OOZ"
                    width="200"
                    height="200"
                    src="images/radix-home/337a8b0d8967.png"
                    style={{ borderRadius: "var(--radius-3)", boxShadow: "0 8px 80px -24px hsl(205, 100%, 50%)" }}
                  />
                </div>

                <div style={{ marginTop: "var(--space-5)" }}>
                  <div className="flex items-center justify-center" style={{ marginBottom: "var(--space-4)" }}>
                    {[1, 2, 3, 4].map((i) => (
                      <StarIcon key={i} color="var(--accent-9)" />
                    ))}
                    <HalfStarIcon color="var(--accent-9)" />
                  </div>

                  <Heading as="h3" size={4} className="text-center" style={{ marginBottom: "var(--space-2)" }}>
                    King Krule – The OOZ
                  </Heading>

                  <Text as="p" color="gray" size={2} className="text-center" style={{ marginBottom: "var(--space-4)" }}>
                    A dark and introspective album that showcases King Krule&apos;s distinctive blend of genres, while
                    delivering hauntingly raw and poetic lyrics.
                  </Text>

                  <div className="flex justify-center gap-(--space-3)">
                    <Button tabIndex={tabIndex}>Listen Now</Button>
                    <Button tabIndex={tabIndex} size="icon" variant="soft">
                      <HeartIcon />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card scale={3}>
              <CardContent>
                <div
                  className="relative overflow-hidden"
                  style={{ height: 336, marginBottom: "calc(-1 * var(--card-spacing))" }}
                >
                  <Heading as="h3" size={4} className="music-trim-both" style={{ marginBottom: "var(--space-3)" }}>
                    Lyrics
                  </Heading>

                  <Text as="div" color="gray" size={3} style={{ marginBottom: "var(--space-5)" }}>
                    King Krule – Biscuit Town
                  </Text>

                  <Text as="div" size={2}>
                    <div className="flex flex-col items-start gap-(--space-4)">
                      <div className="flex flex-col items-start gap-(--space-1)">
                        <Lyric
                          tabIndex={tabIndex}
                          note={
                            <>
                              <Text size={2} as="p">
                                Archy Marshall begins the opening track with an allusion to a common theme that appears
                                throughout his body of work – introspection, and unhappiness with himself and the world
                                around him. A “sinking” feeling is often linked to sadness, depression or anxiety.
                              </Text>
                              <Text size={2} as="p">
                                After releasing his debut studio album 6 Feet Beneath the Moon as King Krule, Archy said in
                                an interview with HYPEBEAST:
                              </Text>
                              <Blockquote size={2} color="gray">
                                I was unhappy with myself and what I was creating, and when that happens you feel like
                                you’re useless. Musically I felt so useless.
                              </Blockquote>
                              <Text size={2} as="p">
                                This lyric can furthermore be connected to his debut album’s title.
                              </Text>
                            </>
                          }
                        >
                          I seem to sink lower, gazing in the rays of the solar
                        </Lyric>
                        <Text size={2}>In fact, we made a pact, but now I think it’s over</Text>

                        <Lyric
                          tabIndex={tabIndex}
                          note={
                            <Text size={2} as="p">
                              Archy is an Englishman, the flag of England is white with a red cross. But he’s drinking KA
                              soda (or at least thinks he is), which is a soda from the Caribbean
                            </Text>
                          }
                        >
                          Red on white but he sipped on KA soda
                        </Lyric>
                        <Text size={2}>
                          Damn, that&apos;s Coca-Cola,{" "}
                          <Lyric
                            tabIndex={tabIndex}
                            note={
                              <Text size={2} as="p">
                                This could refer to the banning of 3 West African athletes from the 2014 Youth Olympic Games
                                due to an ebola outbreak in the region. The line serves to set the scene by saying he is
                                watching television, or at least its on, and news of the athletes&apos; banning would be
                                what’s being broadcast.
                              </Text>
                            }
                          >
                            as TV sports the Olympic ebola
                          </Lyric>
                        </Text>
                        <Text size={2}>I think we might be bipolar, I think she thinks I’m bipolar</Text>

                        <Lyric
                          tabIndex={tabIndex}
                          note={
                            <>
                              <Text size={2} as="p">
                                One of the most iconic mobile phones produced was the Motorola Razr.
                              </Text>
                              <Text size={2} as="p">
                                The name ‘Razor’ is meant to reflect how thin the phone was. In this context, the “Motorola”
                                is a metaphor for the weapon left at the crime scene. It could also be a direct reference to
                                the phone left at the scene.
                              </Text>
                            </>
                          }
                        >
                          He left the crime scene without the Motorola
                        </Lyric>
                        <Text size={2}>Still had dreams of being Gianfranco Zola</Text>
                        <Text size={2}>For at least for now, it’s all over</Text>
                        <Text size={2}>Yeah, at least for now, it’s all over</Text>
                      </div>

                      <div className="flex flex-col items-start gap-(--space-1)">
                        <Text size={2}>I seem to sink lower</Text>
                        <Lyric
                          tabIndex={tabIndex}
                          note={
                            <Text size={2} as="p">
                              Biscuit Town = Bermondsey, London, which is the former home of Peek Freans, a now global
                              biscuit company. This is further confirmed by the album’s two interludes being named
                              “Bermondsey Bosom (Left)” and “Bermondsey Bosom (Right)”.
                            </Text>
                          }
                        >
                          In biscuit town, in biscuit town
                        </Lyric>
                      </div>

                      <div className="flex flex-col items-start gap-(--space-1)">
                        <Text size={2}>
                          You&apos;re shallow waters, I&apos;m the deep seabed And I&apos;m the reason you flow
                        </Text>
                        I got more moons wrapped around my head and Jupiter knows Whilst you orbit with some stupider hoes
                        Only a slacker would know tryna get up and group home Tryna eat from the same bowl, in my troopers
                        abode
                      </div>
                    </div>
                  </Text>

                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: 0.6,
                      pointerEvents: "none",
                      background: "linear-gradient(to bottom, transparent, var(--panel-solid))",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const AlbumCard = ({
  focusable,
  title,
  caption,
  cover,
  color,
}: {
  focusable?: boolean
  title: string
  caption: string
  cover: string
  color: string
}) => (
  <div className="music-hover-root">
    <div style={{ padding: "var(--space-3)", margin: "calc(-1 * var(--space-3))" }}>
      <div className="relative" style={{ marginBottom: "var(--space-2)" }}>
        <Card scale={1} style={{ boxShadow: `0 8px 48px -16px ${color.replace("%)", "%, 0.6)")}` }}>
          <CardContent>
            <Inset>
              <AspectRatio ratio={1}>
                <img
                  src={cover}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  alt={`Album cover for ${title}`}
                />
              </AspectRatio>
            </Inset>
          </CardContent>
        </Card>

        <div className="music-hover-show">
          <div className="absolute right-0 bottom-0 flex gap-(--space-2)" style={{ margin: "var(--space-2)" }}>
            <Button tabIndex={-1} data-radius="full" size="icon-lg">
              <PlayIcon style={{ marginRight: -2 }} />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-start">
        <Link
          href="#"
          tabIndex={focusable ? undefined : -1}
          size={2}
          weight="medium"
          color="gray"
          highContrast
          style={{ textDecoration: "none" }}
        >
          {title}
        </Link>
        <Text size={2} color="gray">
          {caption}
        </Text>
      </div>
    </div>
  </div>
)

const songsQueue: Song[] = [
  {
    name: "The Less I Know the Better",
    artist: "Tame Impala",
    album: "Currents",
    length: "3:39",
    cover:
      "images/radix-home/b69dc8a4d7b3.png",
    color: "hsl(339, 80%, 60%)",
  },
  {
    name: "Pieces",
    artist: "Villagers",
    album: "Becoming a Jackal",
    length: "5:25",
    cover:
      "images/radix-home/d37ba7d8c58c.png",
    color: "hsl(356, 80%, 31%)",
  },
  {
    name: "Cola",
    artist: "Arlo Parks",
    album: "Super Sad Generation",
    length: "3:50",
    cover:
      "images/radix-home/cad56a1f9b61.png",
    color: "hsl(315, 90%, 70%, 0.2)",
  },
  {
    name: "Do the Astral Plane",
    artist: "Flying Lotus",
    album: "Cosmogramma",
    length: "3:58",
    cover:
      "images/radix-home/696ba1049740.png",
    color: "hsl(80, 9%, 66%)",
  },
  {
    name: "Left Hand Free",
    artist: "Alt-J",
    album: "This Is All Yours",
    length: "2:54",
    cover:
      "images/radix-home/61268dc8391a.png",
    color: "hsl(330, 70%, 64%)",
  },
];

const songsHistory: Song[] = [
  {
    name: "Sunday Rain",
    artist: "Foo Fighters",
    album: "Concrete and Gold",
    length: "6:11",
    cover:
      "images/radix-home/7f043c8c5a51.png",
    color: "hsl(40, 30%, 55%)",
  },
  {
    name: "Left Hand Free",
    artist: "Alt-J",
    album: "This Is All Yours",
    length: "2:54",
    cover:
      "images/radix-home/61268dc8391a.png",
    color: "hsl(330, 70%, 64%)",
  },
  {
    name: "Last",
    artist: "Nine Inch Nails",
    album: "Broken",
    length: "4:45",
    cover:
      "images/radix-home/83789dab0b4e.png",
    color: "hsl(30, 100%, 50%)",
  },
  {
    name: "13LACK 13ALLOONZ (feat. Twelve’len & GoldLink)",
    artist: "Denzel Curry",
    album: "TA13OO",
    length: "3:31",
    cover:
      "images/radix-home/0e1872e258f1.png",
    color: "hsl(0, 0%, 25%)",
  },
  {
    name: "Self Control",
    artist: "Frank Ocean",
    album: "Blond",
    length: "4:10",
    cover:
      "images/radix-home/1b1aae9d6b73.png",
    color: "hsl(80, 20%, 40%)",
  },
  {
    name: "Trippy (feat. J. Cole)",
    artist: "Anderson .Paak",
    album: "Oxnard",
    length: "5:24",
    cover:
      "images/radix-home/6e0f598215eb.png",
    color: "hsl(193, 15%, 45%)",
  },
  {
    name: "Nightclubbing",
    artist: "Iggy Pop",
    album: "The Idiot",
    length: "4:16",
    cover:
      "images/radix-home/4a254809b41e.png",
    color: "hsl(34, 7%, 45%)",
  },
  {
    name: "Heaven Beside You",
    artist: "Alice in Chains",
    album: "Alice in Chains",
    length: "5:28",
    cover:
      "images/radix-home/638708462c85.png",
    color: "hsl(289, 3%, 51%)",
  },
  {
    name: "Night After Night",
    artist: "Laura Marling",
    album: "A Creature I Don’t Know",
    length: "5:08",
    cover:
      "images/radix-home/d0d9532f9ab9.png",
    color: "hsl(40, 13%, 83%)",
  },
  {
    name: "HEAVN",
    artist: "Jamila Woods",
    album: "HEAVN",
    length: "4:23",
    cover:
      "images/radix-home/be96ccf599b6.png",
    color: "hsl(32, 95%, 67%)",
  },
];

const albumsFavorites = [
  {
    name: "Blond",
    artist: "Frank Ocean",
    cover:
      "images/radix-home/df333e879c33.png",
    color: "hsl(0, 0%, 50%, 0.2)",
  },
  {
    name: "Konoyo",
    artist: "Tim Hecker",
    cover:
      "images/radix-home/3bce94e4bd66.png",
    color: "hsl(210, 30%, 40%)",
  },
  {
    name: "Los Angeles",
    artist: "Flying Lotus",
    cover:
      "images/radix-home/3de2b88c7d0b.png",
    color: "hsl(200, 30%, 20%, 0.2)",
  },
  {
    name: "The Fragile",
    artist: "Nine Inch Nails",
    cover:
      "images/radix-home/a6d46c372f73.png",
    color: "hsl(15, 80%, 50%)",
  },
  {
    name: "Sketches of Spain",
    artist: "Miles Davis",
    cover:
      "images/radix-home/934f26aa495e.png",
    color: "hsl(35, 100%, 50%)",
  },
];

const playlistsForYou = [
  {
    title: "Rebellious ’90s and ’00s",
    caption: "Throwback to the teenage years",
    cover:
      "images/radix-home/1ab4d5fbcd6c.png",
    color: "hsl(36, 70%, 50%)",
  },
  {
    title: "Soft Rock",
    caption: "Songs you can’t go wrong with",
    cover:
      "images/radix-home/01a63af96763.png",
    color: "hsl(235, 50%, 40%, 0.4)",
  },
  {
    title: "Trip-Hop Essentials",
    caption: "Dark and moody grooves",
    cover:
      "images/radix-home/fd0288c40a59.png",
    color: "hsl(230, 100%, 50%, 0.3)",
  },
  {
    title: "Vintage Jazz",
    caption: "Travel through the times",
    cover:
      "images/radix-home/128d7345aaf9.png",
    color: "hsl(260, 100%, 50%, 0.3)",
  },
  {
    title: "Funk Up",
    caption: "Irresistible beats",
    cover:
      "images/radix-home/5f096dd6cda4.png",
    color: "hsl(260, 100%, 50%, 0.3)",
  },
];

const albumsFriendsListen = [
  {
    name: "Vulgar Display of Power",
    artist: "Pantera",
    cover:
      "images/radix-home/439f59700d36.png",
    color: "hsl(5, 20%, 70%)",
  },
  {
    name: "ONUKA",
    artist: "ONUKA",
    cover:
      "images/radix-home/d08d17388351.png",
    color: "hsl(0, 0%, 50%, 0.2)",
  },
  {
    name: "Consolation",
    artist: "Protomartyr",
    cover:
      "images/radix-home/50ac47e51345.png",
    color: "hsl(50, 90%, 50%)",
  },
  {
    name: "uknowhatimsayin¿",
    artist: "Danny Brown",
    cover:
      "images/radix-home/c272b93987fc.png",
    color: "hsl(164, 85%, 50%)",
  },
  {
    name: "Floating Points",
    artist: "Crush",
    cover:
      "images/radix-home/9929159f4a00.png",
    color: "hsl(210, 40%, 50%)",
  },
];

