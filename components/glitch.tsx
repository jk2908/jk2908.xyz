import { cn } from '#/lib/utils'

type Props = {
  children: React.ReactNode
  ref?: React.Ref<HTMLSpanElement>
  className?: string
} & React.HTMLAttributes<HTMLSpanElement>

export function Glitch({ children, ref, className, ...rest }: Props) {
  return (
    <span ref={ref} className={cn('motion-safe:animate-glitch', className)} {...rest}>
      {children}
    </span>
  )
}
