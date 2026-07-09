// import { DataTable } from '@Docify/ui/components/data-table'

import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import OrganizationSelectValue from '@/components/organization-select/organization-select-value'
import { SectionCards } from '@/components/section-cards/section-cards'
import WelcomeText from '@/components/welcome-text'

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
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            {/*<DataTable data={} />*/}
          </div>
        </div>
      </div>
    </>
  )
}
