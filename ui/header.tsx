import Link from 'next/link'

import { URL } from '#/lib/config'

import clsx from 'clsx'
import { cxx } from '@jk2908/cxx'

const [css, styles, href] = cxx`
  .header {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-12x);
    justify-content: space-between;

    > a {
      font-size: var(--text-sm);
    }
  }
`

export function Header({ className, ...rest }: React.ComponentPropsWithRef<'header'>) {
  return (
    <header className={clsx(styles.header, className)} {...rest}>
      <Link href="/">{URL}</Link>

			<style href={href} precedence="medium">
        {css}
      </style>
    </header>
  )
}
