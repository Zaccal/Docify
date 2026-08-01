'use cache'

import { HugeiconsIcon } from '@hugeicons/react'

import {
  getWelcomeDescription,
  getWelcomeIcon,
  getWelcomeText
} from '@/features/dashboard/utils/get-welcome-text'

export default async function WelcomeText() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-medium">{getWelcomeText()}</h1>
        <div className="bg-primary text-primary-foreground rounded-full p-2">
          <HugeiconsIcon icon={getWelcomeIcon()} />
        </div>
      </div>
      <p className="text-muted-foreground mt-2">{getWelcomeDescription()}</p>
    </div>
  )
}
