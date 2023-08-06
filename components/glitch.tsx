import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

type Props<T extends React.ElementType> = {
  children: React.ReactNode
  as?: T
  className?: string
}

const Glitch = forwardRef(
  <T extends React.ElementType>(
    { children, as, className, ...props }: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const Component = as || 'span'

    return (
      <Component ref={ref} className={cn('motion-safe:animate-glitch', className)} {...props}>
        {children}
      </Component>
    )
  }
)

Glitch.displayName = 'Glitch'

export default Glitch
