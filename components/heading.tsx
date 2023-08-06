import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export default function Heading({
  children,
  level,
  className,
  ...rest
}: Props & React.HTMLAttributes<HTMLHeadingElement>) {
  const Component = `h${level}` as const

  return (
    <Component className={cn('text-neutral-400', className)} {...rest}>
      {children}
    </Component>
  )
}
