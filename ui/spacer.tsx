import { clsx } from 'clsx'
import { cxx } from '@jk2908/cxx'

const [css, styles, href] = cxx`
  .spacer {

   + & {
      margin-block-start: var(--space-6x);
      
      @media (width >= 720px) {
        margin-block-start: var(--space-8x);
      }
    }
  }
`

export function Spacer({
  children,
  className,
  ...rest
}: { children: React.ReactNode } & React.ComponentPropsWithRef<'div'>) {
  return (
    <div className={clsx(styles.spacer, className)} {...rest}>
      {children}

			<style href={href} precedence="medium">
        {css}
      </style>
    </div>
  )
}
