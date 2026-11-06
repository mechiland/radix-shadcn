// The six radix-ui.com homepage showcases (3 examples × 2 appearances), rendered with the original Radix Themes source.
import { Theme } from "@radix-ui/themes";
import { ExampleThemesDashboard } from "./example-themes-dashboard";
import { ExampleThemesEcommerce } from "./example-themes-ecommerce";
import { ExampleThemesMusicApp } from "./example-themes-music-app";
import { BackgroundImage, indigoBackgroundImageStyle, tealBackgroundImageStyle, redBackgroundImageStyle } from "./background-image";

type Showcase = { id: string; appearance: "light" | "dark"; accentColor: any; grayColor: any; inner?: Record<string, string>; bg: React.CSSProperties; bgId: string; Example: React.ComponentType<any> };
export const showcases: Showcase[] = [
	{ id: "dashboard-light", appearance: "light", accentColor: "indigo", grayColor: "slate", bg: indigoBackgroundImageStyle, bgId: "1", Example: ExampleThemesDashboard },
	{ id: "dashboard-dark", appearance: "dark", accentColor: "indigo", grayColor: "slate", bg: indigoBackgroundImageStyle, bgId: "4", Example: ExampleThemesDashboard },
	{ id: "ecommerce-light", appearance: "light", accentColor: "cyan", grayColor: "gray", inner: { accentColor: "gray", grayColor: "gray" }, bg: tealBackgroundImageStyle, bgId: "5", Example: ExampleThemesEcommerce },
	{ id: "ecommerce-dark", appearance: "dark", accentColor: "teal", grayColor: "gray", inner: { accentColor: "gray" }, bg: tealBackgroundImageStyle, bgId: "2", Example: ExampleThemesEcommerce },
	{ id: "music-light", appearance: "light", accentColor: "red", grayColor: "slate", bg: redBackgroundImageStyle, bgId: "3", Example: ExampleThemesMusicApp },
	{ id: "music-dark", appearance: "dark", accentColor: "red", grayColor: "slate", bg: redBackgroundImageStyle, bgId: "6", Example: ExampleThemesMusicApp },
];

export function HomeShowcase({ id, background = true }: { id: string; background?: boolean }) {
	const s = showcases.find((x) => x.id === id) ?? showcases[0];
	const { Example } = s;
	return (
		<Theme appearance={s.appearance} accentColor={s.accentColor} grayColor={s.grayColor} hasBackground>
			<div id="home-showcase" style={{ position: "relative", overflow: "hidden", display: "inline-block", padding: 48, minWidth: "100%" , boxSizing: "border-box" }}>
				{background && (
					<div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
						<BackgroundImage style={s.bg} id={s.bgId} />
					</div>
				)}
				<div style={{ position: "relative" }}>
					<Theme {...(s.inner as any)} hasBackground={false}>
						<Example align="start" />
					</Theme>
				</div>
			</div>
		</Theme>
	);
}
