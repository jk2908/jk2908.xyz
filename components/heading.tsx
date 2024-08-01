import { id } from 'lib/utils'

type Props = {
  children: React.ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

export function Heading({
  children,
  level,
  ...rest
}: Props & React.HTMLAttributes<HTMLHeadingElement>) {
  const Cmp = `h${level}` as const

  return (
    <Cmp {...rest}>
      {children}

      <style>
        {`
          @scope {
            :scope {
              color: rgb(var(--neutral-500) / 100%);
            }
          }
        `}
      </style>
    </Cmp>
  )
}
