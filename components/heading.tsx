import { useId } from 'react'

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
  const id = useId()

  return (
    <Cmp {...rest}>
      {children}

      <style href={id} precedence="medium">
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
