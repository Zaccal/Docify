'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@Docify/ui/components/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@Docify/ui/components/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@Docify/ui/components/select'
import { Skeleton } from '@Docify/ui/components/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@Docify/ui/components/toggle-group'
import { useIsMobile } from '@Docify/ui/hooks/use-mobile'
import { Area, AreaChart, CartesianGrid, XAxis } from '@Docify/ui/index'
import { useEffect, useState } from 'react'

import { useCompanySelect } from '@/components/company-select/company-select-store'
import { useQuery } from '@/hooks/useQuery'

export const description = 'An interactive area chart'

const chartConfig = {
  // visitors: {
  //   label: 'Visitors'
  // },
  amount: {
    label: 'Сумма',
    color: 'var(--primary)'
  }
} satisfies ChartConfig

interface ChartData {
  date: string
  amount: number
}

export default function ChartAreaIncome() {
  const { company } = useCompanySelect()
  const {
    data: chartData,
    isLoading,
    isError
  } = useQuery<ChartData[]>(() =>
    fetch(`/api/transactions/chart?company=${company}`).then((res) => res.json())
  )
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = useState('90d')

  useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  if (isLoading) return <Skeleton className="h-111 w-full rounded-md" />
  if (isError)
    return (
      <div className="flex h-111 w-full items-center justify-center rounded-md border-2 border-[#e3bdba] bg-[#fff4f3]">
        <div className="">
          <div className="flex items-start gap-3">
            <div className="relative mt-2 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </div>
            <div className="">
              <h4 className="text-xl">Упс, что-то пошло не так</h4>
              <p className="text-muted-foreground">Не удалось загрузить статистику</p>
            </div>
          </div>
        </div>
      </div>
    )

  const filteredData = chartData?.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date('2024-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Сгенерированные документы</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Статистика генерации за последние 3 месяца
          </span>
          <span className="@[540px]/card:hidden">Последние 3 месяца</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            multiple={false}
            value={timeRange ? [timeRange] : []}
            onValueChange={(value) => {
              setTimeRange(value[0] ?? '90d')
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Последние 3 месяца</ToggleGroupItem>
            <ToggleGroupItem value="30d">Последние 30 дней</ToggleGroupItem>
            <ToggleGroupItem value="7d">Последние 7 дней</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value !== null) {
                setTimeRange(value)
              }
            }}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Последние 3 месяца
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Последние 30 дней
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Последние 7 дней
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('ru-RU', {
                  month: 'short',
                  day: 'numeric'
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('ru-RU', {
                      month: 'short',
                      day: 'numeric'
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="amount"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
