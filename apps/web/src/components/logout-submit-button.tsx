'use client'

import { Button } from '@Docify/ui/components/button'
import { useFormStatus } from 'react-dom'

export default function LogoutSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant={'destructive'} fullWidth type="submit" loading={pending}>
      Выйти с аккаунта
    </Button>
  )
}
