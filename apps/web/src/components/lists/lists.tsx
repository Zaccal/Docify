import { cn } from '@Docify/ui/lib/utils'

interface ListsProps extends React.ComponentProps<'ul'> {}

export default function Lists({ className, ...props }: ListsProps) {
  return (
    <ul
      className={cn(
        'border-border divide-border/70 overflow-hidden rounded-lg border',
        'divide-y',
        className
      )}
      {...props}
    />
  )
}
