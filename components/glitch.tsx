import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

type Props<T extends React.ElementType> = {
  children: React.ReactNode
  as?: T
  className?: string
}

const Glitch = forwardRef(
  <T extends React.ElementType>(
    {
      children,
      as,
      className,
      ...rest
    }: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>,
    ref: React.ForwardedRef<HTMLElement>
  ) => {
    const Cmp = as || 'span'

    return (
      <Cmp ref={ref} className={cn('motion-safe:animate-glitch', className)} {...rest}>
        {children}
      </Cmp>
    )
  }
)

Glitch.displayName = 'Glitch'

export default Glitch
