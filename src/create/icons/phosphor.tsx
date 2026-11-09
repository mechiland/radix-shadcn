import type { SVGProps } from 'react'
import {
  ActivityIcon, ArrowLeftIcon, ArrowRightIcon, ArrowsClockwiseIcon,
  ArrowsLeftRightIcon, BagIcon, BankIcon, BellIcon,
  BookOpenIcon, CalendarIcon, CameraIcon, CarIcon,
  CaretDownIcon, CaretRightIcon, CaretUpIcon, ChartBarIcon,
  ChartPieIcon, ChatIcon, CheckCircleIcon, CheckIcon,
  CloudArrowUpIcon, CloudIcon, CoffeeIcon, CopyIcon,
  CreditCardIcon, CubeIcon, DotsThreeIcon, DotsThreeOutlineIcon,
  DownloadIcon, FileTextIcon, GaugeIcon, GearIcon,
  GlobeIcon, HardDrivesIcon, ImageIcon, InfoIcon,
  LightningIcon, LockKeyIcon, MagnifyingGlassIcon, MinusIcon,
  MonitorIcon, PaletteIcon, PlusCircleIcon, PlusIcon,
  QuestionIcon, RecordIcon, RepeatIcon, ShareIcon,
  ShieldIcon, ShoppingCartIcon, SpeakerHighIcon, SpinnerIcon,
  SquaresFourIcon, SunIcon, TargetIcon, TelevisionIcon,
  TerminalIcon, ThermometerIcon, TimerIcon, TrashIcon,
  TrendUpIcon, UserIcon, WalletIcon, WarningCircleIcon,
  XIcon,
} from '@phosphor-icons/react'

// The shadcn icon names used by the two Create compositions.
const icons = {
  ActivityIcon, ArrowLeftIcon, ArrowRightIcon, ArrowsClockwiseIcon,
  ArrowsLeftRightIcon, BagIcon, BankIcon, BellIcon,
  BookOpenIcon, CalendarIcon, CameraIcon, CarIcon,
  CaretDownIcon, CaretRightIcon, CaretUpIcon, ChartBarIcon,
  ChartPieIcon, ChatIcon, CheckCircleIcon, CheckIcon,
  CloudArrowUpIcon, CloudIcon, CoffeeIcon, CopyIcon,
  CreditCardIcon, CubeIcon, DotsThreeIcon, DotsThreeOutlineIcon,
  DownloadIcon, FileTextIcon, GaugeIcon, GearIcon,
  GlobeIcon, HardDrivesIcon, ImageIcon, InfoIcon,
  LightningIcon, LockKeyIcon, MagnifyingGlassIcon, MinusIcon,
  MonitorIcon, PaletteIcon, PlusCircleIcon, PlusIcon,
  QuestionIcon, RecordIcon, RepeatIcon, ShareIcon,
  ShieldIcon, ShoppingCartIcon, SpeakerHighIcon, SpinnerIcon,
  SquaresFourIcon, SunIcon, TargetIcon, TelevisionIcon,
  TerminalIcon, ThermometerIcon, TimerIcon, TrashIcon,
  TrendUpIcon, UserIcon, WalletIcon, WarningCircleIcon,
  XIcon,
}

export function renderIcon(name: string, props: SVGProps<SVGSVGElement>) {
  const Icon = icons[name as keyof typeof icons]
  return Icon ? <Icon {...props} data-icon-library="phosphor" /> : null
}
