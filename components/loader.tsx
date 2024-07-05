import { cn } from '#/lib/utils'

export function Loader({
  count = 3,
  size = 'md',
  className,
}: {
  count?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex', className)}>
      {Array.from({ length: count }, (_, idx) => (
        <span key={idx} className="animate-pulse" style={{ animationDelay: `0.${idx * 2}s` }}>
          .
        </span>
      ))}
    </div>
  )
}
