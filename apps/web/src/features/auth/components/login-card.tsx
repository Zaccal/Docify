import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@Docify/ui/components/card'
import { Separator } from '@Docify/ui/components/separator'
import Image from 'next/image'

import LoginForm from './login-form'

export function LoginCard() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <div className="mx-auto flex size-24 items-center justify-center overflow-hidden rounded-lg">
          <Image
            width={560}
            height={630}
            src="/Logo.webp"
            alt="Docify logo"
            priority
            className="h-auto w-24"
          />
        </div>

        <CardTitle className="text-center text-4xl">Docify</CardTitle>

        <CardDescription className="text-center">
          Введите данные — и готовый документ у вас через секунды. Без сложной терминологии.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Separator className="mb-4 h-px" />
        <LoginForm />
      </CardContent>
    </Card>
  )
}
