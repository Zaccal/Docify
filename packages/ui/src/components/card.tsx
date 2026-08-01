import { cn } from '@Docify/ui/lib/utils'
import * as React from 'react'

type CardVariant = 'filled' | 'elevated' | 'outlined'
type CardSize = 'default' | 'sm'

type CardProps = React.ComponentProps<'div'> & {
  variant?: CardVariant
  size?: CardSize
  interactive?: boolean
}

function Card({
  className,
  variant = 'filled',
  size = 'default',
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      data-size={size}
      data-interactive={interactive || undefined}
      className={cn(
        [
          'group/card relative flex flex-col',
          'border border-outline-variant/40',
          'gap-(--card-spacing) overflow-hidden',
          'rounded-(--shape-extra-large,1.75rem)',
          'py-(--card-spacing)',
          'text-card-foreground',
          'transition-[background-color,box-shadow,transform]',
          '[--card-spacing:--spacing(6)]',
          'data-[size=sm]:[--card-spacing:--spacing(4)]',

          'has-[>img:first-child]:pt-0',
          '*:[img:first-child]:rounded-t-[inherit]',
          '*:[img:last-child]:rounded-b-[inherit]',

          'data-[variant=filled]:bg-card',
          'data-[variant=filled]:shadow-none',

          'data-[variant=elevated]:bg-popover',
          'data-[variant=elevated]:shadow-sm',

          'data-[variant=outlined]:border',
          'data-[variant=outlined]:border-border',
          'data-[variant=outlined]:bg-transparent',
          'data-[variant=outlined]:shadow-none',

          'data-[interactive=true]:cursor-pointer',
          'data-[interactive=true]:outline-none',
          'data-[interactive=true]:hover:bg-accent',
          'data-[interactive=true]:active:scale-[0.995]',
          'data-[interactive=true]:focus-visible:ring-2',
          'data-[interactive=true]:focus-visible:ring-ring',
          'data-[interactive=true]:focus-visible:ring-offset-2',
          'data-[interactive=true]:focus-visible:ring-offset-background'
        ],
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        [
          'group/card-header',
          '@container/card-header',
          'grid auto-rows-min items-start gap-1.5',
          'px-(--card-spacing)',
          'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
          'has-data-[slot=card-description]:grid-rows-[auto_auto]',
          '[.border-b]:pb-(--card-spacing)'
        ],
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('text-lg leading-6 font-medium tracking-normal', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm leading-5 text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-content" className={cn('px-(--card-spacing)', className)} {...props} />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        ['flex items-center gap-2', 'px-(--card-spacing)', '[.border-t]:pt-(--card-spacing)'],
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
