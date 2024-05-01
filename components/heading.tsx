import { cn } from '#/lib/utils'

type Props = {
  children: React.ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export function Heading({
  children,
  level,
  className,
  ...rest
}: Props & React.HTMLAttributes<HTMLHeadingElement>) {
  const Cmp = `h${level}` as const

  return (
    <Cmp className={cn('text-neutral-500', className)} {...rest}>
      {children}
    </Cmp>
  )
}
