import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

type Props = {
  children: React.ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
}

const [styles, css, href] = cxx`
  .heading {
    color: rgb(var(--neutral-500) / 100%);
    font-size: var(--text-sm);
    font-weight: 400;
    margin-block-end: var(--space);
  }
`

export function Heading({
  children,
  className,
  level,
  ...rest
}: Props & React.HTMLAttributes<HTMLHeadingElement>) {
  const Cmp = `h${level}` as const

  return (
    <Cmp className={clsx(styles.heading, className)} {...rest}>
      {children}

			<style href={href} precedence="medium">
        {css}
      </style>
    </Cmp>
  )
}
