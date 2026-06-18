'use client'

import { Button } from '@Docify/ui/components/button'
import { Field, FieldError, FieldLabel } from '@Docify/ui/components/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@Docify/ui/components/input-group'
import { EyeIcon, EyeOffIcon, LockPasswordIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import * as React from 'react'

interface PasswordFieldProps {
  disabled?: boolean
  errors?: Array<{ message?: string } | undefined>
}

export function PasswordField({ disabled, errors }: PasswordFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

  return (
    <Field>
      <FieldLabel htmlFor="password">Введите пароль</FieldLabel>
      <FieldError errors={errors} />
      <InputGroup>
        <InputGroupAddon>
          <HugeiconsIcon icon={LockPasswordIcon} />
        </InputGroupAddon>
        <InputGroupInput
          id="password"
          name="password"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Пароль"
          disabled={disabled}
        />
        <InputGroupAddon align="inline-end">
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            aria-pressed={isPasswordVisible}
            onClick={() => setIsPasswordVisible((visible) => !visible)}
          >
            <HugeiconsIcon icon={isPasswordVisible ? EyeOffIcon : EyeIcon} />
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
