import OrganizationSelectValue from '@/components/organization-select/organization-select-value'
import WelcomeText from '@/components/welcome-text'

export default function Dashboard() {
  return (
    <div className="wrapper">
      <header>
        <div className="flex w-full items-center justify-between">
          <WelcomeText />
          <OrganizationSelectValue />
        </div>
      </header>
    </div>
  )
}
