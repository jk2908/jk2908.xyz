import { useId } from 'react'
import Link from 'next/link'

import { URL } from '#/lib/config'

export function Header() {

  return (
    <header>
      <Link href="/">{URL}</Link>

      <style>
        {`
          @scope {
            :scope {
              align-items: center;
              display: flex;
              flex-wrap: wrap;
              gap: var(--space-12x);
              justify-content: space-between;
              padding-block: var(--space-8x);

              @media (width >= 720px) {
                padding-block: var(--space-12x);
              }
            }

            > a {
              font-size: 14px;
            }
          }
        `}
      </style>
    </header>
  )
}
