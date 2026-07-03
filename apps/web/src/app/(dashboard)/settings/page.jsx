import { Badge } from '@Docify/ui/components/badge'

import { ModeToggle } from '@/components/mode-toggle'

export default function Page() {
  return (
    <div className="wrapper">
      <h1 className="mt-2 text-4xl font-bold">Настройки</h1>
      <div className="mt-4 flex items-center gap-4">
        <Badge size={'lg'} className="cursor-pointer">
          Оформление
        </Badge>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Оформление</h2>
        <p className="text-muted-foreground">Выберите тему оформления для вашего аккаунта.</p>
        <div className="mt-8 flex max-w-2xl items-center justify-between gap-4">
          <div className="">
            <h3 className="text-lg">Тема</h3>
            <p className="text-muted-foreground max-w-md">
              Эта опция позволяет вам выбрать тему оформления для вашего аккаунта.
            </p>
          </div>
          <div className="">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}
