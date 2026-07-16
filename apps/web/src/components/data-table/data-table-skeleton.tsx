import { Skeleton } from '@Docify/ui/components/skeleton'

export function DataTableSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between py-4.25">
        <Skeleton className="h-[46.75px] w-119 rounded-xl" />
      </div>
      <Skeleton className="h-185 w-full rounded-xl" />
    </div>
  )
}
