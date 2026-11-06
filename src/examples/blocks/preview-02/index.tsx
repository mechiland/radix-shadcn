import { AccountAccess } from "@/examples/blocks/preview-02/cards/account-access"
import { CardOverview } from "@/examples/blocks/preview-02/cards/card-overview"
import { ClaimableBalance } from "@/examples/blocks/preview-02/cards/claimable-balance"
import { ContributionHistory } from "@/examples/blocks/preview-02/cards/contribution-history"
import { CoverArt } from "@/examples/blocks/preview-02/cards/cover-art"
import { DividendIncome } from "@/examples/blocks/preview-02/cards/dividend-income"
import { EmptyConnectBank } from "@/examples/blocks/preview-02/cards/empty-connect-bank"
import { EmptyDistributeTrack } from "@/examples/blocks/preview-02/cards/empty-distribute-track"
import { EmptyExploreCatalog } from "@/examples/blocks/preview-02/cards/empty-explore-catalog"
import { Faq } from "@/examples/blocks/preview-02/cards/faq"
import { FrontDoor } from "@/examples/blocks/preview-02/cards/front-door"
import { IndexInvesting } from "@/examples/blocks/preview-02/cards/index-investing"
import { KitchenIsland } from "@/examples/blocks/preview-02/cards/kitchen-island"
import { LoadingCard } from "@/examples/blocks/preview-02/cards/loading-card"
import { NewMilestone } from "@/examples/blocks/preview-02/cards/new-milestone"
import { NotificationSettings } from "@/examples/blocks/preview-02/cards/notification-settings"
import { Payments } from "@/examples/blocks/preview-02/cards/payments"
import { PayoutThreshold } from "@/examples/blocks/preview-02/cards/payout-threshold"
import { PowerUsage } from "@/examples/blocks/preview-02/cards/power-usage"
import { Preferences } from "@/examples/blocks/preview-02/cards/preferences"
import { QrConnect } from "@/examples/blocks/preview-02/cards/qr-connect"
import { ReceivingMethod } from "@/examples/blocks/preview-02/cards/receiving-method"
import { RecentTransactions } from "@/examples/blocks/preview-02/cards/recent-transactions"
import { ReleaseCatalog } from "@/examples/blocks/preview-02/cards/release-catalog"
import { RollerShades } from "@/examples/blocks/preview-02/cards/roller-shades"
import { SavingsProgress } from "@/examples/blocks/preview-02/cards/savings-progress"
import { SavingsTargets } from "@/examples/blocks/preview-02/cards/savings-targets"
import { SidebarNav } from "@/examples/blocks/preview-02/cards/sidebar-nav"
import { SocialLinks } from "@/examples/blocks/preview-02/cards/social-links"
import { StockPerformance } from "@/examples/blocks/preview-02/cards/stock-performance"
import { SyncingState } from "@/examples/blocks/preview-02/cards/syncing-state"
import { TransferFunds } from "@/examples/blocks/preview-02/cards/transfer-funds"
import { UpcomingPayments } from "@/examples/blocks/preview-02/cards/upcoming-payments"

export default function Preview02Example() {
  return (
    <div className="overflow-x-auto overflow-y-hidden bg-muted contain-[paint] [--gap:--spacing(4)] 3xl:[--gap:--spacing(12)] md:[--gap:--spacing(10)] dark:bg-background style-lyra:md:[--gap:--spacing(6)] style-mira:md:[--gap:--spacing(6)]">
      <div className="flex w-full min-w-max justify-center">
        <div
          className="grid w-[2400px] grid-cols-7 items-start gap-(--gap) bg-muted p-(--gap) md:w-[3000px] dark:bg-background style-lyra:md:w-[2600px] style-mira:md:w-[2600px] *:[div]:gap-(--gap)"
          data-slot="capture-target"
        >
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <ContributionHistory />
            <EmptyDistributeTrack />
            <QrConnect />
            <DividendIncome />
            <IndexInvesting />
            <SyncingState />
          </div>
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <PayoutThreshold />
            <ClaimableBalance />
            <Preferences />
            <SavingsProgress />
            <KitchenIsland />
          </div>
          <div className="col-span-2 flex flex-col p-1 [contain-intrinsic-size:760px_1200px] [content-visibility:auto]">
            <SavingsTargets />
            <RecentTransactions />
            <div className="grid grid-cols-2 items-start gap-(--gap)">
              <div className="flex flex-col gap-(--gap)">
                <SidebarNav />
                <Faq />
              </div>
              <div className="flex flex-col gap-(--gap)">
                <Payments />
                <FrontDoor />
              </div>
            </div>
            <ReleaseCatalog />
          </div>
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <AccountAccess />
            <CardOverview />
            <TransferFunds />
            <CoverArt />
            <LoadingCard />
          </div>
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <ReceivingMethod />
            <PowerUsage />
            <EmptyConnectBank />
            <UpcomingPayments />
            <RollerShades />
          </div>
          <div className="flex flex-col p-1 [contain-intrinsic-size:380px_1200px] [content-visibility:auto]">
            <StockPerformance />
            <EmptyExploreCatalog />
            <NewMilestone />
            <SocialLinks />
            <NotificationSettings />
          </div>
        </div>
      </div>
    </div>
  )
}
