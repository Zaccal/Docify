import { cn } from '@Docify/ui/lib/utils'

interface ListsItemProps extends React.ComponentProps<'li'> {
  active?: boolean
  disabled?: boolean
}

export default function ListsItem({ active, className, disabled, ...props }: ListsItemProps) {
  return (
    <li
      aria-disabled={disabled}
      data-active={active}
      data-disabled={disabled}
      className={cn(
        'group/list-item relative flex  items-center gap-3 px-4 py-2.5 transition-colors cursor-pointer',
        'hover:bg-muted/50 focus-within:bg-muted/50',
        'data-[active=true]:bg-primary/10 data-[active=true]:text-primary',
        'data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50',
        className
      )}
      {...props}
    />
  )
}
