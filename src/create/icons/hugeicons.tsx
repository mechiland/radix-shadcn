import type { SVGProps } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ActivityIcon, Add01Icon, AlertCircleIcon, AnalyticsUpIcon,
  ArrowDataTransferHorizontalIcon, ArrowDown01Icon, ArrowLeft02Icon, ArrowRight01Icon,
  ArrowRight02Icon, ArrowUp01Icon, AudioWave01Icon, BankIcon,
  BookOpen02Icon, Calendar03Icon, Camera01Icon, Cancel01Icon,
  Car01Icon, ChartBarLineIcon, CheckmarkCircle02Icon, Clock03Icon,
  CloudUploadIcon, CoffeeIcon, ComputerIcon, ComputerTerminal01Icon,
  Copy01Icon, CreditCardIcon, CubeIcon, DashboardSquare01Icon,
  Delete02Icon, DownloadIcon, File02Icon, Globe02Icon,
  HelpCircleIcon, Image01Icon, Loading03Icon, Message01Icon,
  MinusSignIcon, MoreHorizontalCircle01Icon, MoreVerticalCircle01Icon, Notification03Icon,
  PaintBoardIcon, PieChartIcon, PlusSignCircleIcon, PlusSignIcon,
  RepeatIcon, Search01Icon, ServerStackIcon, Settings01Icon,
  Share03Icon, ShieldIcon, ShoppingBag01Icon, ShoppingCart01Icon,
  SquareLock02Icon, Sun03Icon, Target02Icon, ThermometerWarmIcon,
  Tick02Icon, Tv01Icon, UserIcon, VolumeHighIcon,
  Wallet01Icon, ZapIcon,
} from '@hugeicons/core-free-icons'

// The shadcn icon names used by the two Create compositions.
const icons = {
  ActivityIcon, Add01Icon, AlertCircleIcon, AnalyticsUpIcon,
  ArrowDataTransferHorizontalIcon, ArrowDown01Icon, ArrowLeft02Icon, ArrowRight01Icon,
  ArrowRight02Icon, ArrowUp01Icon, AudioWave01Icon, BankIcon,
  BookOpen02Icon, Calendar03Icon, Camera01Icon, Cancel01Icon,
  Car01Icon, ChartBarLineIcon, CheckmarkCircle02Icon, Clock03Icon,
  CloudUploadIcon, CoffeeIcon, ComputerIcon, ComputerTerminal01Icon,
  Copy01Icon, CreditCardIcon, CubeIcon, DashboardSquare01Icon,
  Delete02Icon, DownloadIcon, File02Icon, Globe02Icon,
  HelpCircleIcon, Image01Icon, Loading03Icon, Message01Icon,
  MinusSignIcon, MoreHorizontalCircle01Icon, MoreVerticalCircle01Icon, Notification03Icon,
  PaintBoardIcon, PieChartIcon, PlusSignCircleIcon, PlusSignIcon,
  RepeatIcon, Search01Icon, ServerStackIcon, Settings01Icon,
  Share03Icon, ShieldIcon, ShoppingBag01Icon, ShoppingCart01Icon,
  SquareLock02Icon, Sun03Icon, Target02Icon, ThermometerWarmIcon,
  Tick02Icon, Tv01Icon, UserIcon, VolumeHighIcon,
  Wallet01Icon, ZapIcon,
}

export function renderIcon(name: string, { strokeWidth, ...props }: SVGProps<SVGSVGElement>) {
  const Icon = icons[name as keyof typeof icons]
  return Icon ? <HugeiconsIcon icon={Icon} strokeWidth={typeof strokeWidth === 'number' ? strokeWidth : 2} {...props} data-icon-library="hugeicons" /> : null
}
