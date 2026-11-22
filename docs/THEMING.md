# 主题与组件使用

`Theme` 是共享主题入口，自动导入其同目录样式。消费者先使用官方 shadcn CLI 初始化 Base UI / Tailwind v4，保留初始化的 semantic token 映射。

```tsx
import { Theme, defaultTheme } from '@/lib/theme/theme'
import { Button } from '@/components/ui/button'

<Theme config={{ ...defaultTheme, appearance: 'dark', accentColor: 'yellow' }}>
  <Button variant="classic" size="3" highContrast>Continue</Button>
</Theme>
```

完整选项由 `accentColors`、`grayColors`、`radii`、`scalings` 导出，`parseTheme` 对外部配置作枚举校验。根主题填满视口；嵌套主题保持内容尺寸。应用负责配置状态，Playground 提供 localStorage 保存、重置和 URL 分享。

| 设计数据 | 共享 token | shadcn 语义 / 用途 |
|---|---|---|
| Radix 强调色 1–12、alpha 1–12 | `--accent-1..12`、`--accent-a1..a12`、contrast、surface | primary、选择态、强调文字、局部材质 |
| Radix 灰阶及 auto helper | `--gray-1..12`、`--gray-a1..a12` | background、foreground、muted、accent、border、input |
| 原版面板规则 | panel-solid、panel-translucent、surface、overlay | card、popover、弹层遮罩、背景模糊 |
| 字体、间距、圆角、阴影 | font-size、line-height、space、radius、shadow | 各组件分别选择合适 token |
| 缩放 | scaling → 尺寸、间距和字体计算 | 不使用页面 zoom / transform |

shadcn `--accent` 表示中性轻交互面，不能等同于主题 accentColor。浅亮强调色使用原版 contrast 数据。色阶来自官方 `@radix-ui/colors@3.0.0`；当前视觉基线是 sRGB。

`Button` 支持 classic / solid / soft / surface / outline / ghost，另保留 default / secondary / destructive / link 等 shadcn 别名。Checkbox、CheckboxGroup、Switch、Input、Textarea、Badge、Avatar、Slider、Progress 及适配组件提供 `color`、`highContrast`、`variant` 中适用的属性，具体见类型与覆盖表。原生 Base UI 的 checked/value、readOnly、disabled、表单与事件语义保留。

### 尺寸

Radix Themes 中带 `size` 的组件，都在同一个 `size` 属性里同时接受 shadcn 的尺寸名和 Radix 的数字尺寸；数字可以写成 `2` 或 `"2"`。数字尺寸输出 `data-scale`，shadcn 尺寸名保持 shadcn 原有行为。旧的 `scale` 属性仍可用，但已标记为 deprecated。

| 组件 | Radix 尺寸 | 同时保留的 shadcn 尺寸 |
| --- | --- | --- |
| Button | 1–4；IconButton 用 `icon-1`–`icon-4` | default、xs、sm、lg、icon、icon-xs、icon-sm、icon-lg |
| AlertDialogContent | 1–4（同时决定宽度、标题/描述字号和底部按钮默认尺寸） | default、sm |
| DialogContent、PopoverContent | 1–4 | — |
| HoverCardContent | 1–3 | — |
| DropdownMenuContent、ContextMenuContent | 1–2（子菜单继承） | — |
| Select（Root，传给 trigger 和 content）、SelectTrigger、SelectContent | 1–3 | SelectTrigger：default、sm |
| Avatar | 1–9 | default、sm、lg |
| Card | 1–5 | default、sm |
| Switch | 1–3 | default、sm |
| Badge、Callout、Checkbox、CheckboxGroup、CheckboxCard、RadioGroup、RadioCard、DataList、Input、InputGroup、Textarea、Progress、Slider、Spinner、ScrollArea、Table | 1–3 | — |
| Tabs | 1–2（分段控件 1–3） | — |
| TabNav | 1–2 | — |
| Separator | 1–4 | — |
| Kbd、Text、Heading、Link、Code、Blockquote | 1–9 | — |

```tsx
<Button size="sm">shadcn</Button>
<Button size={3}>Radix</Button>
<Button size="icon-2" aria-label="Add"><Plus /></Button>
<Select size={1}>{/* SelectTrigger、SelectContent 都是 size 1 */}</Select>
```

部分组合组件通过明确的公开属性扩展，例如：

```tsx
<Tabs defaultValue="account" size={2} data-high-contrast="true">
  <TabsList variant="line">{/* TabsTrigger */}</TabsList>
</Tabs>
<SelectContent data-high-contrast="true">{/* SelectItem */}</SelectContent>
<DropdownMenuContent data-variant="soft" size={1}>
  {/* DropdownMenuItem */}
</DropdownMenuContent>
```

data modifier 不适用时省略该属性；不要用字符串 `"false"` 代替省略。TabsList 默认样式是分段控件，line 是下划线 Tabs；分段控件使用 Base 的公开 Indicator 变量实现 100ms 滑动。TabNav / TabNavLink 是可安装的原生链接导航组件。

复合组件局部颜色使用嵌套 Theme，可同时覆盖触发器、内容和子菜单，并正确处理 Portal：

```tsx
const current = useTheme()
return <Theme config={{ ...current, accentColor: 'crimson' }}>
  <DropdownMenu>{/* trigger + content + submenu */}</DropdownMenu>
</Theme>
```

Theme 内的 portal host 由公开 `Portal.container` 连接。不要把自定义 Portal 移到主题外的 body，再依赖页面 CSS 偶然继承。全局主题切换时，菜单、Dialog、Tooltip、图表和组合示例使用同一组 tokens。

Select 延续 Base UI API：有显示标签时在 Root 提供 `items`；Trigger 内放 SelectValue。`alignItemWithTrigger` 默认开启，与原版一样没有进入动画；设为 false 则使用 Popper 动画。焦点管理、键盘导航、typeahead 和碰撞处理均保留 Base 原生行为。

普通原版配色与高对比配色均保留；这不等于所有颜色、字号和状态都经过 WCAG AA 认证。默认演示中的 Gray 列明确使用 HC，destructive 是有记录的语义扩展。
