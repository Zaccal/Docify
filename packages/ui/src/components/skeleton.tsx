import { cn } from '@Docify/ui/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-xl bg-muted-foreground/40', className)}
      {...props}
    />
  )
}

export { Skeleton }
