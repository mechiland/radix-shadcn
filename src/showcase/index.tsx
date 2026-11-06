// The six radix-ui.com homepage showcases (3 examples × 2 appearances), rebuilt with shadcn/Base UI components.
import * as React from "react"
import { Theme, type ThemeConfig } from "@/lib/theme/theme"
import "./showcase.css"
import { BackgroundImage, indigoBackgroundImageStyle, tealBackgroundImageStyle, redBackgroundImageStyle } from "./background-image"

const Dashboard = React.lazy(() => import("./dashboard").then(m => ({ default: m.ExampleThemesDashboard })))
const Ecommerce = React.lazy(() => import("./ecommerce").then(m => ({ default: m.ExampleThemesEcommerce })))
const MusicApp = React.lazy(() => import("./music-app").then(m => ({ default: m.ExampleThemesMusicApp })))

type Showcase = { id: string; title: string; config: Partial<ThemeConfig>; inner?: Partial<ThemeConfig>; bg: React.CSSProperties; bgId: string; Example: React.ComponentType<any> }
export const showcases: Showcase[] = [
  { id: "dashboard-light", title: "Dashboard · Light", config: { appearance: "light", accentColor: "indigo", grayColor: "slate" }, bg: indigoBackgroundImageStyle, bgId: "1", Example: Dashboard },
  { id: "dashboard-dark", title: "Dashboard · Dark", config: { appearance: "dark", accentColor: "indigo", grayColor: "slate" }, bg: indigoBackgroundImageStyle, bgId: "4", Example: Dashboard },
  { id: "ecommerce-light", title: "Ecommerce · Light", config: { appearance: "light", accentColor: "cyan", grayColor: "gray" }, inner: { accentColor: "gray", grayColor: "gray" }, bg: tealBackgroundImageStyle, bgId: "5", Example: Ecommerce },
  { id: "ecommerce-dark", title: "Ecommerce · Dark", config: { appearance: "dark", accentColor: "teal", grayColor: "gray" }, inner: { accentColor: "gray" }, bg: tealBackgroundImageStyle, bgId: "2", Example: Ecommerce },
  { id: "music-light", title: "Music · Light", config: { appearance: "light", accentColor: "red", grayColor: "slate" }, bg: redBackgroundImageStyle, bgId: "3", Example: MusicApp },
  { id: "music-dark", title: "Music · Dark", config: { appearance: "dark", accentColor: "red", grayColor: "slate" }, bg: redBackgroundImageStyle, bgId: "6", Example: MusicApp },
]

/** Renders one homepage showcase. `base` supplies radius/scaling/panel background; the showcase fixes appearance and colors like radix-ui.com. */
export function HomeShowcase({ id, base, background = true }: { id: string; base: ThemeConfig; background?: boolean }) {
  const s = showcases.find(x => x.id === id) ?? showcases[0]
  const outer = { ...base, ...s.config } as ThemeConfig
  const { Example } = s
  return (
    <Theme config={outer} className="home-showcase-theme">
      <div id="home-showcase" style={{ position: "relative", overflow: "hidden", display: "inline-block", padding: 48, minWidth: "100%", boxSizing: "border-box" }}>
        {background && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
            <BackgroundImage style={s.bg} id={s.bgId} />
          </div>
        )}
        <div style={{ position: "relative" }}>
          <Theme config={{ ...outer, ...s.inner }} style={{ background: "transparent", minHeight: 0 }}>
            <React.Suspense fallback={<p className="loading-text">Loading showcase…</p>}>
              <Example align="start" />
            </React.Suspense>
          </Theme>
        </div>
      </div>
    </Theme>
  )
}
