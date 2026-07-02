'use client'

import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from '@Docify/ui/lib/utils'

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'xl2'
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-unchecked:bg-muted-foreground dark:data-unchecked:bg-input/80 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        // Sizes
        'data-[size=sm]:h-[14px] data-[size=sm]:w-[24px]',
        'data-[size=default]:h-[18.4px] data-[size=default]:w-[32px]',
        'data-[size=lg]:h-[24px] data-[size=lg]:w-[44px]',
        'data-[size=xl]:h-[32px] data-[size=xl]:w-[58px]',
        'data-[size=xl2]:h-[40px] data-[size=xl2]:w-[72px]',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'bg-background dark:data-checked:bg-primary-foreground dark:data-checked:text-primary-foreground dark:data-unchecked:bg-foreground pointer-events-none block rounded-full ring-0 transition-transform',
          // Thumb sizes and translations
          'group-data-[size=sm]/switch:size-3 group-data-[size=sm]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=sm]/switch:data-unchecked:translate-x-0',
          'group-data-[size=default]/switch:size-4 group-data-[size=default]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=default]/switch:data-unchecked:translate-x-0',
          'group-data-[size=lg]/switch:size-5 group-data-[size=lg]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=lg]/switch:data-unchecked:translate-x-0',
          'group-data-[size=xl]/switch:size-6 group-data-[size=xl]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=xl]/switch:data-unchecked:translate-x-0',
          'group-data-[size=xl2]/switch:size-7 group-data-[size=xl2]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[size=xl2]/switch:data-unchecked:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
