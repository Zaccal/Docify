import CreateDocumentCard from '@/components/create-document-card'
import OrganizationSelectValue from '@/components/organization-select/organization-select-value'
import TotolCustomersCard from '@/components/total-customers-card'
import TotalDocumentsCard from '@/components/total-documents-card'
import WelcomeText from '@/components/welcome-text'

export default function Dashboard() {
  return (
    <div className="wrapper">
      <header>
        <div className="flex w-full items-center justify-between">
          <WelcomeText />
          <OrganizationSelectValue />
        </div>
        <div className="mt-8 grid auto-rows-fr grid-cols-4 gap-4">
          <div className="col-span-2">
            <CreateDocumentCard />
          </div>
          <div className="">
            <TotolCustomersCard />
          </div>
          <div className="">
            <TotalDocumentsCard />
          </div>
        </div>
      </header>
    </div>
  )
}
