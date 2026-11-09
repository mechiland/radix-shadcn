import type { SVGProps } from 'react'
import {
  RiAddCircleLine, RiAddLine, RiArrowDownSLine, RiArrowLeftLine,
  RiArrowLeftRightLine, RiArrowRightLine, RiArrowRightSLine, RiArrowUpSLine,
  RiBankCardLine, RiBankLine, RiBarChartLine, RiBellLine,
  RiBookOpenLine, RiBox1Line, RiCalendarLine, RiCameraLine,
  RiCarLine, RiChat1Line, RiCheckLine, RiCheckboxCircleLine,
  RiCloseLine, RiCloudLine, RiComputerLine, RiCupLine,
  RiDashboardLine, RiDeleteBinLine, RiDownloadLine, RiErrorWarningLine,
  RiFileCopyLine, RiFileTextLine, RiFlashlightLine, RiFocus3Line,
  RiGlobalLine, RiHardDriveLine, RiImageLine, RiInformationLine,
  RiLineChartLine, RiLoaderLine, RiLockLine, RiMore2Line,
  RiMoreLine, RiPaletteLine, RiPieChartLine, RiPulseLine,
  RiQuestionLine, RiRecordCircleLine, RiRefreshLine, RiRepeatLine,
  RiSearchLine, RiSettingsLine, RiShareLine, RiShieldLine,
  RiShoppingBagLine, RiShoppingCartLine, RiSubtractLine, RiSunLine,
  RiTerminalBoxLine, RiThermometerLine, RiTimerLine, RiTvLine,
  RiUploadCloudLine, RiUserLine, RiVolumeUpLine, RiWalletLine,
} from '@remixicon/react'

// The shadcn icon names used by the two Create compositions.
const icons = {
  RiAddCircleLine, RiAddLine, RiArrowDownSLine, RiArrowLeftLine,
  RiArrowLeftRightLine, RiArrowRightLine, RiArrowRightSLine, RiArrowUpSLine,
  RiBankCardLine, RiBankLine, RiBarChartLine, RiBellLine,
  RiBookOpenLine, RiBox1Line, RiCalendarLine, RiCameraLine,
  RiCarLine, RiChat1Line, RiCheckLine, RiCheckboxCircleLine,
  RiCloseLine, RiCloudLine, RiComputerLine, RiCupLine,
  RiDashboardLine, RiDeleteBinLine, RiDownloadLine, RiErrorWarningLine,
  RiFileCopyLine, RiFileTextLine, RiFlashlightLine, RiFocus3Line,
  RiGlobalLine, RiHardDriveLine, RiImageLine, RiInformationLine,
  RiLineChartLine, RiLoaderLine, RiLockLine, RiMore2Line,
  RiMoreLine, RiPaletteLine, RiPieChartLine, RiPulseLine,
  RiQuestionLine, RiRecordCircleLine, RiRefreshLine, RiRepeatLine,
  RiSearchLine, RiSettingsLine, RiShareLine, RiShieldLine,
  RiShoppingBagLine, RiShoppingCartLine, RiSubtractLine, RiSunLine,
  RiTerminalBoxLine, RiThermometerLine, RiTimerLine, RiTvLine,
  RiUploadCloudLine, RiUserLine, RiVolumeUpLine, RiWalletLine,
}

export function renderIcon(name: string, { children: _children, ...props }: SVGProps<SVGSVGElement>) {
  const Icon = icons[name as keyof typeof icons]
  return Icon ? <Icon {...props} data-icon-library="remixicon" /> : null
}
