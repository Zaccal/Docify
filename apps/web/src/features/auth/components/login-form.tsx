'use client'

import { Button } from '@Docify/ui/components/button'
import { useActionState } from 'react'

import { login } from '../actions/login'
import PasswordField from './password-field'

const initialState = {
  success: false,
  error: undefined
}

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <form action={formAction}>
      <PasswordField errors={state.error} disabled={pending} />

      <Button loading={pending} fullWidth className="mt-4" type="submit">
        Войти
      </Button>
    </form>
  )
}
