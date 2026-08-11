import OrganizationSelectValue from '@/components/company-select/company-select-value'
import ChartAreaIncome from '@/features/dashboard/components/chart-area-income'
import RecentDocumentsTable from '@/features/dashboard/components/recent-documents-table/recent-documents-table'
import SectionTotalCards from '@/features/dashboard/components/section-total-cards/section-total-cards'
import WelcomeText from '@/features/dashboard/components/welcome-text'

export default function Dashboard() {
  return (
    <>
      <div className="wrapper">
        <header className="flex flex-col items-start gap-6 py-2 lg:flex-row lg:items-center lg:justify-between">
          <WelcomeText />
          <OrganizationSelectValue />
        </header>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionTotalCards />
            <div className="px-4 lg:px-6">
              <ChartAreaIncome />
            </div>
            <RecentDocumentsTable />
          </div>
        </div>
      </div>
    </>
  )
}
