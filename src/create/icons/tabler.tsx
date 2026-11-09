import type { SVGProps } from 'react'
import {
  IconActivity, IconAlertCircle, IconArrowLeft, IconArrowRight,
  IconArrowsLeftRight, IconBell, IconBolt, IconBook,
  IconBox, IconBuildingBank, IconCalendar, IconCamera,
  IconCar, IconChartPie, IconCheck, IconChevronDown,
  IconChevronRight, IconChevronUp, IconCircleCheckFilled, IconCirclePlus,
  IconClock, IconCloud, IconCloudUpload, IconCoffee,
  IconCopy, IconCreditCard, IconDeviceDesktop, IconDeviceTv,
  IconDots, IconDotsVertical, IconDownload, IconExclamationCircle,
  IconFileText, IconGauge, IconHelp, IconInfoCircle,
  IconLayoutDashboard, IconLoader, IconLock, IconMessage,
  IconMinus, IconPalette, IconPhoto, IconPlayerRecordFilled,
  IconPlus, IconRefresh, IconRepeat, IconReportAnalytics,
  IconSearch, IconServer, IconSettings, IconShare,
  IconShare2, IconShield, IconShoppingBag, IconShoppingCart,
  IconSun, IconTarget, IconTerminal, IconThermometer,
  IconTrash, IconTrendingUp, IconUser, IconVolume,
  IconWallet, IconWorld, IconX,
} from '@tabler/icons-react'

// The shadcn icon names used by the two Create compositions.
const icons = {
  IconActivity, IconAlertCircle, IconArrowLeft, IconArrowRight,
  IconArrowsLeftRight, IconBell, IconBolt, IconBook,
  IconBox, IconBuildingBank, IconCalendar, IconCamera,
  IconCar, IconChartPie, IconCheck, IconChevronDown,
  IconChevronRight, IconChevronUp, IconCircleCheckFilled, IconCirclePlus,
  IconClock, IconCloud, IconCloudUpload, IconCoffee,
  IconCopy, IconCreditCard, IconDeviceDesktop, IconDeviceTv,
  IconDots, IconDotsVertical, IconDownload, IconExclamationCircle,
  IconFileText, IconGauge, IconHelp, IconInfoCircle,
  IconLayoutDashboard, IconLoader, IconLock, IconMessage,
  IconMinus, IconPalette, IconPhoto, IconPlayerRecordFilled,
  IconPlus, IconRefresh, IconRepeat, IconReportAnalytics,
  IconSearch, IconServer, IconSettings, IconShare,
  IconShare2, IconShield, IconShoppingBag, IconShoppingCart,
  IconSun, IconTarget, IconTerminal, IconThermometer,
  IconTrash, IconTrendingUp, IconUser, IconVolume,
  IconWallet, IconWorld, IconX,
}

export function renderIcon(name: string, props: SVGProps<SVGSVGElement>) {
  const Icon = icons[name as keyof typeof icons]
  return Icon ? <Icon {...props} data-icon-library="tabler" /> : null
}
