import { HugeiconsIcon } from '@hugeicons/react'

import { getWelcomeDescription, getWelcomeIcon, getWelcomeText } from '@/utils/get-welcome-text'

export default function WelcomeText() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <h1 className="text-4xl font-bold">{getWelcomeText()}</h1>
        <div className="bg-primary text-primary-foreground rounded-full p-2">
          <HugeiconsIcon icon={getWelcomeIcon()} />
        </div>
      </div>
      <p className="text-muted-foreground mt-2">{getWelcomeDescription()}</p>
    </div>
  )
}
